"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Mail, Menu, X } from "lucide-react";

function GithubIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
import { useResume } from "@/lib/resume-context";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { cn } from "@/lib/utils";

const NAV_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "awards", label: "Awards" }
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navigation() {
  const { data } = useResume();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y > 60) {
        setHidden(y > lastScrollY.current);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
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
          "fixed top-0 inset-x-0 z-40 transition-all duration-500",
          hidden ? "-translate-y-full" : "translate-y-0",
          scrolled
            ? "bg-bark-600/80 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent"
        )}
      >
        <div className="flex h-20 items-center gap-x-6 justify-between">
          {/* Spacer */}
          <div className="w-[0.25px]" />

          {/* Left */}
          <button
            onClick={() => handleNav("hero")}
            className="font-display text-lg text-ivory/50 hover:text-ivory/90 transition-colors tracking-wide pl-4"
          >
            {data.name}
          </button>

          {/* Center */}
          <ul className="hidden md:flex gap-10" role="list">
            {NAV_SECTIONS.slice(1).map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => handleNav(id)}
                  className={cn(
                    "font-display text-base transition-colors tracking-wide",
                    active === id ? "text-ivory/90" : "text-ivory/40 hover:text-ivory/70"
                  )}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right */}
          <div className="hidden md:flex gap-6 pr-10">
            <a href={data.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="text-ivory/30 hover:text-ivory/70 transition-colors">
              <GithubIcon size={20} />
            </a>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="text-ivory/30 hover:text-ivory/70 transition-colors">
              <LinkedInIcon size={20} />
            </a>
            <a href={`mailto:${data.email}`} aria-label="Email"
              className="text-ivory/30 hover:text-ivory/70 transition-colors">
              <Mail size={20} />
            </a>
            <a href="/api/resume" target="_blank" rel="noopener noreferrer" aria-label="Resume"
              className="text-ivory/30 hover:text-ivory/70 transition-colors">
              <Download size={20} />
            </a>
            <div className="w-[0.25px]" />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-ivory/50 hover:text-ivory/90"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
            <div className="flex gap-6 px-6 pb-5">
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-ivory/30 hover:text-ivory/70">
                <GithubIcon size={18} />
              </a>
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-ivory/30 hover:text-ivory/70">
                <LinkedInIcon size={18} />
              </a>
              <a href={`mailto:${data.email}`} className="text-ivory/30 hover:text-ivory/70">
                <Mail size={18} />
              </a>
              <a href="/api/resume" target="_blank" rel="noopener noreferrer" className="text-ivory/30 hover:text-ivory/70">
                <Download size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
