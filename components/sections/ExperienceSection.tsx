"use client";

import { motion } from "framer-motion";
import { useResume } from "@/lib/resume-context";
import PixelCat from "@/components/ui/PixelCat";
import Fireflies from "@/components/ui/Fireflies";
import { fadeUpVariants } from "@/components/ui/Card";

export default function ExperienceSection() {
  const { data } = useResume();

  return (
    <section
      id="experience"
      className="section-full py-32"
      style={{ background: "linear-gradient(180deg, #27301f 0%, #161009 50%, #1a150d 100%)" }}
    >
      {/* Layered root system */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Far roots */}
        <svg className="absolute top-1/2 w-full opacity-10" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMin slice">
          <path d="M0,0 Q100,80 200,60 Q300,40 400,120 Q500,200 600,160 Q700,120 800,220 Q900,320 1000,260 Q1100,200 1200,300 Q1300,400 1440,350"
            stroke="#5c3d1e" strokeWidth="6" fill="none" />
          <path d="M50,10 Q150,100 250,80 Q350,60 450,140 Q550,220 650,180 Q750,140 850,240 Q950,340 1050,280 Q1150,220 1250,320"
            stroke="#5c3d1e" strokeWidth="4" fill="none" />
          <path d="M100,20 Q200,50 300,30 Q400,10 500,90 Q600,170 700,130 Q800,90 900,190"
            stroke="#5c3d1e" strokeWidth="3" fill="none" />
        </svg>
        {/* Mid roots */}
        <svg className="absolute top-1/2 w-full opacity-20" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMin slice">
          <path d="M0,0 Q150,120 300,80 Q450,40 600,180 Q750,320 900,240 Q1050,160 1200,340 Q1350,480 1440,400"
            stroke="#3d2b14" strokeWidth="10" fill="none" />
          <path d="M-100,20 Q50,140 200,100 Q350,60 500,200 Q650,340 800,260 Q950,180 1100,360 Q1250,500 1400,420"
            stroke="#3d2b14" strokeWidth="6" fill="none" />
          <path d="M200,0 Q350,80 500,40 Q650,0 800,140 Q950,280 1100,200 Q1250,120 1400,280"
            stroke="#3d2b14" strokeWidth="4" fill="none" />
        </svg>
        {/* Near roots */}
        <svg className="absolute top-1/2 w-full opacity-35" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMin slice">
          <path d="M0,0 Q200,160 400,100 Q600,40 800,240 Q1000,440 1200,320 Q1350,220 1440,450"
            stroke="#2a1f12" strokeWidth="14" fill="none" />
          <path d="M-200,30 Q0,190 200,130 Q400,70 600,270 Q800,470 1000,350 Q1150,250 1300,480"
            stroke="#2a1f12" strokeWidth="8" fill="none" />
          <path d="M400,0 Q600,120 800,60 Q1000,0 1200,200 Q1350,340 1440,280"
            stroke="#2a1f12" strokeWidth="5" fill="none" />
        </svg>
        <Fireflies count={60} />
      </div>

      <div className="noise-overlay" />
      <div className="vignette" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        {/* Walking cat */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="flex justify-center mb-16"
        >
          <PixelCat scene="branch" size={13} />
        </motion.div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 mb-20">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center"
          >
            <p className="display-lg text-gold/90">{data.yearsOfExperience}</p>
            <p className="label-mono mt-2">Years of experience</p>
          </motion.div>
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
            className="text-center"
          >
            <p className="display-lg text-gold/90">{data.experience.length}</p>
            <p className="label-mono mt-2">Companies</p>
          </motion.div>

        </div>

        {/* Experience timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-px" />

          <div className="flex flex-col gap-12">
            {data.experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i * 0.15}
                className={`relative md:w-1/2 pl-8 md:pl-0 ${
                  i % 2 === 0
                    ? "md:pr-12 md:text-right md:self-start"
                    : "md:pl-12 md:self-end md:translate-x-full md:-mt-16"
                }`}
              >
                {/* Dot */}
                <div className={`absolute top-1.5 w-2 h-2 rounded-full bg-gold/60 border border-gold/30 ${
                  i % 2 === 0
                    ? "left-0 md:left-auto md:-right-[calc(3rem+4px)]"
                    : "left-0 md:-left-[calc(3rem+4px)]"
                }`} />

                <p className="label-mono text-gold/50 mb-1">{exp.period}</p>
                <h3 className="display-md text-ivory mb-0.5">{exp.role}</h3>
                <p className="font-mono text-sm text-ivory/40 mb-2">{exp.company}</p>
                {exp.description && (
                  <p className="text-sm text-ivory/40 leading-relaxed font-light max-w-xs"
                    style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>
                    {exp.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
