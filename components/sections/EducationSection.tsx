"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useResume } from "@/lib/resume-context";
import Fireflies from "@/components/ui/Fireflies";
import { fadeUpVariants } from "@/components/ui/Card";
import Butterflies from "../ui/Butterflies";

export default function EducationSection() {
  const { data } = useResume();

  return (
    <section
      id="education"
      className="section-full py-32"
      style={{ background: "linear-gradient(180deg, #000000 0%, #0c0b18 30%, #1a1838 60%, #1e1530 100%)" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Aurora borealis — animated sweeping curtains (dark red) */}
        <motion.div
          className="absolute top-0 inset-x-0 h-3/5"
          style={{
            background: "linear-gradient(180deg, rgba(140,20,20,0.12) 0%, rgba(100,15,15,0.08) 30%, rgba(60,10,10,0.05) 60%, transparent 100%)",
            filter: "blur(40px)",
          }}
          animate={{ x: ["-5%", "5%", "-5%"], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-10 inset-x-0 h-2/5"
          style={{
            background: "linear-gradient(180deg, rgba(160,30,20,0.08) 0%, rgba(120,20,15,0.06) 40%, rgba(80,10,10,0.04) 70%, transparent 100%)",
            filter: "blur(50px)",
          }}
          animate={{ x: ["8%", "-8%", "8%"], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 inset-x-0 h-1/3"
          style={{
            background: "linear-gradient(90deg, rgba(120,15,15,0.04) 0%, rgba(150,25,20,0.08) 50%, rgba(100,12,12,0.04) 100%)",
            filter: "blur(60px)",
          }}
          animate={{ x: ["-12%", "12%", "-12%"], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Evening horizon glow — dark red */}
        <div className="absolute bottom-1/3 inset-x-0 h-32"
          style={{ background: "linear-gradient(0deg, #f70505 0%, rgba(80,12,12,0.1) 50%, transparent 100%)", filter: "blur(30px)" }} />

        {/* University silhouette on horizon (Glasgow Gothic spires) */}
        <svg className="absolute bottom-0 w-full opacity-55"
          viewBox="0 -30 1440 330" preserveAspectRatio="xMidYMax meet">
          {/* Central great hall — nave connecting tower to wings */}
          <rect x="500" y="170" width="440" height="130" fill="#0d0a1a" />
          <polygon points="500,170 600,130 700,170 800,130 940,170" fill="#0d0a1a" />
          {/* Roof ridge line */}
          <rect x="500" y="165" width="440" height="8" fill="#0d0a1a" />
          {/* Main tower — central campanile */}
          <rect x="680" y="50" width="80" height="250" fill="#0d0a1a" />
          <polygon points="680,50 720,-5 760,50" fill="#0d0a1a" />
          {/* Tower pinnacle spires (4 corners) */}
          <polygon points="678,50 685,30 692,50" fill="#0d0a1a" />
          <polygon points="705,50 712,30 719,50" fill="#0d0a1a" />
          <polygon points="735,50 742,30 749,50" fill="#0d0a1a" />
          <polygon points="746,50 760,30 765,50" fill="#0d0a1a" />
          {/* Clock face */}
          <circle cx="720" cy="75" r="14" fill="none" stroke="#2a2040" strokeWidth="2" />
          {/* Tower battlements */}
          {[680, 695, 710, 725, 740, 755].map((x, i) => (
            <rect key={i} x={x} y={45} width={10} height={10} fill="#0d0a1a" />
          ))}
          {/* Left wing */}
          <rect x="320" y="150" width="180" height="150" fill="#0d0a1a" />
          <polygon points="320,150 360,120 400,150 440,120 500,150" fill="#0d0a1a" />
          {/* Left wing battlements */}
          {[320, 345, 370, 395, 420, 445, 470].map((x, i) => (
            <rect key={i} x={x} y={146} width={8} height={8} fill="#0d0a1a" />
          ))}
          {/* Right wing */}
          <rect x="760" y="150" width="180" height="150" fill="#0d0a1a" />
          <polygon points="760,150 800,120 840,150 880,120 940,150" fill="#0d0a1a" />
          {/* Right wing battlements */}
          {[760, 785, 810, 835, 860, 885, 910].map((x, i) => (
            <rect key={i} x={x} y={146} width={8} height={8} fill="#0d0a1a" />
          ))}
          {/* Extended outer sections — lower */}
          <rect x="200" y="210" width="120" height="90" fill="#0d0a1a" />
          <polygon points="200,210 230,190 260,210 290,190 320,210" fill="#0d0a1a" />
          <rect x="940" y="210" width="120" height="90" fill="#0d0a1a" />
          <polygon points="940,210 970,190 1000,210 1030,190 1060,210" fill="#0d0a1a" />
          {/* Grand entrance — Gothic pointed arch portal */}
          <path d="M700,240 Q710,200 720,195 Q730,200 740,240 Z" fill="#0d0a1a" />
          <path d="M704,240 Q710,215 720,210 Q730,215 736,240 Z" fill="#f0c060" opacity="0.5" />
          {/* Lancet windows along nave */}
          {[510, 540, 570, 610, 640, 670, 780, 810, 840, 880, 910].map((x, i) => (
            <path key={i} d={`M${x},180 Q${x+6},165 ${x+12},180 L${x+12},210 L${x},210 Z`}
              fill="#f0c060" opacity={0.25 + (i % 3) * 0.15} />
          ))}
          {/* Wing windows */}
          {[340, 370, 400, 430, 460].map((x, i) => (
            <path key={i} d={`M${x},170 Q${x+6},155 ${x+12},170 L${x+12},195 L${x},195 Z`}
              fill="#f0c060" opacity={0.2 + (i % 4) * 0.1} />
          ))}
          {/* Rose window — central circular window */}
          <circle cx="720" cy="120" r="12" fill="none" stroke="#2a2040" strokeWidth="2" />
          <circle cx="720" cy="120" r="6" fill="#f0c060" opacity="0.3" />
          <path d="M720,108 L720,132 M708,120 L732,120 M712,112 L728,128 M712,128 L728,112"
            stroke="#2a2040" strokeWidth="1" opacity="0.5" />
          {/* Foreground treeline framing — darker silhouette */}
          <path d="M0,300 L0,190 L40,160 L80,190 L80,170 L130,130 L180,170 L180,150 L230,110 L280,150 L280,300 Z" fill="#0d0a1a" />
          <path d="M1060,300 L1060,150 L1110,110 L1160,150 L1160,130 L1210,90 L1260,130 L1260,170 L1320,120 L1380,170 L1440,130 L1440,300 Z" fill="#0d0a1a" />
          <path d="M0,300 L0,240 L25,225 L50,240 L50,230 L80,215 L110,230 L110,300 Z" fill="#0d0a1a" />
        </svg>

        {/* <Fireflies count={16} /> */}
        <Butterflies count={28} maxTop={70} />
      </div>

      <div className="noise-overlay" />
      <div className="vignette" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        {/* Cat on branch */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="flex justify-center mb-16"
        >
        </motion.div>

        {/* Section header */}
        <motion.div
          variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="display-lg text-ivory">Where I studied.</h2>
        </motion.div>

        {/* Education cards */}
        <div className="flex flex-col gap-6">
          {data.education.map((edu, i) => (
            <motion.div
              key={edu.id}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i * 0.15}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.25 }}
              // className="group border border-white/[0.07] bg-white/[0.02] rounded-sm p-7 hover:border-white/[0.12] transition-colors"
            >
              <br />
              <br />
              <div className="flex items-start justify-between gap-6 flex-wrap p-10">
                <div>
                  <h3 className="display-md text-ivory mb-1">{edu.institution}</h3>
                  <p className="font-display text-lg text-ivory/50 font-light italic">
                    {edu.degree} &middot; {edu.field}
                  </p>
                  {edu.description && (
                    <p className="mt-3 font-display text-sm text-ivory/30 font-light leading-relaxed max-w-md">
                      {edu.description}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="label-mono text-gold/40 mb-2">{edu.year}</p>
                  <div className="flex items-center gap-1 justify-end">
                    <MapPin size={10} className="text-ivory/20" />
                    <span className="label-mono text-ivory/20" style={{ fontSize: "0.5rem" }}>
                      {edu.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
