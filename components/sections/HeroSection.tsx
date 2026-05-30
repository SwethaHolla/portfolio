"use client";

import { motion } from "framer-motion";
import { useResume } from "@/lib/resume-context";
import PixelCat from "@/components/ui/PixelCat";
import Fireflies from "@/components/ui/Fireflies";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function HeroSection() {
  const { data } = useResume();

  return (
    <section
      id="hero"
      className="section-full"
      style={{ background: "linear-gradient(180deg, #0a0705 0%, #1a120b 40%, #1e1a10 100%)" }}
    >
      {/* Layered forest background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Far trees */}
        <svg className="absolute bottom-0 w-full opacity-10" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice">
          <path d="M0,400 L0,200 L30,160 L60,200 L60,180 L90,130 L120,180 L120,150 L150,90 L180,150 L180,130 L210,70 L240,130 L240,100 L270,40 L300,100 L300,80 L330,20 L360,80 L360,60 L390,10 L420,60 L420,40 L450,5 L480,40 L480,20 L510,0 L540,20 L540,10 L570,0 L600,10 L600,0 L630,0 L660,0 L660,10 L690,0 L720,10 L720,0 L750,0 L780,10 L780,20 L810,0 L840,20 L840,10 L870,5 L900,40 L900,20 L930,40 L960,10 L960,60 L990,10 L990,60 L1020,40 L1050,80 L1050,60 L1080,80 L1110,100 L1110,60 L1140,100 L1170,130 L1170,80 L1200,130 L1230,150 L1230,90 L1260,150 L1290,200 L1290,130 L1320,200 L1350,160 L1380,200 L1440,400 Z"
            fill="#2d4a2d" />
        </svg>
        {/* Mid trees */}
        <svg className="absolute bottom-0 w-full opacity-20" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMax slice">
          <path d="M0,500 L0,300 L40,240 L80,300 L80,260 L120,190 L160,260 L160,220 L200,140 L240,220 L240,180 L280,100 L320,180 L320,150 L360,80 L400,150 L400,110 L440,50 L480,110 L480,70 L520,20 L560,70 L560,40 L600,10 L640,40 L640,20 L680,5 L720,20 L720,0 L760,10 L800,0 L800,20 L840,0 L880,20 L880,5 L920,20 L960,40 L960,10 L1000,40 L1040,70 L1040,20 L1080,70 L1120,110 L1120,50 L1160,110 L1200,150 L1200,80 L1240,150 L1280,180 L1280,100 L1320,180 L1360,220 L1360,140 L1400,220 L1440,300 L1440,500 Z"
            fill="#1e3a1e" />
        </svg>
        {/* Near trees */}
        <svg className="absolute bottom-0 w-full opacity-40" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMax slice">
          <path d="M-100,600 L-100,400 L-60,330 L0,400 L0,350 L50,260 L100,350 L100,300 L160,200 L220,300 L220,250 L280,150 L340,250 L340,200 L400,120 L460,200 L460,160 L520,90 L580,160 L580,120 L640,60 L700,120 L700,80 L760,40 L820,80 L820,50 L880,20 L940,50 L940,30 L1000,10 L1060,30 L1060,50 L1120,20 L1180,50 L1180,80 L1240,40 L1300,80 L1300,120 L1360,60 L1420,120 L1420,160 L1480,90 L1540,160 L1540,200 L1600,120 L1660,200 L1660,600 Z"
            fill="#152a15" />
        </svg>

        {/* Ground fog */}
        <div className="absolute bottom-0 inset-x-0 h-48"
          style={{ background: "linear-gradient(0deg, rgba(200,216,232,0.06) 0%, transparent 100%)" }} />

        {/* Moon glow */}
        <div className="absolute top-16 right-1/4 w-40 h-40 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(216,232,245,0.15) 0%, transparent 70%)", filter: "blur(20px)" }} />
      </div>

      <div className="noise-overlay" />
      <div className="vignette" />
      <Fireflies count={24} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Pixel cat */}
        <motion.div
          {...fadeUp(0.3)}
          className="mb-10 animate-float"
        >
          <PixelCat scene="hero" size={14} />
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fadeUp(0.6)} className="display-xl text-ivory mb-6 max-w-4xl">
          Leave the world<br />
          <em className="italic text-gold/80">better</em> than<br />
          you found it.
        </motion.h1>

        <motion.p {...fadeUp(0.9)} className="label-mono text-ivory/40 mb-8 max-w-xs leading-relaxed">
          {data.name} &mdash; {data.role}
        </motion.p>

        {/* Philosophy */}
        <motion.p
          {...fadeUp(1.1)}
          className="font-display text-lg md:text-xl text-ivory/50 max-w-xl leading-relaxed font-light italic"
        >
          &ldquo;{data.philosophy}&rdquo;
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          {...fadeUp(1.6)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="label-mono" style={{ fontSize: "0.55rem" }}>scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-ivory/20 to-transparent animate-breathe" />
        </motion.div>
      </div>
    </section>
  );
}
