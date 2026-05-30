"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useResume } from "@/lib/resume-context";
import PixelCat from "@/components/ui/PixelCat";
import Fireflies from "@/components/ui/Fireflies";
import { fadeUpVariants } from "@/components/ui/Card";
import type { Project } from "@/types";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={index * 0.1}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative group border border-white/[0.07] bg-white/[0.02] rounded-sm overflow-hidden"
    >
      {/* Thumbnail reveal */}
      {project.thumbnail && (
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 1.04 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 z-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.thumbnail}
            alt=""
            className="w-full h-full object-cover opacity-20"
            loading="lazy"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bark-600 via-bark-600/60 to-transparent" />
        </motion.div>
      )}

      {/* Glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(201,168,122,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 p-7">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="label-mono text-gold/50 mb-2">{project.year}</p>
            <h3 className="display-md text-ivory">{project.title}</h3>
          </div>
          <div className="flex gap-3 shrink-0 mt-1">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="text-ivory/25 hover:text-ivory/70 transition-colors">
                <Github size={16} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                aria-label={`${project.title} live site`}
                className="text-ivory/25 hover:text-ivory/70 transition-colors">
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        <p className="text-ivory/45 leading-relaxed mb-5"
          style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 300 }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag}
              className="label-mono px-2 py-1 border border-white/[0.08] rounded-sm bg-white/[0.02]"
              style={{ fontSize: "0.6rem" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const { data } = useResume();

  return (
    <section
      id="projects"
      className="section-full py-32"
      style={{ background: "linear-gradient(180deg, #1a150d 0%, #0f1a18 50%, #0d1a15 100%)" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Koi pond ripples */}
        <div className="absolute bottom-0 inset-x-0 h-64"
          style={{ background: "linear-gradient(0deg, rgba(74,124,158,0.12) 0%, transparent 100%)" }}>
          {[0, 1, 2].map((i) => (
            <div key={i}
              className="absolute left-1/2 -translate-x-1/2 border border-blue-400/10 rounded-full ripple"
              style={{
                width: `${200 + i * 150}px`,
                height: `${60 + i * 40}px`,
                bottom: `${20 + i * 10}px`,
                "--delay": `${i * 1.2}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
        <Fireflies count={10} />
      </div>

      <div className="noise-overlay" />
      <div className="vignette" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-4"
        >
          <p className="label-mono text-ivory/30 mb-3">03 / Projects</p>
          <h2 className="display-lg text-ivory">Things I&rsquo;ve built.</h2>
        </motion.div>

        {/* Cat beside pond */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex justify-end mb-12"
        >
          <PixelCat scene="pond" size={12} />
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
