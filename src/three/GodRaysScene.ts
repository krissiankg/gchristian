import {
  BlendFunction,
  EffectComposer,
  EffectPass,
  GodRaysEffect,
  RenderPass,
} from "postprocessing";
import * as THREE from "three";
import noiseGlsl from "./shaders/noise.glsl?raw";

// ─── Perspective-lines data ───────────────────────────────────────────────
//  Camera: z=20, FOV=90 (vertical). Near clip = 1.
//
//  Shape (matches reference image):
//    1. Near end (z=18.5) — lines enter from the LEFT edge, spread wide
//    2. P1 (z=14)         — still going mostly straight, slight perspective
//    3. P2 (z=5)          — curves toward center x=0
//    4. PERSP_VP          — all lines converge here (center of screen, high up)
//    5. PERSP_TOP         — lines continue STRAIGHT UP above VP

const PERSP_VP = new THREE.Vector3(0, 16, 2); // convergence point (user-set)
const PERSP_TOP = new THREE.Vector3(0, 38, 2); // "straight up" destination

// Near ends: mostly LEFT side, a couple slightly right — like the reference
const PERSP_LINES = [
  {
    nx: 6.9,
    ny: -8.6,
    speed: 0.055,
    text: "FULL-STACK  ·  NEXT.JS  ·  REACT  ·  WORDPRESS  ·  ",
  },
  {
    nx: 6.0,
    ny: -8.4,
    speed: 0.042,
    text: "AI AUTOMATION  ·  N8N  ·  MAKE  ·  PROMPT ENGINEERING  ·  ",
  },
  {
    nx: 5.2,
    ny: -8.2,
    speed: 0.061,
    text: "UX / UI  ·  FIGMA  ·  DIGITAL PRODUCTS  ·  STRIPE  ·  ",
  },
  {
    nx: 4.5,
    ny: -8.0,
    speed: 0.048,
    text: "SAAS  ·  SUPABASE  ·  VERCEL  ·  PERFORMANCE  ·  ",
  },
  {
    nx: 3.9,
    ny: -7.9,
    speed: 0.053,
    text: "FREELANCE  ·  BENIN  ·  UEMOA  ·  GUELICHWEB  ·  ",
  },
  {
    nx: 3.4,
    ny: -7.8,
    speed: 0.058,
    text: "CONSULTANT  ·  FORMATION  ·  GROWTH  ·  CRAFT  ·  ",
  },
  {
    nx: 3.0,
    ny: -7.7,
    speed: 0.044,
    text: "CREATIVE  ·  LINES  ·  FUTURE  ·  MINIMAL  ·  ",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────
export class GodRaysScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private composer: EffectComposer;
  private lightSource: THREE.Mesh;
  private figureMesh: THREE.Mesh | null = null;
  private timer: THREE.Timer;

  private pointer = { x: 0, y: 0 };
  private scroll = 0;
  private scrollPrev = 0;
  private scrollOffset = 0;
  private smoothPos = { x: 0, y: 0 };

  private buttonRect: { x: number; y: number; w: number; h: number } | null =
    null;
  private buttonCenter = { x: 0, y: 0 };

  // World-space position of the button's right edge, vertical centre, at P0_Z.
  // All perspective lines start from this point.
  private static readonly P0_Z = 10.5;
  private buttonP0 = new THREE.Vector3(0, 0, GodRaysScene.P0_Z);

  private godRaysEffect!: GodRaysEffect;

  private perspRibbons: Array<{ mesh: THREE.Mesh; speed: number }> = [];

  // ── helpers ──────────────────────────────────────────────────────────
  private isLightTheme(): boolean {
    return document.documentElement.classList.contains("light");
  }

  private readBgColor(): string {
    const el = document.createElement("span");
    el.style.color = "hsl(var(--background))";
    this.container.appendChild(el);
    const rgb = window.getComputedStyle(el).color;
    this.container.removeChild(el);
    return rgb || "#000000";
  }

  // ── constructor ───────────────────────────────────────────────────────
  constructor(
    private container: HTMLElement,
    color = "#ff5500",
  ) {
    const w = container.clientWidth;
    const h = container.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(90, w / h, 1, 1000);
    this.camera.position.set(0, 0, 20);

    this.renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: false,
      stencil: false,
      depth: false,
    });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(this.renderer.domElement);

    this.timer = new THREE.Timer();

    this.lightSource = this.createLightSource(color);
    this.lightSource.position.set(0, 0, -10);
    this.scene.add(this.lightSource);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    this.godRaysEffect = new GodRaysEffect(this.camera, this.lightSource, {
      height: 480,
      kernelSize: 2,
      density: 0.96,
      decay: 0.92,
      weight: 0.35,
      exposure: 0.65,
      samples: 60,
      clampMax: 0.9,
      blendFunction: BlendFunction.ADD,
    });
    this.composer.addPass(new EffectPass(this.camera, this.godRaysEffect));

    this.buildOccluder();
    this.buildPerspectiveLines();
  }

  // ── public API ────────────────────────────────────────────────────────
  refreshTheme(): void {
    this.buildOccluder();
    this.rebuildPerspectiveLines();
    this.godRaysEffect.blendMode.blendFunction = BlendFunction.ADD;
  }

  setButtonRect(rect: { x: number; y: number; w: number; h: number }): void {
    this.buttonRect = rect;
    const vFov = (this.camera.fov * Math.PI) / 180;
    const aspect = this.container.clientWidth / this.container.clientHeight;

    // buttonCenter — world pos at light-source depth (used by GodRays orbit)
    const distLight = this.camera.position.z - this.lightSource.position.z;
    const phLight = 2 * Math.tan(vFov / 2) * distLight;
    const pwLight = phLight * aspect;
    this.buttonCenter.x = (rect.x + rect.w / 2 - 0.5) * pwLight;
    this.buttonCenter.y = (0.5 - (rect.y + rect.h / 2)) * phLight;

    // buttonP0 — right edge, vertical centre of button, at P0_Z depth
    // (same projection formula as measureTarget, just at a different z plane)
    const distP0 = this.camera.position.z - GodRaysScene.P0_Z;
    const phP0 = 2 * Math.tan(vFov / 2) * distP0;
    const pwP0 = phP0 * aspect;
    this.buttonP0.set(
      (rect.x + rect.w - 0.5) * pwP0, // right edge x
      (0.5 - (rect.y + rect.h / 2)) * phP0, // vertical centre y
      GodRaysScene.P0_Z,
    );

    this.buildOccluder();
    this.rebuildPerspectiveLines();
  }

  setPointer(x: number, y: number): void {
    this.pointer.x = x;
    this.pointer.y = y;
  }
  setScroll(y: number): void {
    this.scroll = y;
  }

  setColor(color: string): void {
    (this.lightSource.material as THREE.MeshBasicMaterial).color.set(color);
  }

  // ── light source mesh ─────────────────────────────────────────────────
  private createLightSource(color: string): THREE.Mesh {
    const timeUniform = { value: 0 };
    const geometry = new THREE.CircleGeometry(50, 64);
    const material = new THREE.MeshBasicMaterial({ color });
    material.onBeforeCompile = (shader) => {
      shader.uniforms.time = timeUniform;
      shader.fragmentShader = `uniform float time;\n${shader.fragmentShader}`
        .replace("void main() {", `${noiseGlsl}\nvoid main() {`)
        .replace(
          "vec4 diffuseColor = vec4( diffuse, opacity );",
          `vec2 uv = vUv - 0.5;
           vec3 col = vec3(0.0);
           float f = smoothstep(0.5, 0.0, length(uv));
           f = pow(f, 4.0);
           float n = snoise(vec3(uv * 7.0, time)) * 0.5 + 0.5;
           n = n * 0.5 + 0.5;
           col = mix(col, diffuse, f * n);
           vec4 diffuseColor = vec4(col, opacity);`,
        );
    };
    (
      material as THREE.MeshBasicMaterial & { defines: Record<string, string> }
    ).defines = { USE_UV: "" };
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData.time = timeUniform;
    return mesh;
  }

  // ── occluder plane ────────────────────────────────────────────────────
  private buildOccluder(): void {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    const cw = 2048;
    const ch = Math.round(2048 * (h / w));

    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = this.readBgColor();
    ctx.fillRect(0, 0, cw, ch);

    if (this.buttonRect) {
      const { x, y, w: bw, h: bh } = this.buttonRect;
      const rx = Math.round(x * cw);
      const ry = Math.round(y * ch);
      const rw = Math.round(bw * cw);
      const rh = Math.round(bh * ch);
      const scale = cw / w;
      const border = Math.round(Math.max(4, scale * 2));
      const outer = Math.round(Math.max(2, scale * 1));

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillRect(rx - outer, ry - outer, rw + outer * 2, rh + outer * 2);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = this.readBgColor();
      ctx.fillRect(rx + border, ry + border, rw - border * 2, rh - border * 2);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const vFov = (this.camera.fov * Math.PI) / 180;
    const planeHeight = 2 * Math.tan(vFov / 2) * this.camera.position.z;
    const planeWidth = planeHeight * (w / h);

    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.05,
      depthWrite: true,
    });

    if (this.figureMesh) {
      this.scene.remove(this.figureMesh);
      this.figureMesh.geometry.dispose();
      (this.figureMesh.material as THREE.Material).dispose();
    }

    this.figureMesh = new THREE.Mesh(geometry, material);
    this.figureMesh.position.z = 0;
    this.scene.add(this.figureMesh);
  }

  // ── perspective lines ─────────────────────────────────────────────────

  /** Dispose old ribbon meshes, then rebuild from current buttonP0. */
  private rebuildPerspectiveLines(): void {
    this.perspRibbons.forEach(({ mesh }) => {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      const mat = mesh.material as THREE.ShaderMaterial;
      (mat.uniforms.map?.value as THREE.Texture | undefined)?.dispose();
      mat.dispose();
    });
    this.perspRibbons = [];
    this.buildPerspectiveLines();
  }

  private buildPerspectiveLines(): void {
    const isMobile = this.container.clientWidth < 768;
    PERSP_LINES.forEach((cfg, index) => {
      let curve: THREE.CatmullRomCurve3;
      if (isMobile) {
        // Vertical ribbons: bottom → center (closer) → top, spread evenly by index
        const count = PERSP_LINES.length;
        const x = (index - (count - 1) / 2) * 0.9;
        const p0 = new THREE.Vector3(x, -22, 3);
        const p1 = new THREE.Vector3(x, 0, 14);
        const p2 = new THREE.Vector3(x, 22, 3);
        curve = new THREE.CatmullRomCurve3([p0, p1, p2]);
      } else {
        const { nx, ny } = cfg;
        const p0 = this.buttonP0.clone();
        const p1 = new THREE.Vector3(nx * 0.4 + 0.5, ny + 8.0, 18.0);
        const p2 = new THREE.Vector3(nx * 0.12, ny + 15.0, 5.0);
        curve = new THREE.CatmullRomCurve3([
          p0,
          p1,
          p2,
          PERSP_VP.clone(),
          PERSP_TOP.clone(),
        ]);
      }

      // text ribbon
      const HW = 0.08;
      const texH = isMobile ? 128 : 256;
      const tex = this.makePerspTextTexture(cfg.text, isMobile);

      const arcLen = curve.getLength();
      const canvasW = (tex.image as HTMLCanvasElement).width;
      const TEXT_ASPECT = 0.85;
      tex.repeat.x = ((arcLen * texH) / (canvasW * HW * 2)) * TEXT_ASPECT;

      const ribbon = this.makePerspRibbon(curve, tex, isMobile);
      this.scene.add(ribbon);
      this.perspRibbons.push({ mesh: ribbon, speed: cfg.speed });
    });
  }

  /** Canvas texture: horizontally tiling text for the ribbon. */
  private makePerspTextTexture(
    text: string,
    isMobile = false,
  ): THREE.CanvasTexture {
    const H = isMobile ? 128 : 256;
    const FONT_SIZE = isMobile ? 48 : 96;
    const FONT = `600 ${FONT_SIZE}px Poppins, Courier, monospace`;

    // Probe canvas: measure exact tile width, then build power-of-two canvas
    const probe = document.createElement("canvas");
    probe.width = 4096;
    probe.height = H;
    const pctx = probe.getContext("2d");
    if (!pctx) return new THREE.CanvasTexture(probe);
    pctx.font = FONT;
    // Canvas width = exact text tile width so RepeatWrapping tiles seamlessly.
    // Power-of-2 rounding caused the tile boundary to differ from the text
    // boundary, producing a visible cut/gap at every repeat.
    const W = Math.ceil(pctx.measureText(text).width) + 90;

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.CanvasTexture(canvas);

    ctx.clearRect(0, 0, W, H);
    const isDark = !this.isLightTheme();

    if (isMobile) {
      ctx.fillStyle = isDark
        ? "rgba(100, 100, 100, 0.80)"
        : "rgba(200, 200, 200, 0.80)";
    } else {
      ctx.fillStyle = isDark
        ? "rgba(225, 225, 225, 0.92)"
        : "rgba(10, 10, 10, 0.85)";
    }
    ctx.font = FONT;
    ctx.textBaseline = "middle";
    ctx.fillText(text, 0, H / 2);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = isMobile
      ? 2
      : this.renderer.capabilities.getMaxAnisotropy();
    tex.repeat.set(3, 1);
    return tex;
  }

  /**
   * Camera-aligned ribbon mesh along a curve.
   * Width direction = cross(tangent, Z_axis) so the ribbon always faces the camera
   * (camera never moves in this scene, so this is pre-computed once).
   */
  private makePerspRibbon(
    curve: THREE.CatmullRomCurve3,
    texture: THREE.CanvasTexture,
    isMobile = false,
  ): THREE.Mesh {
    const SEGS = isMobile ? 80 : 320;
    const HW = 0.08;
    const Z_AXIS = new THREE.Vector3(0, 0, 1);

    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const widthDir = new THREE.Vector3();

    // Arc-length lookup table: UV.x will be proportional to actual distance
    // along the curve, not the raw parameter t. This prevents text from
    // squishing/stretching at bends.
    const arcLengths = curve.getLengths(SEGS);
    const totalLen = arcLengths[arcLengths.length - 1];

    for (let i = 0; i <= SEGS; i++) {
      const t = i / SEGS;
      const u = arcLengths[i] / totalLen; // uniform arc-length UV
      const pt = curve.getPoint(t);
      const tangent = curve.getTangent(t).normalize();

      // ribbon width axis = cross(+Z, tangent), normalised.
      // Order matters: cross(Z, t) gives a normal that points TOWARD camera (+Z),
      // so the front face (readable text) faces the viewer.
      widthDir.crossVectors(Z_AXIS, tangent);
      if (widthDir.lengthSq() < 1e-8) widthDir.set(1, 0, 0);
      else widthDir.normalize();

      positions.push(
        pt.x - widthDir.x * HW,
        pt.y - widthDir.y * HW,
        pt.z - widthDir.z * HW,
        pt.x + widthDir.x * HW,
        pt.y + widthDir.y * HW,
        pt.z + widthDir.z * HW,
      );
      uvs.push(u, 0, u, 1);

      if (i < SEGS) {
        const b = i * 2;
        indices.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);

    const mat = this.makeDepthFadeRibbonMaterial(texture);
    return new THREE.Mesh(geo, mat);
  }

  // Depth-fade: near camera (z≈18) → fully visible, far (z≈2, VP) → ~5% opacity.
  // Both shaders use the same formula so lines and text fade identically.
  private static readonly FADE_GLSL = /* glsl */ `
    float depthFade(float worldZ) {
      float t = clamp((worldZ - 2.0) / 16.0, 0.0, 1.0);
      return 0.02 + 1.0 * pow(t, 2.5);
    }
  `;

  private makeDepthFadeRibbonMaterial(
    texture: THREE.CanvasTexture,
  ): THREE.ShaderMaterial {
    // ShaderMaterial doesn't auto-apply texture.repeat / texture.offset.
    // We pass the texture matrix as a uniform and apply it in the vertex shader.
    // Call updateMatrix() once here so the initial repeat.x is baked in.
    texture.updateMatrix();
    return new THREE.ShaderMaterial({
      uniforms: {
        map: { value: texture },
        uvTransform: { value: texture.matrix }, // shared reference — stays live
      },
      vertexShader: `
        uniform mat3 uvTransform;
        varying vec2  vUv;
        varying float vFade;
        ${GodRaysScene.FADE_GLSL}
        void main() {
          vUv = (uvTransform * vec3(uv, 1.0)).xy;
          vec4 w = modelMatrix * vec4(position, 1.0);
          vFade = depthFade(w.z);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        varying vec2  vUv;
        varying float vFade;
        void main() {
          vec4 c = texture2D(map, vUv);
          gl_FragColor = vec4(c.rgb, c.a * vFade);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: this.isLightTheme()
        ? THREE.NormalBlending
        : THREE.AdditiveBlending,
    });
  }

  // ── animation loop ────────────────────────────────────────────────────
  animate(): void {
    this.renderer.setAnimationLoop(() => {
      this.timer.update();
      const t = this.timer.getElapsed();
      this.lightSource.userData.time.value = t;

      // light orbit
      const orbitX = this.buttonCenter.x + Math.cos(t * 0.4) * 2;
      const orbitY = this.buttonCenter.y + Math.sin(t * 0.25) * 1;
      const targetX = orbitX + this.pointer.x * 2;
      const targetY = orbitY + this.pointer.y * 1.5 - this.scroll / 60;
      this.smoothPos.x += (targetX - this.smoothPos.x) * 0.08;
      this.smoothPos.y += (targetY - this.smoothPos.y) * 0.08;
      this.lightSource.position.x = this.smoothPos.x;
      this.lightSource.position.y = this.smoothPos.y;

      // accumulate scroll-based offset (delta per frame → scroll down = faster, up = reverse)
      const scrollDelta = this.scroll - this.scrollPrev;
      this.scrollPrev = this.scroll;
      this.scrollOffset += scrollDelta * 0.0006;

      // scroll perspective-line text (different offsets per ribbon → staggered feel)
      this.perspRibbons.forEach(({ mesh, speed }, i) => {
        const mat = mesh.material as THREE.ShaderMaterial;
        const tex = mat.uniforms.map?.value as THREE.Texture | undefined;
        if (tex) {
          tex.offset.x = -(t * speed + i * 0.11 + this.scrollOffset) % 1;
          tex.updateMatrix();
        }
      });

      this.composer.render();
    });
  }

  // ── resize ────────────────────────────────────────────────────────────
  resize(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
    this.buildOccluder();
    this.rebuildPerspectiveLines();
  }

  // ── dispose ───────────────────────────────────────────────────────────
  dispose(): void {
    this.renderer.setAnimationLoop(null);
    this.renderer.dispose();

    if (this.figureMesh) {
      this.figureMesh.geometry.dispose();
      (this.figureMesh.material as THREE.Material).dispose();
    }
    this.lightSource.geometry.dispose();
    (this.lightSource.material as THREE.Material).dispose();

    this.perspRibbons.forEach(({ mesh }) => {
      mesh.geometry.dispose();
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.map?.dispose();
      mat.dispose();
    });
  }
}
