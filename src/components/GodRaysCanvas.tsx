import { useEffect, useRef } from 'react';
import { GodRaysScene } from '@/three/GodRaysScene';

interface GodRaysCanvasProps {
  color?: string;
  className?: string;
  targetRef?: React.RefObject<HTMLElement | null>;
}

function resolveColor(colorExpr: string, parent: HTMLElement = document.body): string {
  if (!colorExpr.includes('var(')) return colorExpr;
  const el = document.createElement('span');
  el.style.color = colorExpr;
  parent.appendChild(el);
  const computed = window.getComputedStyle(el).color;
  parent.removeChild(el);
  return computed || '#ff5500';
}

const GodRaysCanvas = ({
  color = 'hsl(var(--god-rays))',
  className = 'w-full h-full',
  targetRef,
}: GodRaysCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<GodRaysScene | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new GodRaysScene(containerRef.current, resolveColor(color, containerRef.current));
    sceneRef.current = scene;
    scene.animate();

    const measureTarget = () => {
      if (!targetRef?.current || !containerRef.current) return;
      const cr = containerRef.current.getBoundingClientRect();
      const tr = targetRef.current.getBoundingClientRect();

      const x = (tr.left - cr.left) / cr.width;
      const y = (tr.top  - cr.top)  / cr.height;
      const w = tr.width  / cr.width;
      const h = tr.height / cr.height;

      sceneRef.current?.setButtonRect({
       x, y, w, h,
      });
    };

    const rafId = requestAnimationFrame(measureTarget);

    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;
      sceneRef.current.resize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
      );
      measureTarget();
    };

    const resizeObserver = new ResizeObserver(measureTarget);
    if (targetRef?.current) resizeObserver.observe(targetRef.current);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    const handleMouseMove = (e: MouseEvent) => {
      const nx =  (e.clientX / window.innerWidth)  * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      sceneRef.current?.setPointer(nx, ny);
    };

    const handleScroll = () => sceneRef.current?.setScroll(window.scrollY);

    const observer = new MutationObserver(() => {
      sceneRef.current?.refreshTheme();
      sceneRef.current?.setColor(resolveColor(color, containerRef.current ?? document.body));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [color, targetRef]);

  return <div ref={containerRef} className={className} />;
};

export default GodRaysCanvas;
