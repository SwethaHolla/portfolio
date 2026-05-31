// Pixel-art white cat rendered in SVG — no external assets required.
// Switch `scene` prop per section for contextual poses.

interface CatProps {
  scene: "hero" | "branch" | "pond" | "water" | "butterfly" | "tree";
  className?: string;
  size?: number;
}

const PIXELS: Record<CatProps["scene"], { color: string; cells: [number, number][] }[]> = {
  hero: [
    // Body
    { color: "#ffffff", cells: [[2,5],[3,5],[4,5],[5,5],[6,5],[2,6],[3,6],[4,6],[5,6],[6,6],[2,7],[3,7],[4,7],[5,7],[6,7],[3,8],[4,8],[5,8]] },
    // Head
    { color: "#ffffff", cells: [[2,2],[3,2],[4,2],[5,2],[6,2],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4]] },
    // Ears
    { color: "#ffffff", cells: [[2,1],[3,1],[5,1],[6,1],[2,0],[6,0]] },
    // Inner ears
    { color: "#f5c0c0", cells: [[3,1],[5,1]] },
    // Eyes — big, looking at viewer
    { color: "#1a1a1a", cells: [[3,3],[5,3]] },
    { color: "#ffffff", cells: [[3,3],[5,3]] },
    // Nose
    { color: "#e87878", cells: [[4,4]] },
    // Mouth
    { color: "#e0d8d0", cells: [[3,5],[5,5]] },
    // Tail
    { color: "#ffffff", cells: [[7,7],[8,7],[8,6],[8,5],[7,5]] },
    // Legs
    { color: "#e8e8e8", cells: [[3,9],[4,9],[5,9],[6,9]] },
    // Shadows
    { color: "#e0e0e0", cells: [[2,5],[6,5],[2,7],[6,7]] },
  ],
  branch: [
    // Sitting on branch
    { color: "#ffffff", cells: [[3,4],[4,4],[5,4],[6,4],[3,5],[4,5],[5,5],[6,5],[3,6],[4,6],[5,6],[6,6],[3,7],[4,7],[5,7]] },
    { color: "#ffffff", cells: [[3,1],[4,1],[5,1],[4,0],[5,0],[2,2],[3,2],[4,2],[5,2],[6,2],[2,3],[3,3],[4,3],[5,3],[6,3]] },
    // Inner ears
    { color: "#f5c0c0", cells: [[4,1],[5,1]] },
    // Eyes
    { color: "#1a1a1a", cells: [[3,2],[5,2]] },
    { color: "#ffffff", cells: [[3,2],[5,2]] },
    // Nose
    { color: "#e87878", cells: [[4,3]] },
    // Tail up
    { color: "#ffffff", cells: [[7,5],[8,4],[8,3]] },
    // Legs
    { color: "#e8e8e8", cells: [[3,8],[4,8],[5,8],[6,8]] },
    // Shadows
    { color: "#e0e0e0", cells: [[3,4],[6,4],[3,6],[6,6]] },
    // Branch
    { color: "#5c3d1e", cells: [[0,9],[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9],[9,9]] },
    { color: "#3d2b14", cells: [[0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10]] },
  ],
  pond: [
    // Cat sitting, looking down at fish
    { color: "#ffffff", cells: [[2,4],[3,4],[4,4],[5,4],[2,5],[3,5],[4,5],[5,5],[2,6],[3,6],[4,6],[5,6],[3,7],[4,7]] },
    // Head tilted down
    { color: "#ffffff", cells: [[2,1],[3,1],[4,1],[5,1],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3]] },
    // Inner ears
    { color: "#f5c0c0", cells: [[3,1],[4,1]] },
    // Eyes looking down
    { color: "#1a1a1a", cells: [[2,2],[5,2]] },
    // Nose
    { color: "#e87878", cells: [[3,3]] },
    // Tail
    { color: "#ffffff", cells: [[6,5],[7,4]] },
    // Legs
    { color: "#e8e8e8", cells: [[2,8],[3,8],[4,8],[5,8]] },
    // Shadows
    { color: "#e0e0e0", cells: [[2,4],[5,4]] },
    // Fish in water
    { color: "#ff8844", cells: [[8,7],[9,7],[10,7]] },
    { color: "#ffaa66", cells: [[8,8],[9,8]] },
    { color: "#1a1a1a", cells: [[9,7]] },
    // Water
    { color: "#4a7c9e", cells: [[0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10]] },
    { color: "#3a6080", cells: [[0,11],[1,11],[2,11],[3,11],[4,11],[5,11],[6,11],[7,11],[8,11],[9,11],[10,11]] },
    { color: "#6a9cbe", cells: [[1,10],[4,10],[7,10]] },
  ],
  water: [
    // Cat swimming — head above water
    { color: "#ffffff", cells: [[2,3],[3,3],[4,3],[5,3],[6,3],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5]] },
    // Ears
    { color: "#ffffff", cells: [[2,1],[3,1],[5,1],[1,2],[6,2]] },
    { color: "#f5c0c0", cells: [[3,1],[5,1]] },
    // Eyes — alert
    { color: "#1a1a1a", cells: [[2,4],[5,4]] },
    { color: "#ffffff", cells: [[2,4],[5,4]] },
    // Nose
    { color: "#e87878", cells: [[3,5]] },
    // Water surface
    { color: "rgba(74,124,158,0.6)", cells: [[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6]] },
    { color: "rgba(58,96,128,0.7)", cells: [[0,7],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7]] },
    { color: "rgba(40,70,100,0.8)", cells: [[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8],[9,8]] },
    // Water ripples
    { color: "rgba(100,170,220,0.4)", cells: [[3,6],[6,6]] },
  ],
  butterfly: [
    // Cat mid-leap, reaching up
    { color: "#ffffff", cells: [[3,5],[4,5],[5,5],[6,5],[3,6],[4,6],[5,6],[6,6],[7,6],[2,7],[3,7],[4,7],[5,7],[6,7],[3,8],[4,8],[5,8]] },
    // Head tilted up
    { color: "#ffffff", cells: [[3,2],[4,2],[5,2],[6,2],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4]] },
    // Ears
    { color: "#ffffff", cells: [[3,1],[4,1],[6,1],[5,0]] },
    { color: "#f5c0c0", cells: [[4,1],[6,1]] },
    // Eyes — looking up
    { color: "#1a1a1a", cells: [[4,3],[6,3]] },
    // Nose
    { color: "#e87878", cells: [[5,4]] },
    // Extended paw
    { color: "#ffffff", cells: [[8,6],[9,5]] },
    // Tail
    { color: "#ffffff", cells: [[1,7],[0,6],[0,5]] },
    // Shadows
    { color: "#e0e0e0", cells: [[3,5],[6,5],[3,7],[6,7]] },
    // Butterfly — upper right
    { color: "#ffdd66", cells: [[1,0],[2,0],[3,0]] },
    { color: "#ffcc44", cells: [[0,1],[1,1],[2,1],[3,1]] },
    { color: "#8a6d20", cells: [[1,1]] },
    // Butterfly trail
    { color: "#ffdd6644", cells: [[0,2],[2,2]] },
  ],
  tree: [
    // Simplified university silhouette (Glasgow Gothic) — compressed to fit
    { color: "#0d0a1a", cells: [[4,1],[5,1],[6,1],[7,1]] },
    { color: "#0d0a1a", cells: [[3,2],[4,2],[5,2],[6,2],[7,2],[8,2]] },
    // Tower
    { color: "#0d0a1a", cells: [[5,0],[6,0]] },
    // Central building
    { color: "#0d0a1a", cells: [[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3]] },
    { color: "#0d0a1a", cells: [[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4]] },
    // Wings
    { color: "#0d0a1a", cells: [[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5]] },
    // Rose window
    { color: "#f0c060", cells: [[5,2]] },
    // Small cat in front of university — foreground
    { color: "#ffffff", cells: [[4,8],[5,8],[6,8],[4,9],[5,9],[6,9],[4,10],[5,10],[6,10]] },
    // Cat head
    { color: "#ffffff", cells: [[4,6],[5,6],[6,6],[3,7],[4,7],[5,7],[6,7],[7,7]] },
    // Cat ears
    { color: "#ffffff", cells: [[4,5],[5,5],[6,5]] },
    { color: "#f5c0c0", cells: [[5,5]] },
    // Cat eyes
    { color: "#1a1a1a", cells: [[4,7],[6,7]] },
    // Cat nose
    { color: "#e87878", cells: [[5,8]] },
    // Cat tail
    { color: "#ffffff", cells: [[7,9],[8,9],[8,10]] },
    // Ground
    { color: "#1a1440", cells: [[0,11],[1,11],[2,11],[3,11],[4,11],[5,11],[6,11],[7,11],[8,11],[9,11],[10,11]] },
  ],
};

export default function WhiteCat({ scene, className = "", size = 11 }: CatProps) {
  const px = size;
  const groups = PIXELS[scene] || PIXELS.hero;
  const cols = 11;
  const rows = scene === "tree" ? 12 : scene === "water" || scene === "pond" ? 12 : 11;

  return (
    <svg
      className={`pixel-cat ${className}`}
      width={cols * px}
      height={rows * px}
      viewBox={`0 0 ${cols * px} ${rows * px}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`White cat in ${scene} scene`}
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
