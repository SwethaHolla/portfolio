"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useResume } from "@/lib/resume-context";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { cn } from "@/lib/utils";

const NAV_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navigation() {
  const { data } = useResume();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { threshold: 0.4, rootMargin: "-10% 0px -40% 0px" }
    );
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleNav = useCallback((id: string) => {
    scrollTo(id);
    setMobileOpen(false);
  }, []);

  // Keyboard shortcuts: 1-6 to jump to sections
  useKeyboardShortcuts(
    Object.fromEntries(
      NAV_SECTIONS.map(({ id }, i) => [`${i + 1}`, () => scrollTo(id)])
    )
  );

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-700",
          scrolled
            ? "bg-bark-600/80 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Wordmark */}
          <button
            onClick={() => handleNav("hero")}
            className="label-mono text-ivory/50 hover:text-ivory/90 transition-colors"
          >
            {data.name.split(" ").map((w) => w[0]).join("")}
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6" role="list">
            {NAV_SECTIONS.slice(1).map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => handleNav(id)}
                  className={cn(
                    "label-mono transition-colors",
                    active === id ? "text-ivory/90" : "text-ivory/30 hover:text-ivory/60"
                  )}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Social links */}
          <div className="hidden md:flex items-center gap-4">
            <a href={data.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="text-ivory/30 hover:text-ivory/70 transition-colors">
              <Github size={15} />
            </a>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="text-ivory/30 hover:text-ivory/70 transition-colors">
              <Linkedin size={15} />
            </a>
            <a href={`mailto:${data.email}`} aria-label="Email"
              className="text-ivory/30 hover:text-ivory/70 transition-colors">
              <Mail size={15} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-ivory/50 hover:text-ivory/90"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-14 z-39 bg-bark-600/95 backdrop-blur-md border-b border-white/[0.06] md:hidden"
          >
            <ul className="flex flex-col py-4 px-6 gap-1">
              {NAV_SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => handleNav(id)}
                    className={cn(
                      "w-full text-left py-3 label-mono transition-colors",
                      active === id ? "text-ivory/90" : "text-ivory/40"
                    )}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-5 px-6 pb-5">
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-ivory/30 hover:text-ivory/70">
                <Github size={15} />
              </a>
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-ivory/30 hover:text-ivory/70">
                <Linkedin size={15} />
              </a>
              <a href={`mailto:${data.email}`} className="text-ivory/30 hover:text-ivory/70">
                <Mail size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
