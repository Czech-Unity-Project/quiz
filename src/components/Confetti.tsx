import { useMemo, type CSSProperties } from 'react';

const COLORS = ['#B5322A', '#F7E8B8', '#5BC85B', '#1368CE', '#FFFFFF', '#3a1a0c'];

export default function Confetti({ pieces = 60 }: { pieces?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        background: COLORS[i % COLORS.length],
        animationDuration: `${1.8 + Math.random() * 1.8}s`,
        animationDelay: `${Math.random() * 0.6}s`,
        rotate: `${Math.random() * 360}deg`,
      })),
    [pieces],
  );
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map(({ rotate, ...style }, i) => (
        <span key={i} style={{ ...style, '--r': rotate } as CSSProperties} />
      ))}
    </div>
  );
}
