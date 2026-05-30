import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { ResumeProvider } from "@/lib/resume-context";
import CustomCursor from "@/components/ui/CustomCursor";
import resumeData from "@/data/resume.json";

export const metadata: Metadata = {
  title: {
    default: `${resumeData.name} — ${resumeData.role}`,
    template: `%s | ${resumeData.name}`,
  },
  description: resumeData.philosophy,
  keywords: ["portfolio", "designer", "engineer", resumeData.name, resumeData.role],
  authors: [{ name: resumeData.name }],
  openGraph: {
    type: "website",
    title: resumeData.name,
    description: resumeData.philosophy,
    siteName: resumeData.name,
  },
  twitter: {
    card: "summary_large_image",
    title: resumeData.name,
    description: resumeData.philosophy,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1a120b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <ResumeProvider>
          <CustomCursor />
          {children}
        </ResumeProvider>
      </body>
    </html>
  );
}
