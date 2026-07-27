import { useEffect, useRef, useState } from "react";

interface ScrollRevealTextProps {
  children: string;
  className?: string;
  as?: "h2" | "h3" | "p" | "span";
}

export function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf: number;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const windowH = window.innerHeight;
        const start = windowH * 1.1;
        const end = windowH * 0.65;
        const raw = 1 - (rect.top - end) / (start - end);
        setProgress(Math.min(1, Math.max(0, raw)));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);

  return progress;
}

function charOpacity(progress: number, charProgress: number, total: number): number {
  const spread = Math.max(5, total * 0.8);
  const val = (progress - charProgress * 0.85) * spread;
  return Math.min(1, Math.max(0, val));
}

export const ScrollRevealText = ({ children, className = "", as: Tag = "h2" }: ScrollRevealTextProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const progress = useScrollProgress(ref);
  const totalChars = children.replace(/ /g, '').length;
  
  // Split into words, each word keeps its chars with global index
  let gi = 0;
  const words = children.split(" ").map(word => ({
    chars: word.split("").map(char => ({ char, globalIdx: gi++ })),
  }));

  return (
    <Tag ref={ref as any} className={`${className} flex flex-wrap`} aria-label={children}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex flex-nowrap">
          {word.chars.map(({ char, globalIdx }) => {
            const cp = totalChars > 1 ? globalIdx / (totalChars - 1) : 0;
            const opacity = 0.15 + charOpacity(progress, cp, totalChars) * 0.85;
            return (
              <span key={globalIdx} style={{ opacity }}>
                {char}
              </span>
            );
          })}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
};

interface ScrollRevealMultiLineProps {
  lines: (string | { text: string; className?: string; alwaysVisible?: boolean })[];
  className?: string;
}

export const ScrollRevealMultiLine = ({ lines, className = "" }: ScrollRevealMultiLineProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const progress = useScrollProgress(ref);

  const totalChars = lines.reduce((sum, line) => {
    const text = typeof line === "string" ? line : line.text;
    return sum + text.length;
  }, 0);

  let charIndex = 0;

  return (
    <h2 ref={ref} className={className}>
      {lines.map((line, lineIdx) => {
        const text = typeof line === "string" ? line : line.text;
        const customClass = typeof line === "string" ? undefined : line.className;
        const alwaysVisible = typeof line === "string" ? false : line.alwaysVisible;

        const lineChars = text.split("").map((char) => {
          const globalIdx = charIndex++;
          const cp = totalChars > 1 ? globalIdx / (totalChars - 1) : 0;

          if (alwaysVisible && customClass) {
            return (
              <span key={globalIdx} className={customClass}>
                {char === " " ? "\u00A0" : char}
              </span>
            );
          }

          const opacity = 0.15 + charOpacity(progress, cp, totalChars) * 0.85;
          return (
            <span
              key={globalIdx}
              className={customClass || undefined}
              style={{ opacity }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        });

        return (
          <span key={lineIdx}>
            {lineChars}
            {lineIdx < lines.length - 1 && <br />}
          </span>
        );
      })}
    </h2>
  );
};
