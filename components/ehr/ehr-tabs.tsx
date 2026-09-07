"use client";

import React, { useState } from "react";
import { EHRData } from "@/lib/mock-cases";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { NursesNotes } from "./nurses-notes";
import { VitalsTrendChart } from "./vitals-trend-chart";
import { LabResultsTable } from "./lab-results-table";
import { ProviderOrders } from "./provider-orders";
import {
  User,
  FileText,
  Activity,
  FlaskConical,
  ClipboardList,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EHRTabsProps {
  ehr: EHRData;
  isReviewMode?: boolean;
}

export function EHRTabs({ ehr, isReviewMode = false }: EHRTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("notes");
  const { patientProfile } = ehr;

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-300 select-none overflow-hidden">
      {/* Patient Demographic Banner (Authentic Hospital EHR Header) */}
      <div className="bg-slate-800 text-slate-100 p-3 border-b border-slate-700 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Patient Identity */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
              <User className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-white">
                  {patientProfile.name}
                </span>
                <span className="text-xs text-slate-300">
                  ({patientProfile.age} yo {patientProfile.gender})
                </span>
                <Badge variant="cbt" className="bg-slate-900 border-slate-600 text-[10px]">
                  {patientProfile.codeStatus}
                </Badge>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {patientProfile.mrn} • Weight: {patientProfile.weightKg} kg • Admit: {patientProfile.admitDate}
              </div>
            </div>
          </div>

          {/* Critical Allergy Alert */}
          <div className="flex items-center space-x-1.5 bg-red-950/80 border border-red-700/60 text-red-200 px-2.5 py-1 rounded text-xs font-semibold">
            <ShieldAlert className="h-4 w-4 text-red-400 shrink-0" />
            <span className="truncate max-w-[240px]">
              Allergies: {patientProfile.allergies.join(", ")}
            </span>
          </div>
        </div>

        {/* Diagnosis Bar */}
        <div className="mt-2 pt-2 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-300">
          <div className="truncate">
            <span className="text-slate-400">Diagnosis: </span>
            <span className="font-semibold text-slate-200">{patientProfile.diagnosis}</span>
          </div>
          <div className="text-slate-400 text-[11px] hidden sm:block">
            Attending: {patientProfile.attendingPhysician}
          </div>
        </div>
      </div>

      {/* EHR Tabbed Navigation */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col flex-1 overflow-hidden"
      >
        <div className="bg-slate-100 px-3 pt-2 border-b border-slate-200">
          <TabsList className="bg-slate-200/80 h-9 p-0.5 space-x-1">
            <TabsTrigger
              value="notes"
              className="text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-blue-800 gap-1.5 py-1.5"
            >
              <FileText className="h-3.5 w-3.5" />
              Nurses&apos; Notes
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded-full">
                {ehr.nursesNotes.length}
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="vitals"
              className="text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-rose-700 gap-1.5 py-1.5"
            >
              <Activity className="h-3.5 w-3.5" />
              Vital Signs
              <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded-full">
                {ehr.vitals.length}
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="labs"
              className="text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-indigo-800 gap-1.5 py-1.5"
            >
              <FlaskConical className="h-3.5 w-3.5" />
              Lab Results
              <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.2 rounded-full">
                {ehr.labs.length}
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="orders"
              className="text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-teal-800 gap-1.5 py-1.5"
            >
              <ClipboardList className="h-3.5 w-3.5" />
              Provider Orders
              <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-1.5 py-0.2 rounded-full">
                {ehr.orders.length}
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Panes */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          <TabsContent value="notes" className="m-0 h-full">
            <NursesNotes notes={ehr.nursesNotes} isReviewMode={isReviewMode} />
          </TabsContent>

          <TabsContent value="vitals" className="m-0 h-full">
            <VitalsTrendChart vitals={ehr.vitals} />
          </TabsContent>

          <TabsContent value="labs" className="m-0 h-full">
            <LabResultsTable labs={ehr.labs} />
          </TabsContent>

          <TabsContent value="orders" className="m-0 h-full">
            <ProviderOrders orders={ehr.orders} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
