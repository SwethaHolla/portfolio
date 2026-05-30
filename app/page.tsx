"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AwardsSection from "@/components/sections/AwardsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/sections/EducationSection";
import ResyncButton from "@/components/ui/ResyncButton";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

// Keyboard shortcut legend
const SHORTCUTS = [
  { key: "1–6", desc: "Jump to section" },
  { key: "?", desc: "Toggle shortcuts" },
];

export default function HomePage() {
  const [showShortcuts, setShowShortcuts] = useState(false);

  useKeyboardShortcuts({
    "?": () => setShowShortcuts((v) => !v),
    "escape": () => setShowShortcuts(false),
  });

  return (
    <main>
      <Navigation />

      {/* Sections */}
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <AwardsSection />
      <SkillsSection />
      <EducationSection />

      {/* Resync */}
      <ResyncButton />

      {/* Keyboard shortcut legend */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-20 left-6 z-50 border border-white/10 bg-bark-600/90
              backdrop-blur-md rounded-sm px-5 py-4 shadow-2xl"
          >
            <p className="label-mono text-ivory/30 mb-3" style={{ fontSize: "0.6rem" }}>
              Keyboard shortcuts
            </p>
            {SHORTCUTS.map(({ key, desc }) => (
              <div key={key} className="flex items-center gap-4 mb-1.5">
                <kbd className="label-mono px-1.5 py-0.5 border border-white/15 rounded-sm bg-white/[0.04]"
                  style={{ fontSize: "0.6rem" }}>
                  {key}
                </kbd>
                <span className="label-mono text-ivory/40" style={{ fontSize: "0.6rem" }}>{desc}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shortcut hint — bottom left corner */}
      <button
        onClick={() => setShowShortcuts((v) => !v)}
        className="fixed bottom-6 left-6 z-40 label-mono text-ivory/15 hover:text-ivory/40 transition-colors"
        style={{ fontSize: "0.58rem" }}
        aria-label="Show keyboard shortcuts"
      >
        ? shortcuts
      </button>
    </main>
  );
}
