import { useEffect, useRef, useState } from "react";

interface PageLoaderProps {
  onComplete: () => void;
}

const PageLoader = ({ onComplete }: PageLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [curtainUp, setCurtainUp] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const DURATION = 2200;

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const t = Math.min(elapsed / DURATION, 1);

      // Ease: fast start, slow end
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.floor(eased * 100);
      setProgress(current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setTimeout(() => {
          window.scrollTo(0, 0);
          setCurtainUp(true);
          setTimeout(onComplete, 900);
        }, 350);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [onComplete]);

  const gap = (1 - progress / 100) * 44;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      style={{
        transform: curtainUp ? "translateY(-100%)" : "translateY(0)",
        transition: curtainUp
          ? "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)"
          : "none",
      }}
    >
      {/* Split number */}
      <div className="relative select-none" style={{ lineHeight: 1 }}>
        {/* Top half */}
        <div
          style={{
            transform: `translateY(-${gap}px)`,
            clipPath: "inset(0 0 50% 0)",
            fontSize: "clamp(80px, 18vw, 220px)",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            fontFamily: "inherit",
          }}
        >
          {progress}%
        </div>

        {/* Bottom half — positioned exactly over top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${gap}px)`,
            clipPath: "inset(50% 0 0 0)",
            fontSize: "clamp(80px, 18vw, 220px)",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            fontFamily: "inherit",
          }}
        >
          {progress}%
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-10 left-10 right-10"
        style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.15)" }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#ffffff",
            transition: "width 0.05s linear",
          }}
        />
      </div>
    </div>
  );
};

export default PageLoader;
