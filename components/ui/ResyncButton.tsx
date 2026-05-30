"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Upload, Link, X, CheckCircle, AlertCircle } from "lucide-react";
import { useResume } from "@/lib/resume-context";
import { cn } from "@/lib/utils";

export default function ResyncButton() {
  const { resync, syncFromUrl, syncFromFile } = useResume();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.name.endsWith(".json")) {
        alert("Please upload a .json file.");
        return;
      }
      setOpen(false);
      await syncFromFile(file);
    },
    [syncFromFile]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleUrlSync = async () => {
    if (!url.trim()) return;
    setOpen(false);
    await syncFromUrl(url.trim());
    setUrl("");
  };

  const statusIcon = {
    idle: null,
    loading: <RefreshCw size={10} className="animate-spin" />,
    success: <CheckCircle size={10} className="text-moss-light" />,
    error: <AlertCircle size={10} className="text-koi" />,
  }[resync.status];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-72 border border-white/10 bg-bark-600/90 backdrop-blur-md rounded-sm p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="label-mono text-ivory/60">Resync Resume</span>
              <button onClick={() => setOpen(false)} className="text-ivory/30 hover:text-ivory/70 transition-colors">
                <X size={13} />
              </button>
            </div>

            {/* File drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => fileRef.current?.click()}
              className={cn(
                "border border-dashed rounded-sm p-6 text-center cursor-pointer transition-colors mb-3",
                dragging
                  ? "border-gold/60 bg-gold/5"
                  : "border-white/10 hover:border-white/25 hover:bg-white/[0.02]"
              )}
            >
              <Upload size={16} className="mx-auto mb-2 text-ivory/30" />
              <p className="label-mono text-ivory/40">Drop resume.json or click</p>
              <input
                ref={fileRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
            </div>

            {/* URL input */}
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://... (JSON endpoint)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUrlSync()}
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-sm px-3 py-2 text-xs text-ivory/70 placeholder:text-ivory/20 focus:outline-none focus:border-white/25"
              />
              <button
                onClick={handleUrlSync}
                className="p-2 border border-white/10 rounded-sm hover:border-white/25 hover:bg-white/[0.04] transition-colors"
              >
                <Link size={13} className="text-ivory/50" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status pill */}
      {resync.status !== "idle" && resync.message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1.5 bg-bark-600/80 border border-white/10 rounded-full px-3 py-1"
        >
          {statusIcon}
          <span className="label-mono text-ivory/50" style={{ fontSize: "0.6rem" }}>
            {resync.message}
          </span>
        </motion.div>
      )}

      {/* Main button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Resync resume data"
        className={cn(
          "flex items-center gap-2 px-4 py-2 border rounded-sm text-xs font-mono transition-all",
          "border-white/10 bg-bark-600/80 backdrop-blur-sm hover:border-white/25 hover:bg-white/[0.04]",
          "text-ivory/50 hover:text-ivory/80"
        )}
      >
        <RefreshCw size={12} className={resync.status === "loading" ? "animate-spin" : ""} />
        Resync
      </button>
    </div>
  );
}
