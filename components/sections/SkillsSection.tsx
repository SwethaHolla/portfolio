"use client";

import { motion } from "framer-motion";
import { useResume } from "@/lib/resume-context";
import PixelCat from "@/components/ui/PixelCat";
import Fireflies from "@/components/ui/Fireflies";
import { fadeUpVariants } from "@/components/ui/Card";
import Butterflies from "../ui/Butterflies";

export default function SkillsSection() {
  const { data } = useResume();

  return (
    <section
      id="skills"
      className="section-full py-32"
      style={{ background: "linear-gradient(180deg, #1c140c 0%, #0f1a10 60%, #070905 100%)" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Dappled light */}
        {[...Array(6)].map((_, i) => (
          <div key={i}
            className="absolute rounded-full animate-breathe"
            style={{
              width: `${80 + i * 30}px`,
              height: `${80 + i * 30}px`,
              background: "radial-gradient(circle, rgba(180,230,100,0.04) 0%, transparent 70%)",
              top: `${10 + (i * 15) % 80}%`,
              left: `${5 + (i * 17) % 90}%`,
              animationDelay: `${i * 0.8}s`,
              filter: "blur(10px)",
            }}
          />
        ))}
        {/* <Fireflies count={20} /> */}
        <Butterflies count={30} />
      </div>

      <div className="noise-overlay" />
      <div className="vignette" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-6"
        >
          <p className="label-mono text-ivory/30 mb-3">04 / Skills</p>
          <h2 className="display-lg text-ivory">What I work with.</h2>
        </motion.div>

        {/* Cat chasing butterfly */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="flex justify-start mb-16"
        >
          <PixelCat scene="butterfly" size={13} />
        </motion.div>

        {/* Skill groups */}
        <div className="grid md:grid-cols-2 gap-10">
          {Object.entries(data.skills).map(([category, skills], gi) => (
            <motion.div
              key={category}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={gi * 0.12}
            >
              <p className="label-mono text-gold/50 mb-5">{category}</p>
              <div className="flex flex-wrap gap-2.5">
                {(skills as string[]).map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.08 + si * 0.04, duration: 0.4 }}
                    whileHover={{ scale: 1.05, borderColor: "rgba(201,168,122,0.3)" }}
                    className="px-3 py-1.5 border border-white/[0.08] bg-white/[0.025] rounded-sm
                      font-mono text-sm text-ivory/55 cursor-default transition-colors hover:text-ivory/80"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
