/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bark: {
          DEFAULT: "#1a120b",
          50: "#f5ede5",
          100: "#e8d5c0",
          200: "#c9a87a",
          300: "#a07845",
          400: "#6b4c28",
          500: "#3d2b14",
          600: "#1a120b",
          700: "#0e0906",
        },
        moss: {
          DEFAULT: "#2d4a2d",
          light: "#4a7c4a",
          pale: "#8fb88f",
        },
        mist: {
          DEFAULT: "#c8d8e8",
          dark: "#8a9db0",
        },
        ivory: "#f0ebe3",
        moonlight: "#e8f0f8",
        koi: "#c8602a",
        dusk: "#2a1f3d",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "breathe": "breathe 4s ease-in-out infinite",
        "drift": "drift 20s linear infinite",
        "particle": "particle 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        drift: {
          "0%": { transform: "translateX(-100vw)" },
          "100%": { transform: "translateX(100vw)" },
        },
        particle: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "0.5" },
          "100%": { transform: "translateY(-80px) scale(0)", opacity: "0" },
        },
      },
      backgroundImage: {
        "noise": "url('/noise.svg')",
        "vignette": "radial-gradient(ellipse at center, transparent 40%, rgba(14,9,6,0.8) 100%)",
      },
    },
  },
  plugins: [],
};
