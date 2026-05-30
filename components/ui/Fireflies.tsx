"use client";

import { useMemo } from "react";

interface FirefliesProps {
  count?: number;
  className?: string;
}

export default function Fireflies({ count = 18, className = "" }: FirefliesProps) {
  const flies = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${20 + Math.random() * 70}%`,
        duration: `${5 + Math.random() * 8}s`,
        delay: `${Math.random() * 6}s`,
        fx: `${(Math.random() - 0.5) * 60}px`,
        fy: `${-20 - Math.random() * 80}px`,
        size: Math.random() > 0.7 ? 4 : 3,
      })),
    [count]
  );

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      {flies.map((f) => (
        <div
          key={f.id}
          className="firefly"
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            "--duration": f.duration,
            "--delay": f.delay,
            "--fx": f.fx,
            "--fy": f.fy,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
