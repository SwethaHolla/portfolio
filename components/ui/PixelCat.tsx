// Pixel-art cat rendered in SVG — no external assets required.
// Switch `scene` prop per section for contextual poses.

interface CatProps {
  scene: "hero" | "branch" | "pond" | "water" | "butterfly" | "tree";
  className?: string;
  size?: number;
}

const PIXELS: Record<CatProps["scene"], { color: string; cells: [number, number][] }[]> = {
  hero: [
    // Body
    { color: "#f0ebe3", cells: [[2,5],[3,5],[4,5],[5,5],[6,5],[2,6],[3,6],[4,6],[5,6],[6,6],[2,7],[3,7],[4,7],[5,7],[6,7],[3,8],[4,8],[5,8]] },
    // Head
    { color: "#f0ebe3", cells: [[2,2],[3,2],[4,2],[5,2],[6,2],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4]] },
    // Ears
    { color: "#f0ebe3", cells: [[2,1],[3,1],[5,1],[6,1],[2,0],[6,0]] },
    // Eyes
    { color: "#2d1f12", cells: [[3,3],[5,3]] },
    // Nose
    { color: "#c8602a", cells: [[4,4]] },
    // Tail
    { color: "#f0ebe3", cells: [[7,7],[8,7],[8,6],[8,5],[7,5]] },
    // Legs
    { color: "#ddd6cc", cells: [[3,9],[4,9],[5,9],[6,9]] },
  ],
  branch: [
    // Sitting on branch — rotated slightly
    { color: "#f0ebe3", cells: [[3,4],[4,4],[5,4],[6,4],[3,5],[4,5],[5,5],[6,5],[3,6],[4,6],[5,6],[6,6],[3,7],[4,7],[5,7]] },
    { color: "#f0ebe3", cells: [[3,1],[4,1],[5,1],[4,0],[5,0],[2,2],[3,2],[4,2],[5,2],[6,2],[2,3],[3,3],[4,3],[5,3],[6,3]] },
    { color: "#2d1f12", cells: [[3,2],[5,2]] },
    { color: "#c8602a", cells: [[4,3]] },
    { color: "#f0ebe3", cells: [[7,5],[8,4],[8,3]] }, // tail up
    { color: "#ddd6cc", cells: [[3,8],[4,8],[5,8],[6,8]] },
    // Branch
    { color: "#5c3d1e", cells: [[0,9],[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9],[9,9]] },
    { color: "#3d2b14", cells: [[0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10]] },
  ],
  pond: [
    // Cat sitting, looking at water
    { color: "#f0ebe3", cells: [[2,4],[3,4],[4,4],[5,4],[2,5],[3,5],[4,5],[5,5],[2,6],[3,6],[4,6],[5,6],[3,7],[4,7]] },
    { color: "#f0ebe3", cells: [[2,1],[3,1],[4,1],[5,1],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3]] },
    { color: "#2d1f12", cells: [[2,2],[5,2]] },
    { color: "#c8602a", cells: [[3,3]] },
    { color: "#f0ebe3", cells: [[6,5],[7,4]] },
    { color: "#ddd6cc", cells: [[2,8],[3,8],[4,8],[5,8]] },
    // Water ripple
    { color: "#4a7c9e", cells: [[0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10]] },
    { color: "#3a6080", cells: [[0,11],[1,11],[2,11],[3,11],[4,11],[5,11],[6,11],[7,11],[8,11],[9,11],[10,11]] },
  ],
  water: [
    // Cat half-submerged
    { color: "#f0ebe3", cells: [[2,3],[3,3],[4,3],[5,3],[6,3],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5]] },
    { color: "#2d1f12", cells: [[2,4],[5,4]] },
    { color: "#c8602a", cells: [[3,5]] },
    { color: "#f0ebe3", cells: [[2,1],[3,1],[5,1],[1,2],[6,2]] },
    // Water line
    { color: "rgba(74,124,158,0.7)", cells: [[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6]] },
    { color: "rgba(58,96,128,0.8)", cells: [[0,7],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7]] },
    { color: "rgba(40,70,100,0.9)", cells: [[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8],[9,8]] },
  ],
  butterfly: [
    // Cat mid-pounce
    { color: "#f0ebe3", cells: [[4,5],[5,5],[6,5],[4,6],[5,6],[6,6],[7,6],[3,7],[4,7],[5,7],[6,7],[4,8],[5,8]] },
    { color: "#f0ebe3", cells: [[4,2],[5,2],[6,2],[3,3],[4,3],[5,3],[6,3],[7,3],[3,4],[4,4],[5,4],[6,4],[7,4]] },
    { color: "#2d1f12", cells: [[4,3],[6,3]] },
    { color: "#c8602a", cells: [[5,4]] },
    { color: "#f0ebe3", cells: [[8,5],[9,4],[9,3]] }, // leaping tail
    // Butterfly
    { color: "#c8a050", cells: [[1,1],[2,0],[3,1]] },
    { color: "#e8c070", cells: [[1,2],[2,1],[3,2]] },
    { color: "#3d2b14", cells: [[2,2]] },
  ],
  tree: [
    // Cat resting on branch overlooking landscape
    { color: "#f0ebe3", cells: [[3,4],[4,4],[5,4],[6,4],[3,5],[4,5],[5,5],[6,5],[3,6],[4,6],[5,6],[6,6],[4,7],[5,7]] },
    { color: "#f0ebe3", cells: [[3,1],[4,1],[5,1],[2,2],[3,2],[4,2],[5,2],[6,2],[2,3],[3,3],[4,3],[5,3],[6,3]] },
    { color: "#2d1f12", cells: [[3,2],[5,2]] },
    { color: "#c8602a", cells: [[4,3]] },
    { color: "#f0ebe3", cells: [[7,5],[8,4]] },
    { color: "#ddd6cc", cells: [[3,8],[4,8],[5,8],[6,8]] },
    // Branch
    { color: "#4a2c0e", cells: [[0,9],[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9],[9,9],[10,9]] },
    { color: "#3a200a", cells: [[0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10]] },
  ],
};

export default function PixelCat({ scene, className = "", size = 11 }: CatProps) {
  const px = size;
  const groups = PIXELS[scene] || PIXELS.hero;
  const cols = 11;
  const rows = scene === "water" ? 9 : scene === "pond" ? 12 : 11;

  return (
    <svg
      className={`pixel-cat ${className}`}
      width={cols * px}
      height={rows * px}
      viewBox={`0 0 ${cols * px} ${rows * px}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Cat in ${scene} scene`}
      role="img"
    >
      {groups.map(({ color, cells }, gi) =>
        cells.map(([col, row]) => (
          <rect
            key={`${gi}-${col}-${row}`}
            x={col * px}
            y={row * px}
            width={px}
            height={px}
            fill={color}
          />
        ))
      )}
    </svg>
  );
}
