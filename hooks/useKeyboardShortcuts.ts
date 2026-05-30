"use client";

import { useEffect } from "react";

export type ShortcutMap = Record<string, () => void>;

/**
 * Binds keyboard shortcuts. Key format: "mod+k", "shift+r", "escape".
 * "mod" resolves to Ctrl on Windows/Linux and Cmd on Mac.
 */
export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      const key = e.key.toLowerCase();

      for (const [combo, action] of Object.entries(shortcuts)) {
        const parts = combo.toLowerCase().split("+");
        const needsMod = parts.includes("mod");
        const needsShift = parts.includes("shift");
        const triggerKey = parts[parts.length - 1];

        if (
          key === triggerKey &&
          (!needsMod || isMod) &&
          (!needsShift || e.shiftKey)
        ) {
          e.preventDefault();
          action();
          return;
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcuts]);
}
