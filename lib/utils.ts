import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ResumeData } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Resync utilities ---

/**
 * Fetches resume data from a URL (JSON endpoint or raw Overleaf export).
 * Falls back gracefully on parse errors.
 */
export async function fetchResumeFromUrl(url: string): Promise<ResumeData> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const contentType = res.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return res.json() as Promise<ResumeData>;
  }

  // Treat as LaTeX plain text and parse structured comments
  const text = await res.text();
  return parseLatexToResumeData(text);
}

/**
 * Parses a JSON string or File into ResumeData.
 */
export async function parseResumeFile(file: File): Promise<ResumeData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        resolve(json as ResumeData);
      } catch {
        reject(new Error("File is not valid JSON. Export your resume as JSON and try again."));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsText(file);
  });
}

/**
 * Minimal LaTeX parser — extracts content from custom \portfolio{} commands.
 * Supports: \name, \role, \project, \award, \education, \skill
 *
 * Override with a proper parser if your LaTeX schema differs.
 */
export function parseLatexToResumeData(latex: string): ResumeData {
  const extract = (cmd: string) =>
    new RegExp(`\\\\${cmd}\\{([^}]*)\\}`).exec(latex)?.[1]?.trim() ?? "";

  const extractAll = (cmd: string): string[] =>
    Array.from(latex.matchAll(new RegExp(`\\\\${cmd}\\{([^}]*)\\}`, "g"))).map(
      (m) => m[1].trim()
    );

  // Best-effort parse — extend this to match your actual LaTeX schema
  const data: Partial<ResumeData> = {
    name: extract("name") || "Your Name",
    role: extract("role") || "Designer & Engineer",
    tagline: extract("tagline") || "Leave the world better than you found it.",
    email: extract("email") || "",
    github: extract("github") || "",
    linkedin: extract("linkedin") || "",
    skills: { General: extractAll("skill") },
    projects: [],
    awards: [],
    education: [],
    experience: [],
    lastSynced: new Date().toISOString(),
  };

  return data as ResumeData;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
