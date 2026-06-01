"use client";

import { motion } from "framer-motion";
import { Award as AwardIcon } from "lucide-react";
import { useResume } from "@/lib/resume-context";

import Butterflies from "../ui/Butterflies";
import { fadeUpVariants } from "@/components/ui/Card";

export default function AwardsSection() {
  const { data } = useResume();

  return (
    <section
      id="awards"
      className="section-full py-32"
      style={{ background: "linear-gradient(180deg, #160e1b 0%, #0d260a 50%, #261e16 100%)" }}
    >

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 inset-x-0 h-2/3"
          style={{ background: "linear-gradient(0deg, #1c140c 0%, transparent 100%)" }} />
        {/* Caustic light patterns */}
        {[...Array(5)].map((_, i) => (
          <div key={i}
            className="absolute rounded-full mist-layer"
            style={{
              width: `${300 + i * 100}px`,
              height: `${20 + i * 8}px`,
              background: "rgba(100,160,200,0.04)",
              bottom: `${15 + i * 12}%`,
              left: `${i * 20}%`,
              filter: "blur(8px)",
              "--drift-duration": `${16 + i * 4}s`,
              "--drift-delay": `${i * -3}s`,
            } as React.CSSProperties}
          />
        ))}
        <Butterflies count={26}/>
      </div>

      <div className="noise-overlay" />
      <div className="vignette" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        {/* Cat stretching */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="flex justify-center mb-12"
        >
        <img
            src="/images/cat_strecking.png"
            alt="Stretching cat"
            className="w-auto h-48 md:h-56 object-contain"
          />
        </motion.div>

        {/* Section label */}
        <motion.div
          variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="display-lg text-ivory">Awards & honours.</h2>
        </motion.div>
        <br />
        {/* Awards list */}
        <div className="flex flex-col gap-6">
          {data.awards.map((award, i) => (
            <motion.div
              key={award.id}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i * 0.1}
              className="flex items-start gap-5 group"
            >
              <div className="shrink-0 w-10 h-10 border border-gold/20 rounded-sm flex items-center justify-center
                group-hover:border-gold/40 transition-colors">
                <AwardIcon size={14} className="text-gold/40 group-hover:text-gold/70 transition-colors" />
              </div>
              <div className="flex-1 border-b border-white/[0.06] pb-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="font-display text-xl text-ivory font-light mb-0.5">{award.title}</h3>
                    <p className="label-mono text-ivory/35">{award.issuer}</p>
                  </div>
                  <span className="label-mono text-gold/40 shrink-0">{award.year}</span>
                </div>
                {award.description && (
                  <p className="mt-2 font-display text-sm text-ivory/35 font-light leading-relaxed">
                    {award.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
