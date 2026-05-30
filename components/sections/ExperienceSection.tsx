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
      style={{ background: "linear-gradient(180deg, #1a120b 0%, #161009 50%, #1a150d 100%)" }}
    >
      {/* Branch SVG background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg className="absolute bottom-1/3 left-0 w-full opacity-25" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,100 Q200,60 400,90 Q600,120 800,85 Q1000,55 1200,80 Q1340,95 1440,70"
            stroke="#5c3d1e" strokeWidth="8" fill="none" />
          <path d="M0,108 Q200,68 400,98 Q600,128 800,93 Q1000,63 1200,88 Q1340,103 1440,78"
            stroke="#3d2b14" strokeWidth="5" fill="none" opacity="0.6" />
        </svg>
        <Fireflies count={12} />
      </div>

      <div className="noise-overlay" />
      <div className="vignette" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        {/* Walking cat */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
            className="text-center"
          >
            <p className="display-lg text-gold/90">{data.projects.length}</p>
            <p className="label-mono mt-2">Projects shipped</p>
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
