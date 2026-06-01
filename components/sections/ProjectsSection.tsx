"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Fireflies from "@/components/ui/Fireflies";
import Butterflies from "@/components/ui/Butterflies";
import { fadeUpVariants } from "@/components/ui/Card";
import type { PinnedRepo } from "@/types";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function StarIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ForkIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="6" cy="18" r="2" />
      <path d="M6 8v8M18 8v1a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V8" />
    </svg>
  );
}

function usePinnedRepos() {
  const [repos, setRepos] = useState<PinnedRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/github/pinned")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); setRepos([]); }
        else { setRepos(data); }
      })
      .catch(() => setError("Failed to load repos"))
      .finally(() => setLoading(false));
  }, []);

  return { repos, loading, error };
}

function RepoCard({ repo, index }: { repo: PinnedRepo; index: number }) {
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
      {/* Glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(201,168,122,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 p-7 flex flex-col h-full">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <GithubIcon size={16} />
            <h3 className="display-md text-ivory truncate">{repo.name}</h3>
          </div>
          <a href={repo.url} target="_blank" rel="noopener noreferrer"
            aria-label={`${repo.name} on GitHub`}
            className="text-ivory/25 hover:text-ivory/70 transition-colors shrink-0 mt-1">
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Description */}
        <p className="text-ivory/45 leading-relaxed line-clamp-3 flex-1"
          style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 300 }}>
          {repo.description || "No description"}
        </p>

        {/* Footer row — language + stats */}
        <div className="flex items-center gap-5 mt-5 pt-4 border-t border-white/[0.06]">
          {repo.primaryLanguage && (
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: repo.primaryLanguage.color }}
              />
              <span className="label-mono text-ivory/40" style={{ fontSize: "0.6rem" }}>
                {repo.primaryLanguage.name}
              </span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-ivory/40">
              <StarIcon size={13} />
              <span className="label-mono" style={{ fontSize: "0.6rem" }}>{repo.stargazerCount}</span>
            </div>
            <div className="flex items-center gap-1 text-ivory/40">
              <ForkIcon size={13} />
              <span className="label-mono" style={{ fontSize: "0.6rem" }}>{repo.forkCount}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const { repos, loading, error } = usePinnedRepos();

  return (
    <section
      id="projects"
      className="section-full py-32"
      style={{ background: "linear-gradient(180deg, #1a150d 0%, #0f1a18 50%, #63c4e1 100%)" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Layered sine waves — same as before */}
        <div className="absolute bottom-0 inset-x-0 h-64">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 256" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGrad1" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#5ea6bc" />
                <stop offset="100%" stopColor="#4a8da0" />
              </linearGradient>
              <linearGradient id="waveGrad2" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#3a6a78" />
                <stop offset="100%" stopColor="#2a4a55" />
              </linearGradient>
              <linearGradient id="waveGrad3" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#125a6ccc" />
                <stop offset="100%" stopColor="#045286" />
              </linearGradient>
            </defs>
          </svg>
          {/* Far waves */}
          <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 512" preserveAspectRatio="none"
            animate={{ y: [0, -256] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
            <path d="M0,128 C120,64 240,192 360,128 C480,64 600,192 720,128 C840,64 960,192 1080,128 C1200,64 1320,192 1440,128 L1440,384 C1320,448 1200,320 1080,384 C960,448 840,320 720,384 C600,448 480,320 360,384 C240,448 120,320 0,384 Z"
              fill="url(#waveGrad1)" opacity="0.15" />
            <path d="M0,256 C144,192 288,320 432,256 C576,192 720,320 864,256 C1008,192 1152,320 1296,256 L1440,256 L1440,512 C1296,448 1152,576 1008,512 C864,448 720,576 576,512 C432,448 288,576 144,512 L0,512 Z"
              fill="url(#waveGrad1)" opacity="0.1" />
            <path d="M0,384 C120,320 240,448 360,384 C480,320 600,448 720,384 C840,320 960,448 1080,384 C1200,320 1320,448 1440,384 L1440,512 C1320,480 1200,544 1080,512 C960,480 840,544 720,512 C600,480 480,544 360,512 C240,480 120,544 0,512 Z"
              fill="url(#waveGrad1)" opacity="0.08" />
          </motion.svg>
          {/* Mid waves */}
          <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 512" preserveAspectRatio="none"
            animate={{ y: [0, -256] }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }}>
            <path d="M0,96 C160,16 320,176 480,96 C640,16 800,176 960,96 C1120,16 1280,176 1440,96 L1440,352 C1280,272 1120,432 960,352 C800,272 640,432 480,352 C320,272 160,432 0,352 Z"
              fill="url(#waveGrad2)" opacity="0.25" />
            <path d="M0,224 C180,144 360,304 540,224 C720,144 900,304 1080,224 C1260,144 1440,304 1440,224 L1440,480 C1260,400 1080,560 900,480 C720,400 540,560 360,480 C180,400 0,560 0,480 Z"
              fill="url(#waveGrad2)" opacity="0.2" />
            <path d="M0,352 C140,272 280,432 420,352 C560,272 700,432 840,352 C980,272 1120,432 1260,352 L1440,352 L1440,512 C1260,432 1120,592 980,512 C840,432 700,592 560,512 C420,432 280,592 140,512 L0,512 Z"
              fill="url(#waveGrad2)" opacity="0.15" />
          </motion.svg>
          {/* Near waves */}
          <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 512" preserveAspectRatio="none"
            animate={{ y: [0, -256] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
            <path d="M0,64 C200,-32 400,160 600,64 C800,-32 1000,160 1200,64 L1440,64 L1440,320 C1240,256 1040,448 840,320 C640,256 440,448 240,320 L0,320 Z"
              fill="url(#waveGrad3)" opacity="0.4" />
            <path d="M0,192 C220,96 440,288 660,192 C880,96 1100,288 1320,192 L1440,192 L1440,448 C1220,352 1000,544 780,448 C560,352 340,544 120,448 L0,448 Z"
              fill="url(#waveGrad3)" opacity="0.3" />
            <path d="M0,320 C160,224 320,416 480,320 C640,224 800,416 960,320 C1120,224 1280,416 1440,320 L1440,512 C1280,416 1120,608 960,512 C800,416 640,608 560,512 C320,416 160,608 0,512 Z"
              fill="url(#waveGrad3)" opacity="0.25" />
          </motion.svg>
          {/* Koi fish */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div className="absolute" style={{ bottom: "35%" }}
              animate={{ x: ["-10vw", "110vw"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
              <svg width="80" height="30" viewBox="0 0 80 30">
                <ellipse cx="30" cy="15" rx="28" ry="10" fill="rgba(236, 232, 8, 0.4)" />
                <ellipse cx="38" cy="15" rx="12" ry="8" fill="rgba(255,180,120,0.35)" />
                <polygon points="0,15 8,5 8,25" fill="rgba(255,140,80,0.4)" />
                <circle cx="36" cy="12" r="2" fill="rgba(255,255,255,0.3)" />
              </svg>
            </motion.div>
            <motion.div className="absolute" style={{ bottom: "20%" }}
              animate={{ x: ["110vw", "-10vw"] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
              <svg width="70" height="28" viewBox="0 0 70 28">
                <ellipse cx="40" cy="14" rx="26" ry="10" fill="rgba(255,220,200,0.35)" />
                <ellipse cx="32" cy="14" rx="10" ry="7" fill="rgba(255,100,80,0.3)" />
                <polygon points="68,14 78,4 78,24" fill="rgba(255,220,200,0.35)" />
                <circle cx="34" cy="11" r="2" fill="rgba(255,255,255,0.25)" />
              </svg>
            </motion.div>
            <motion.div className="absolute" style={{ bottom: "50%" }}
              animate={{ x: ["110vw", "-10vw"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
              <svg width="60" height="22" viewBox="0 0 60 22">
                <ellipse cx="38" cy="11" rx="20" ry="8" fill="rgba(255,200,100,0.35)" />
                <ellipse cx="32" cy="11" rx="8" ry="5" fill="rgba(255,220,140,0.3)" />
                <polygon points="60,11 53,2 53,20" fill="rgba(255,200,100,0.35)" />
              </svg>
            </motion.div>
          </div>
        </div>
        <Fireflies count={30} maxTop={50} />
      </div>

      <div className="noise-overlay" />
      <div className="vignette" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="display-lg text-ivory">Things I&rsquo;ve built.</h2>
          <br />
          <br />
        </motion.div>

        {/* Cat beside pond */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="flex justify-end mb-12"
        >
        </motion.div>

        {/* Pinned repos grid */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-white/[0.07] bg-white/[0.02] rounded-sm p-7 animate-pulse">
                <div className="h-5 bg-white/[0.06] rounded w-3/4 mb-4" />
                <div className="h-3 bg-white/[0.04] rounded w-full mb-2" />
                <div className="h-3 bg-white/[0.04] rounded w-5/6 mb-2" />
                <div className="h-3 bg-white/[0.04] rounded w-2/3 mt-6" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="label-mono text-koi/60">{error}</p>
            <p className="mt-2 text-ivory/30 text-sm">Set GITHUB_TOKEN in .env.local and restart the dev server.</p>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="text-center py-16">
            <p className="label-mono text-ivory/30">No pinned repositories found.</p>
          </div>
        )}

        {!loading && !error && repos.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo, i) => (
              <RepoCard key={repo.name} repo={repo} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
