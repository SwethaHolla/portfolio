import React from 'react';

/**
 * WhiteCat component - A React component rendering SVG-based illustrations 
 * of a fluffy white anime cat in various scenes[cite: 1].
 * 
 * Styled based on reference: Fluffy white body, grey shadow shading, 
 * wispy ear tufts, big yellow-green eyes, pink nose[cite: 1].
 */

type Shape =
  | { t: "circle"; fill: string; cx: number; cy: number; r: number; stroke?: string; sw?: number }
  | { t: "ellipse"; fill: string; cx: number; cy: number; rx: number; ry: number; stroke?: string; sw?: number; opacity?: number }
  | { t: "poly"; fill: string; pts: [number, number][]; stroke?: string; sw?: number }
  | { t: "path"; fill?: string; stroke: string; sw: number; d: string; linecap?: string; opacity?: number }
  | { t: "rect"; fill: string; x: number; y: number; w: number; h: number; r: number; opacity?: number };

interface CatProps {
  scene: "hero" | "branch" | "pond" | "water" | "butterfly" | "tree";
  className?: string;
  size?: number;
}

const C = {
  white:     "#ffffff",
  fur:       "#f7f5f2",
  furDim:    "#eae6e0",
  shadow:    "#c8c0b8",
  shadowDk:  "#b0a89e",
  earInner:  "#f0c8c8",
  eyeWhite:  "#ffffff",
  irisOut:   "#8ab830",
  irisIn:    "#6a9820",
  pupil:     "#1a1510",
  eyeShine:  "#ffffff",
  nose:      "#e8909a",
  mouth:     "#c8a0a8",
  blush:     "rgba(232,144,154,0.18)",
  whisker:   "#d8d2ca",
  belt:      "#22c55e",
  beltDk:    "#15803d",
  beltShine: "#bbf7d0",
  twig:      "#7c5c3a",
  twigDk:    "#5a3e24",
} as const;

function headShapes(cx: number, cy: number, r: number, squint = false): Shape[] {
  const s: Shape[] = [
    // Outer ears[cite: 1]
    { t: "poly", fill: C.fur, pts: [[cx - r*0.55, cy - r*0.62],[cx - r*0.72, cy - r*1.35],[cx - r*0.1, cy - r*0.92]] },
    { t: "poly", fill: C.fur, pts: [[cx + r*0.1, cy - r*0.92],[cx + r*0.72, cy - r*1.35],[cx + r*0.55, cy - r*0.62]] },
    // Inner ears[cite: 1]
    { t: "poly", fill: C.earInner, pts: [[cx - r*0.52, cy - r*0.68],[cx - r*0.66, cy - r*1.2],[cx - r*0.14, cy - r*0.9]] },
    { t: "poly", fill: C.earInner, pts: [[cx + r*0.14, cy - r*0.9],[cx + r*0.66, cy - r*1.2],[cx + r*0.52, cy - r*0.68]] },
    // Ear tufts[cite: 1]
    { t: "path", stroke: C.shadow, sw: 0.55, d: `M ${cx-r*0.66} ${cy-r*1.18} Q ${cx-r*0.74} ${cy-r*1.5} ${cx-r*0.62} ${cy-r*1.6}` },
    { t: "path", stroke: C.shadow, sw: 0.4, d: `M ${cx-r*0.58} ${cy-r*1.22} Q ${cx-r*0.54} ${cy-r*1.52} ${cx-r*0.44} ${cy-r*1.58}` },
    { t: "path", stroke: C.shadow, sw: 0.55, d: `M ${cx+r*0.66} ${cy-r*1.18} Q ${cx+r*0.74} ${cy-r*1.5} ${cx+r*0.62} ${cy-r*1.6}` },
    { t: "path", stroke: C.shadow, sw: 0.4, d: `M ${cx+r*0.58} ${cy-r*1.22} Q ${cx+r*0.54} ${cy-r*1.52} ${cx+r*0.44} ${cy-r*1.58}` },
    // Head base[cite: 1]
    { t: "circle", fill: C.fur, cx, cy, r },
    // Cheek fluff[cite: 1]
    { t: "ellipse", fill: C.fur, cx: cx - r*0.72, cy: cy + r*0.2, rx: r*0.28, ry: r*0.22 },
    { t: "ellipse", fill: C.fur, cx: cx + r*0.72, cy: cy + r*0.2, rx: r*0.28, ry: r*0.22 },
    // Chin fur[cite: 1]
    { t: "ellipse", fill: C.fur, cx, cy: cy + r*0.72, rx: r*0.52, ry: r*0.22 },
  ];

  const ex = r * 0.36;
  const ey = cy - r * 0.08;

  if (squint) {
    s.push(
      { t: "ellipse", fill: C.eyeWhite, cx: cx-ex, cy: ey, rx: r*0.32, ry: r*0.18 },
      { t: "ellipse", fill: C.eyeWhite, cx: cx+ex, cy: ey, rx: r*0.32, ry: r*0.18 },
      { t: "path", fill: C.irisIn, stroke: C.irisIn, sw: 0, d: `M ${cx-ex-r*0.32} ${ey} A ${r*0.32} ${r*0.18} 0 0 1 ${cx-ex+r*0.32} ${ey} Z` },
      { t: "path", fill: C.irisIn, stroke: C.irisIn, sw: 0, d: `M ${cx+ex-r*0.32} ${ey} A ${r*0.32} ${r*0.18} 0 0 1 ${cx+ex+r*0.32} ${ey} Z` },
      { t: "path", stroke: C.shadowDk, sw: 1.4, d: `M ${cx-ex-r*0.34} ${ey+r*0.04} Q ${cx-ex} ${ey-r*0.26} ${cx-ex+r*0.34} ${ey+r*0.04}` },
      { t: "path", stroke: C.shadowDk, sw: 1.4, d: `M ${cx+ex-r*0.34} ${ey+r*0.04} Q ${cx+ex} ${ey-r*0.26} ${cx+ex+r*0.34} ${ey+r*0.04}` },
      { t: "circle", fill: C.eyeShine, cx: cx-ex-r*0.12, cy: ey-r*0.04, r: r*0.06 },
      { t: "circle", fill: C.eyeShine, cx: cx+ex-r*0.12, cy: ey-r*0.04, r: r*0.06 },
      { t: "ellipse", fill: C.nose, cx, cy: cy+r*0.38, rx: r*0.14, ry: r*0.1 },
      { t: "path", stroke: C.mouth, sw: 1.4, d: `M ${cx-r*0.42} ${cy+r*0.54} Q ${cx} ${cy+r*0.92} ${cx+r*0.42} ${cy+r*0.54}` },
      { t: "path", stroke: C.mouth, sw: 0.9, d: `M ${cx-r*0.42} ${cy+r*0.54} Q ${cx-r*0.5} ${cy+r*0.62} ${cx-r*0.46} ${cy+r*0.66}` },
      { t: "path", stroke: C.mouth, sw: 0.9, d: `M ${cx+r*0.42} ${cy+r*0.54} Q ${cx+r*0.5} ${cy+r*0.62} ${cx+r*0.46} ${cy+r*0.66}` },
    );
  } else {
    s.push(
      { t: "ellipse", fill: C.eyeWhite, cx: cx-ex, cy: ey, rx: r*0.3, ry: r*0.32 },
      { t: "ellipse", fill: C.eyeWhite, cx: cx+ex, cy: ey, rx: r*0.3, ry: r*0.32 },
      { t: "ellipse", fill: C.irisOut, cx: cx-ex, cy: ey, rx: r*0.22, ry: r*0.25 },
      { t: "ellipse", fill: C.irisOut, cx: cx+ex, cy: ey, rx: r*0.22, ry: r*0.25 },
      { t: "ellipse", fill: C.irisIn,  cx: cx-ex, cy: ey+r*0.02, rx: r*0.15, ry: r*0.18 },
      { t: "ellipse", fill: C.irisIn,  cx: cx+ex, cy: ey+r*0.02, rx: r*0.15, ry: r*0.18 },
      { t: "circle", fill: C.pupil, cx: cx-ex, cy: ey+r*0.02, r: r*0.1 },
      { t: "circle", fill: C.pupil, cx: cx+ex, cy: ey+r*0.02, r: r*0.1 },
      { t: "circle", fill: C.eyeShine, cx: cx-ex-r*0.1, cy: ey-r*0.1, r: r*0.09 },
      { t: "circle", fill: C.eyeShine, cx: cx+ex-r*0.1, cy: ey-r*0.1, r: r*0.09 },
      { t: "circle", fill: C.eyeShine, cx: cx-ex+r*0.12, cy: ey+r*0.1, r: r*0.05 },
      { t: "circle", fill: C.eyeShine, cx: cx+ex+r*0.12, cy: ey+r*0.1, r: r*0.05 },
      { t: "ellipse", fill: C.nose, cx, cy: cy+r*0.38, rx: r*0.13, ry: r*0.09 },
      { t: "path", stroke: C.mouth, sw: 0.8, d: `M ${cx-r*0.16} ${cy+r*0.5} Q ${cx} ${cy+r*0.62} ${cx+r*0.16} ${cy+r*0.5}` },
    );
  }

  s.push(
    { t: "ellipse", fill: C.blush, cx: cx-r*0.6, cy: cy+r*0.3, rx: r*0.24, ry: r*0.14 },
    { t: "ellipse", fill: C.blush, cx: cx+r*0.6, cy: cy+r*0.3, rx: r*0.24, ry: r*0.14 },
  );

  const wy = cy + r*0.3;
  const whiskerPaths = [
    `M ${cx-r*0.18} ${wy} L ${cx-r*1.05} ${wy-r*0.18}`,
    `M ${cx-r*0.18} ${wy+r*0.1} L ${cx-r*1.05} ${wy+r*0.1}`,
    `M ${cx-r*0.18} ${wy+r*0.2} L ${cx-r*0.95} ${wy+r*0.38}`,
    `M ${cx+r*0.18} ${wy} L ${cx+r*1.05} ${wy-r*0.18}`,
    `M ${cx+r*0.18} ${wy+r*0.1} L ${cx+r*1.05} ${wy+r*0.1}`,
    `M ${cx+r*0.18} ${wy+r*0.2} L ${cx+r*0.95} ${wy+r*0.38}`,
  ];
  whiskerPaths.forEach(d => s.push({ t: "path", stroke: C.whisker, sw: 0.7, d }));

  return s;
}

function beltShapes(cx: number, ny: number, w: number, h: number): Shape[] {
  return [
    { t: "rect", fill: C.belt, x: cx-w/2, y: ny, w, h, r: h/2 },
    { t: "rect", fill: C.beltDk, x: cx-w/2, y: ny+h*0.6, w, h: h*0.4, r: h/2 },
    { t: "ellipse", fill: C.beltDk, cx, cy: ny+h/2, rx: h*0.6, ry: h*0.55 },
    { t: "ellipse", fill: C.belt, cx, cy: ny+h/2, rx: h*0.42, ry: h*0.38 },
    { t: "ellipse", fill: C.beltShine, cx: cx-h*0.14, cy: ny+h*0.28, rx: h*0.14, ry: h*0.1 },
  ];
}

function chestFur(cx: number, cy: number, r: number): Shape[] {
  return [
    { t: "path", stroke: C.shadow, sw: 0.7, d: `M ${cx} ${cy} Q ${cx-r*0.18} ${cy-r*0.5} ${cx-r*0.1} ${cy-r*0.8}` },
    { t: "path", stroke: C.shadow, sw: 0.5, d: `M ${cx+r*0.1} ${cy} Q ${cx+r*0.25} ${cy-r*0.45} ${cx+r*0.18} ${cy-r*0.78}` },
    { t: "path", stroke: C.shadow, sw: 0.4, d: `M ${cx-r*0.14} ${cy} Q ${cx-r*0.3} ${cy-r*0.38} ${cx-r*0.24} ${cy-r*0.68}` },
  ];
}

const SCENES: Record<CatProps["scene"], { cols: number; rows: number; build: () => Shape[] }> = {
  hero: {
    cols: 11, rows: 13,
    build: () => {
      const hcx = 5.5, hcy = 3.8, hr = 2.4, bcx = 5.5, bcy = 8.2, brx = 2.8, bry = 2.6, neckY = hcy + hr * 0.88;
      return [
        { t: "ellipse", fill: "rgba(0,0,0,0.07)", cx: 5.5, cy: 12.4, rx: 3.0, ry: 0.3 },
        { t: "path", stroke: C.fur, sw: 1.0, d: "M 8.2,9.2 Q 10.2,8.2 10.4,6.4 Q 10.5,4.6 9.4,4.4" },
        { t: "path", stroke: C.shadow, sw: 0.5, d: "M 8.3,9.4 Q 10.0,8.5 10.2,6.8 Q 10.3,5.2 9.5,5.0" },
        { t: "ellipse", fill: C.fur, cx: 9.38, cy: 4.3, rx: 0.62, ry: 0.62 },
        { t: "ellipse", fill: C.shadow, cx: 3.2, cy: 10.8, rx: 1.05, ry: 1.3 },
        { t: "ellipse", fill: C.shadow, cx: 7.8, cy: 10.8, rx: 1.05, ry: 1.3 },
        { t: "ellipse", fill: C.fur, cx: 3.0, cy: 10.6, rx: 0.9, ry: 1.15 },
        { t: "ellipse", fill: C.fur, cx: 8.0, cy: 10.6, rx: 0.9, ry: 1.15 },
        { t: "ellipse", fill: C.fur, cx: 3.1, cy: 11.8, rx: 1.1, ry: 0.55 },
        { t: "ellipse", fill: C.fur, cx: 7.9, cy: 11.8, rx: 1.1, ry: 0.55 },
        { t: "ellipse", fill: C.shadow, cx: 3.1, cy: 11.9, rx: 0.8, ry: 0.35 },
        { t: "ellipse", fill: C.shadow, cx: 7.9, cy: 11.9, rx: 0.8, ry: 0.35 },
        { t: "ellipse", fill: C.shadow, cx: bcx+0.1, cy: bcy+0.2, rx: brx*0.95, ry: bry*0.92 },
        { t: "ellipse", fill: C.fur, cx: bcx, cy: bcy, rx: brx, ry: bry },
        { t: "ellipse", fill: C.shadow, cx: bcx, cy: bcy+0.9, rx: brx*0.7, ry: bry*0.45, opacity: 0.55 },
        { t: "ellipse", fill: C.shadow, cx: 4.3, cy: 10.4, rx: 0.75, ry: 1.1 },
        { t: "ellipse", fill: C.shadow, cx: 6.7, cy: 10.4, rx: 0.75, ry: 1.1 },
        { t: "ellipse", fill: C.fur, cx: 4.1, cy: 10.2, rx: 0.68, ry: 1.0 },
        { t: "ellipse", fill: C.fur, cx: 6.9, cy: 10.2, rx: 0.68, ry: 1.0 },
        { t: "ellipse", fill: C.fur, cx: 4.1, cy: 11.2, rx: 0.8, ry: 0.45 },
        { t: "ellipse", fill: C.fur, cx: 6.9, cy: 11.2, rx: 0.8, ry: 0.45 },
        { t: "ellipse", fill: C.shadow, cx: 4.1, cy: 11.3, rx: 0.6, ry: 0.3 },
        { t: "ellipse", fill: C.shadow, cx: 6.9, cy: 11.3, rx: 0.6, ry: 0.3 },
        ...chestFur(bcx, bcy - 0.5, 1.1),
        ...beltShapes(hcx, neckY, hr * 1.3, hr * 0.32),
        ...headShapes(hcx, hcy, hr, true),
      ];
    },
  },
  branch: {
    cols: 11, rows: 13,
    build: () => {
      const hcx = 5.5, hcy = 3.5, hr = 2.1, neckY = hcy + hr * 0.88;
      return [
        { t: "path", stroke: C.twig, sw: 2.2, d: "M 0,10.2 Q 5.5,9.6 11,10.0" },
        { t: "path", stroke: C.twigDk, sw: 0.8, d: "M 0,10.5 Q 5.5,9.9 11,10.3" },
        { t: "path", stroke: C.fur, sw: 0.9, d: "M 7.8,8.0 Q 9.4,7.2 9.6,5.8 Q 9.8,4.4 9.0,4.2" },
        { t: "path", stroke: C.shadow, sw: 0.45, d: "M 7.9,8.2 Q 9.2,7.5 9.4,6.2 Q 9.6,5.0 9.1,4.8" },
        { t: "ellipse", fill: C.fur, cx: 8.98, cy: 4.1, rx: 0.55, ry: 0.55 },
        { t: "ellipse", fill: C.shadow, cx: 5.6, cy: 7.8, rx: 2.3, ry: 2.1 },
        { t: "ellipse", fill: C.fur, cx: 5.5, cy: 7.6, rx: 2.2, ry: 2.0 },
        { t: "ellipse", fill: C.shadow, cx: 5.5, cy: 8.5, rx: 1.5, ry: 1.0, opacity: 0.55 },
        { t: "ellipse", fill: C.fur, cx: 3.8, cy: 9.6, rx: 0.8, ry: 0.5 },
        { t: "ellipse", fill: C.fur, cx: 6.8, cy: 9.6, rx: 0.8, ry: 0.5 },
        ...chestFur(5.5, 6.5, 1.0),
        ...beltShapes(hcx, neckY, hr * 1.3, hr * 0.32),
        ...headShapes(hcx, hcy, hr),
      ];
    },
  },
  pond: {
    cols: 11, rows: 13,
    build: () => {
      const hcx = 4.5, hcy = 3.4, hr = 2.0, neckY = hcy + hr * 0.88;
      return [
        { t: "rect", fill: "#4a8ab0", x: 0, y: 10.2, w: 11, h: 1.4, r: 0 },
        { t: "rect", fill: "#3a6a8a", x: 0, y: 11.2, w: 11, h: 1.8, r: 0 },
        { t: "ellipse", fill: "#ff8844", cx: 8.8, cy: 9.8, rx: 1.0, ry: 0.4 },
        { t: "poly", fill: "#ff8844", pts: [[9.6,9.6],[10.4,9.8],[9.6,10.0]] },
        { t: "path", stroke: C.fur, sw: 0.85, d: "M 6.2,7.5 Q 7.2,6.8 7.0,5.6" },
        { t: "ellipse", fill: C.shadow, cx: 4.1, cy: 7.6, rx: 2.1, ry: 2.2 },
        { t: "ellipse", fill: C.fur, cx: 4.0, cy: 7.4, rx: 2.0, ry: 2.1 },
        { t: "ellipse", fill: C.fur, cx: 2.8, cy: 9.5, rx: 0.75, ry: 0.48 },
        { t: "ellipse", fill: C.fur, cx: 5.2, cy: 9.5, rx: 0.75, ry: 0.48 },
        ...chestFur(4.0, 6.4, 1.0),
        ...beltShapes(hcx, neckY, hr * 1.35, hr * 0.34),
        ...headShapes(hcx, hcy, hr),
      ];
    },
  },
  water: {
    cols: 11, rows: 10,
    build: () => {
      const hcx = 4.8, hcy = 3.0, hr = 2.2, neckY = hcy + hr * 0.88;
      return [
        { t: "rect", fill: "rgba(74,138,176,0.45)", x: 0, y: 6.2, w: 11, h: 0.9, r: 0 },
        { t: "rect", fill: "rgba(40,76,108,0.78)", x: 0, y: 8.0, w: 11, h: 2.0, r: 0 },
        { t: "ellipse", fill: C.shadow, cx: hcx, cy: hcy+hr*1.1, rx: hr*0.6, ry: hr*0.4 },
        { t: "ellipse", fill: C.fur, cx: hcx, cy: hcy+hr*0.9, rx: hr*0.55, ry: hr*0.38 },
        ...beltShapes(hcx, neckY, hr * 1.2, hr * 0.3),
        ...headShapes(hcx, hcy, hr),
      ];
    },
  },
  butterfly: {
    cols: 11, rows: 11,
    build: () => {
      const hcx = 5.8, hcy = 3.2, hr = 2.0, neckY = hcy + hr * 0.88;
      return [
        { t: "ellipse", fill: "#fde68a", cx: 2.2, cy: 1.8, rx: 1.1, ry: 0.72 },
        { t: "ellipse", fill: "#fbbf24", cx: 2.2, cy: 1.8, rx: 0.65, ry: 0.44 },
        { t: "path", stroke: C.fur, sw: 0.85, d: "M 1.2,8.2 Q 0.2,6.8 0.6,5.4" },
        { t: "ellipse", fill: C.shadow, cx: 4.6, cy: 7.6, rx: 2.0, ry: 2.4 },
        { t: "ellipse", fill: C.fur, cx: 4.5, cy: 7.4, rx: 1.9, ry: 2.3 },
        { t: "path", stroke: C.fur, sw: 1.2, d: "M 6.8,5.8 Q 8.4,5.0 9.6,4.6" },
        { t: "ellipse", fill: C.fur, cx: 9.62, cy: 4.52, rx: 0.5, ry: 0.4 },
        ...chestFur(4.5, 6.2, 1.0),
        ...beltShapes(hcx, neckY, hr * 1.3, hr * 0.32),
        ...headShapes(hcx, hcy, hr),
      ];
    },
  },
  tree: {
    cols: 11, rows: 13,
    build: () => {
      const hcx = 5.5, hcy = 7.4, hr = 1.6, neckY = hcy + hr * 0.88;
      return [
        { t: "rect", fill: "#0d1020", x: 0, y: 0, w: 11, h: 13, r: 0 },
        { t: "rect", fill: "#181428", x: 1.5, y: 3.8, w: 8.0, h: 7.0, r: 0.2 },
        { t: "ellipse", fill: C.shadow, cx: 5.6, cy: 10.2, rx: 1.85, ry: 1.6 },
        { t: "ellipse", fill: C.fur, cx: 5.5, cy: 10.0, rx: 1.75, ry: 1.5 },
        ...chestFur(5.5, 9.2, 0.85),
        ...beltShapes(hcx, neckY, hr * 1.35, hr * 0.34),
        ...headShapes(hcx, hcy, hr),
      ];
    },
  },
};

export default function WhiteCat({ scene, className = "", size = 11 }: CatProps) {
  const { cols, rows, build } = SCENES[scene] || SCENES.hero;
  const shapes = build();
  return (
    <svg className={className} width={cols * size} height={rows * size} viewBox={`0 0 ${cols} ${rows}`} xmlns="http://www.w3.org/2000/svg" role="img">
      {shapes.map((s, i) => {
        switch (s.t) {
          case "circle": return <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={s.fill} stroke={s.stroke ?? "none"} strokeWidth={s.sw ?? 0} />;
          case "ellipse": return <ellipse key={i} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} fill={s.fill} stroke={s.stroke ?? "none"} strokeWidth={s.sw ?? 0} opacity={s.opacity ?? 1} />;
          case "poly": return <polygon key={i} points={s.pts.map(p => `${p[0]},${p[1]}`).join(" ")} fill={s.fill} stroke={s.stroke ?? "none"} strokeWidth={s.sw ?? 0} />;
          case "path": return <path key={i} d={s.d} fill={s.fill ?? "none"} stroke={s.stroke} strokeWidth={s.sw} strokeLinecap={(s.linecap as any) ?? "round"} opacity={s.opacity ?? 1} />;
          case "rect": return <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx={s.r} ry={s.r} fill={s.fill} opacity={s.opacity ?? 1} />;
          default: return null;
        }
      })}
    </svg>
  );
} 