import { useEffect, useRef, useState } from "react";

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

const RevealImage = ({ src, alt, className = "", delay = 0 }: RevealImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const randomDelay = useRef(Math.random() * 0.4);
  const angle = useRef((Math.random() - 0.5) * 60);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const totalDelay = delay + randomDelay.current;
  const tan = Math.tan(angle.current * Math.PI / 180);
  const offset = tan * 50;
  const extra = Math.abs(offset) + 5;

  const clipStart = `polygon(-5% -5%, 105% -5%, 105% ${100 - offset + extra}%, -5% ${100 + offset + extra}%)`;
  const clipEnd = `polygon(-5% -5%, 105% -5%, 105% ${0 - offset - extra}%, -5% ${0 + offset - extra}%)`;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />

      {/* drop-shadow creates a glow along the clip-path edge, moving perfectly with it */}
      <div
        className="absolute inset-0"
        style={{
          filter: "drop-shadow(0 1px 3px hsl(var(--primary) / 0.7)) drop-shadow(0 0 8px hsl(var(--primary) / 0.4))",
          transition: `filter 0.2s ease ${totalDelay + 1.3}s`,
          ...(revealed ? { filter: "drop-shadow(0 1px 0px transparent)" } : {}),
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            clipPath: revealed ? clipEnd : clipStart,
            transition: `clip-path 1.4s cubic-bezier(0.22,0.61,0.36,1) ${totalDelay}s`,
          }}
        >
          <img
            src={src}
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
            style={{ filter: "grayscale(1) blur(7px)", transform: "scale(1.08)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default RevealImage;
