"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useResume } from "@/lib/resume-context";
import PixelCat from "@/components/ui/PixelCat";
import Fireflies from "@/components/ui/Fireflies";
import { fadeUpVariants } from "@/components/ui/Card";

export default function EducationSection() {
  const { data } = useResume();

  return (
    <section
      id="education"
      className="section-full py-32"
      style={{ background: "linear-gradient(180deg, #131a0d 0%, #0e1510 50%, #0a0c08 100%)" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* University silhouette on horizon (Glasgow Gothic spires) */}
        <svg className="absolute bottom-0 w-full opacity-15"
          viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice">
          {/* Main tower */}
          <rect x="680" y="60" width="80" height="240" fill="#2a2018" />
          <polygon points="680,60 720,10 760,60" fill="#2a2018" />
          {/* Clock face */}
          <circle cx="720" cy="80" r="14" fill="none" stroke="#3a3028" strokeWidth="2" />
          {/* Battlements */}
          {[680, 700, 720, 740, 760].map((x, i) => (
            <rect key={i} x={x} y={55} width={12} height={10} fill="#2a2018" />
          ))}
          {/* Side wings */}
          <rect x="580" y="130" width="100" height="170" fill="#1e1810" />
          <rect x="760" y="140" width="100" height="160" fill="#1e1810" />
          {/* Small spires */}
          <polygon points="580,130 600,100 620,130" fill="#1e1810" />
          <polygon points="840,140 860,112 880,140" fill="#1e1810" />
          {/* Arched windows */}
          {[590, 630, 670, 770, 810, 850].map((x, i) => (
            <path key={i} d={`M${x},180 Q${x+10},160 ${x+20},180 L${x+20},210 L${x},210 Z`}
              fill="#0a0c08" opacity="0.8" />
          ))}
          {/* Foreground treeline framing */}
          <path d="M0,300 L0,200 L60,160 L120,200 L120,170 L180,120 L240,170 L240,140 L300,90 L360,140 L360,300 Z" fill="#0a0c08" />
          <path d="M1080,300 L1080,140 L1140,90 L1200,140 L1200,110 L1260,70 L1320,110 L1320,170 L1380,120 L1440,170 L1440,300 Z" fill="#0a0c08" />
          <path d="M0,300 L0,240 L30,220 L60,240 L60,230 L90,210 L120,230 L120,300 Z" fill="#070907" />
        </svg>

        {/* Twilight glow on horizon */}
        <div className="absolute bottom-1/4 inset-x-0 h-24"
          style={{ background: "linear-gradient(0deg, rgba(180,140,80,0.06) 0%, transparent 100%)", filter: "blur(20px)" }} />

        <Fireflies count={16} />
      </div>

      <div className="noise-overlay" />
      <div className="vignette" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        {/* Cat on branch */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex justify-center mb-16"
        >
          <PixelCat scene="tree" size={13} />
        </motion.div>

        {/* Section header */}
        <motion.div
          variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="label-mono text-ivory/30 mb-3">06 / Education</p>
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
              className="group border border-white/[0.07] bg-white/[0.02] rounded-sm p-7 hover:border-white/[0.12] transition-colors"
            >
              <div className="flex items-start justify-between gap-6 flex-wrap">
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
                    <span className="label-mono text-ivory/20" style={{ fontSize: "0.6rem" }}>
                      {edu.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          variants={fadeUpVariants} initial="hidden" whileInView="visible"
          viewport={{ once: true }} custom={0.4}
          className="mt-24 pt-8 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-4"
        >
          <span className="label-mono text-ivory/20" style={{ fontSize: "0.58rem" }}>
            {data.name} &mdash; {new Date().getFullYear()}
          </span>
          <div className="flex gap-6">
            <a href={data.github} target="_blank" rel="noopener noreferrer"
              className="label-mono text-ivory/20 hover:text-ivory/50 transition-colors" style={{ fontSize: "0.58rem" }}>
              GitHub
            </a>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer"
              className="label-mono text-ivory/20 hover:text-ivory/50 transition-colors" style={{ fontSize: "0.58rem" }}>
              LinkedIn
            </a>
            <a href={`mailto:${data.email}`}
              className="label-mono text-ivory/20 hover:text-ivory/50 transition-colors" style={{ fontSize: "0.58rem" }}>
              {data.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
