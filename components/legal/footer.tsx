import React from "react";
import Link from "next/link";
import { Stethoscope, Shield, Scale, Lock } from "lucide-react";
import { env } from "@/lib/config/env";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Entity */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold">
                <Stethoscope className="h-4 w-4 text-white" />
              </div>
              <span className="font-extrabold text-base tracking-tight">
                {env.APP_NAME}
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              High-fidelity Computer-Based Testing (CBT) simulation platform engineered for NextGen NCLEX-RN and USMLE Step 2 CK candidates. Features split-screen EHR exhibits, 6 NCSBN Cognitive Steps, and client-side FSRS spaced repetition algorithms.
            </p>
            <div className="text-[11px] text-slate-500 font-mono space-y-0.5 pt-1">
              <div>Entity: {env.AU_ENTITY.COMPANY_NAME}</div>
              <div>ABN: {env.AU_ENTITY.ABN} • ACN: {env.AU_ENTITY.ACN}</div>
              <div>Registered Office: {env.AU_ENTITY.REGISTERED_OFFICE}</div>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="space-y-3">
            <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px] block">
              Simulation Library
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Case Study Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-400 transition-colors">
                  Non-Renewing Passes ($79 AUD)
                </Link>
              </li>
              <li>
                <Link href="/exam/case-sepsis-001" className="hover:text-blue-400 transition-colors">
                  Septic Shock CBT Case
                </Link>
              </li>
              <li>
                <Link href="/exam/case-peds-002" className="hover:text-blue-400 transition-colors">
                  Pediatric Asthma CBT Case
                </Link>
              </li>
              <li>
                <Link href="/exam/case-cardiac-003" className="hover:text-blue-400 transition-colors">
                  Acute Coronary CBT Case
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Australian Regulatory & Legal */}
          <div className="space-y-3">
            <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px] block">
              Australian Compliance
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <Scale className="h-3.5 w-3.5 text-blue-500" />
                  <span>Terms and Conditions</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Privacy Policy (APPs)</span>
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-indigo-500" />
                  <span>ACL Refund Policy</span>
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-slate-500 leading-normal">
                All prices quoted in AUD include 10% Australian GST. Non-renewing access passes.
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Consumer Law Notice Strip */}
        <div className="border-t border-slate-800 pt-6 space-y-3">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed space-y-1.5">
            <div className="flex items-center space-x-1.5 font-bold text-slate-300">
              <Scale className="h-3.5 w-3.5 text-blue-400" />
              <span>Australian Consumer Law (ACL) &amp; Educational Notice</span>
            </div>
            <p>
              Our services come with statutory guarantees that cannot be excluded under Schedule 2 of the <em>Competition and Consumer Act 2010 (Cth)</em>. NextGen Clinical Simulator is an independent educational simulation environment. It is not affiliated with, approved by, or endorsed by the National Council of State Boards of Nursing (NCSBN), the Federation of State Medical Boards (FSMB), the National Board of Medical Examiners (NBME), the Australian Health Practitioner Regulation Agency (AHPRA), or the Nursing and Midwifery Board of Australia (NMBA). Patient data and scenarios are fictitious educational simulations and must not be used for actual clinical patient care.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 pt-2">
            <span>
              &copy; {currentYear} {env.AU_ENTITY.COMPANY_NAME}. All rights reserved.
            </span>
            <div className="flex items-center space-x-4">
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
              <span>•</span>
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
              <span>•</span>
              <Link href="/refund-policy" className="hover:underline">
                Refunds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
