"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { ResumeData } from "@/types";
import defaultData from "@/data/resume.json";
import { fetchResumeFromUrl, parseResumeFile, formatDate } from "@/lib/utils";

interface ResyncState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  lastSynced?: string;
}

interface ResumeContextValue {
  data: ResumeData;
  resync: ResyncState;
  syncFromUrl: (url: string) => Promise<void>;
  syncFromFile: (file: File) => Promise<void>;
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(defaultData as unknown as ResumeData);
  const [resync, setResync] = useState<ResyncState>({
    status: "idle",
    message: "",
  });

  const applyData = useCallback((incoming: ResumeData) => {
    const synced = { ...incoming, lastSynced: new Date().toISOString() };
    setData(synced);
    setResync({
      status: "success",
      message: `Synced ${formatDate(synced.lastSynced!)}`,
      lastSynced: synced.lastSynced,
    });
  }, []);

  const syncFromUrl = useCallback(
    async (url: string) => {
      setResync({ status: "loading", message: "Fetching resume…" });
      try {
        const incoming = await fetchResumeFromUrl(url);
        applyData(incoming);
      } catch (e) {
        setResync({
          status: "error",
          message: e instanceof Error ? e.message : "Unknown error",
        });
      }
    },
    [applyData]
  );

  const syncFromFile = useCallback(
    async (file: File) => {
      setResync({ status: "loading", message: "Reading file…" });
      try {
        const incoming = await parseResumeFile(file);
        applyData(incoming);
      } catch (e) {
        setResync({
          status: "error",
          message: e instanceof Error ? e.message : "Unknown error",
        });
      }
    },
    [applyData]
  );

  return (
    <ResumeContext.Provider value={{ data, resync, syncFromUrl, syncFromFile }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside <ResumeProvider>");
  return ctx;
}
