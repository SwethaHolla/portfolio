"use client";

import { useEffect, useState } from "react";

interface Butterfly {
  id: number;
  left: string;
  top: string;
  duration: string;
  delay: string;
  fx: string;
  fy: string;
  size: number;
  rotation: number;
}

interface ButterfliesProps {
  count?: number;
  className?: string;
  maxTop?: number;
}

export default function Butterflies({ count = 12, className = "", maxTop = 90 }: ButterfliesProps) {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);

  useEffect(() => {
    setButterflies(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * maxTop}%`,
        duration: `${6 + Math.random() * 10}s`,
        delay: `${Math.random() * 8}s`,
        fx: `${(Math.random() - 0.5) * 80}px`,
        fy: `${-30 - Math.random() * 100}px`,
        size: 10 + Math.random() * 8,
        rotation: Math.random() * 360,
      }))
    );
  }, [count, maxTop]);

  if (butterflies.length === 0) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      {butterflies.map((b) => (
        <div
          key={b.id}
          className="butterfly"
          style={{
            left: b.left,
            top: b.top,
            "--duration": b.duration,
            "--delay": b.delay,
            "--fx": b.fx,
            "--fy": b.fy,
          } as React.CSSProperties}
        >
          <div style={{ transform: `rotate(${b.rotation}deg)` }}>
          <svg
            width={b.size}
            height={b.size * 0.8}
            viewBox="0 0 24 20"
            className="butterfly-wing"
          >
            {/* Left wing */}
            <path d="M12,10 C8,4 2,3 2,8 C2,13 8,14 12,10 Z" fill="#fa00ed" opacity="0.8" />
            <path d="M12,10 C10,5 5,4 5,8 C5,12 10,13 12,10 Z" fill="#e8b840" opacity="0.6" />
            {/* Right wing */}
            <path d="M12,10 C16,4 22,3 22,8 C22,13 16,14 12,10 Z" fill="#fa00ed" opacity="0.8" />
            <path d="M12,10 C14,5 19,4 19,8 C19,12 14,13 12,10 Z" fill="#e8c840" opacity="0.6" />
            {/* Body */}
            <ellipse cx="12" cy="10" rx="1" ry="3" fill="#8a6d20" />
          </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
