import { useEffect, useRef } from "react";
import { GodRaysScene } from "@/three/GodRaysScene";

interface GodRaysCanvasProps {
  color?: string;
  className?: string;
  targetRef?: React.RefObject<HTMLElement | null>;
}

function resolveColor(colorExpr: string, parent: HTMLElement = document.body): string {
  if (!colorExpr.includes("var(")) return colorExpr;
  const el = document.createElement("span");
  el.style.color = colorExpr;
  parent.appendChild(el);
  const computed = window.getComputedStyle(el).color;
  parent.removeChild(el);
  return computed || "#ff5500";
}

const GodRaysCanvas = ({
  color = "hsl(var(--god-rays))",
  className = "w-full h-full",
  targetRef,
}: GodRaysCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<GodRaysScene | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let waitRaf = 0;
    let measureRaf = 0;
    let resizeObserver: ResizeObserver | null = null;
    let themeObserver: MutationObserver | null = null;

    const measureTarget = () => {
      if (!targetRef?.current || !sceneRef.current) return;
      const cr = container.getBoundingClientRect();
      const tr = targetRef.current.getBoundingClientRect();
      if (cr.width < 2 || cr.height < 2) return;

      sceneRef.current.setButtonRect({
        x: (tr.left - cr.left) / cr.width,
        y: (tr.top - cr.top) / cr.height,
        w: tr.width / cr.width,
        h: tr.height / cr.height,
      });
    };

    const handleResize = () => {
      if (!sceneRef.current) return;
      sceneRef.current.resize(container.clientWidth, container.clientHeight);
      measureTarget();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      sceneRef.current?.setPointer(nx, ny);
    };

    const handleScroll = () => sceneRef.current?.setScroll(window.scrollY);

    const attachListeners = () => {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(container);
      if (targetRef?.current) resizeObserver.observe(targetRef.current);

      themeObserver = new MutationObserver(() => {
        sceneRef.current?.refreshTheme();
        sceneRef.current?.setColor(resolveColor(color, container));
      });
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
      });

      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("scroll", handleScroll, { passive: true });
    };

    const start = () => {
      if (disposed || sceneRef.current) return;
      // Wait until layout has real size (common on mobile first paint)
      if (container.clientWidth < 2 || container.clientHeight < 2) {
        waitRaf = requestAnimationFrame(start);
        return;
      }

      const scene = new GodRaysScene(container, resolveColor(color, container));
      sceneRef.current = scene;
      scene.animate();
      attachListeners();
      measureRaf = requestAnimationFrame(measureTarget);
    };

    start();

    return () => {
      disposed = true;
      cancelAnimationFrame(waitRaf);
      cancelAnimationFrame(measureRaf);
      resizeObserver?.disconnect();
      themeObserver?.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [color, targetRef]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default GodRaysCanvas;
