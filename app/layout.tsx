import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CookieConsentBanner } from "@/components/legal/cookie-consent-banner";
import { env } from "@/lib/config/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(env.APP_URL),
  title: {
    default: "NextGen Clinical Simulator | NCLEX-RN & USMLE Case Simulation",
    template: "%s | NextGen Clinical Simulator",
  },
  description:
    "Authentic Computer-Based Testing (CBT) environment with 6-step NCSBN Clinical Judgment Measurement Model, interactive EHR exhibits, and local-first FSRS spaced repetition.",
  keywords: [
    "NextGen NCLEX",
    "NGN",
    "Clinical Judgment Measurement Model",
    "CJMM",
    "USMLE Step 2 CK",
    "CBT Simulator",
    "FSRS spaced repetition",
    "EHR simulation",
    "Nursing simulation Australia",
  ],
  authors: [{ name: env.AU_ENTITY.COMPANY_NAME }],
  creator: env.AU_ENTITY.COMPANY_NAME,
  publisher: env.AU_ENTITY.COMPANY_NAME,
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: env.APP_URL,
    title: "NextGen Clinical Simulator | NCLEX & USMLE Case Simulation",
    description:
      "High-fidelity Computer-Based Testing (CBT) clinical case simulation with 6-step NCSBN scoring rubrics and local FSRS memory retention.",
    siteName: env.APP_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen Clinical Simulator",
    description:
      "High-fidelity Computer-Based Testing (CBT) clinical case simulation with split-screen EHR exhibits.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-100 text-slate-900 selection:bg-blue-200">
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
