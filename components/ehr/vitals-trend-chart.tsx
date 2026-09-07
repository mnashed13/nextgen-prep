"use client";

import React from "react";
import { VitalSignEntry } from "@/lib/mock-cases";
import { Activity, AlertTriangle, Flame, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VitalsTrendChartProps {
  vitals: VitalSignEntry[];
}

export function VitalsTrendChart({ vitals }: VitalsTrendChartProps) {
  // Calculate Mean Arterial Pressure (MAP = (2*DBP + SBP)/3)
  const parseMAP = (bpString: string): number | null => {
    const parts = bpString.split("/").map((p) => parseInt(p.trim(), 10));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return Math.round((parts[0] + 2 * parts[1]) / 3);
    }
    return null;
  };

  return (
    <div className="space-y-4 p-4 text-slate-800 text-sm overflow-x-auto max-h-full font-sans">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-rose-600" />
          <span className="font-bold text-slate-900 tracking-wide uppercase text-xs">
            Vital Signs Chronological Trend
          </span>
        </div>
        <div className="flex items-center space-x-2 text-[11px]">
          <span className="inline-flex items-center text-red-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-red-600 mr-1 inline-block animate-ping"></span>
            Abnormal / Critical Value
          </span>
        </div>
      </div>

      {/* Vitals Table */}
      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
              <th className="p-3 font-semibold">Time</th>
              <th className="p-3 font-semibold">Blood Pressure (MAP)</th>
              <th className="p-3 font-semibold">Heart Rate (Pulse)</th>
              <th className="p-3 font-semibold">Resp Rate</th>
              <th className="p-3 font-semibold">Temp</th>
              <th className="p-3 font-semibold">SpO2 (O2 Delivery)</th>
              <th className="p-3 font-semibold">Pain (Scale)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {vitals.map((v, i) => {
              const map = parseMAP(v.bp);
              const isMapCritical = map !== null && map < 65;

              return (
                <tr
                  key={i}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    v.isBpAbnormal || v.isHrAbnormal || v.isTempAbnormal
                      ? "bg-red-50/20"
                      : ""
                  }`}
                >
                  {/* Timestamp */}
                  <td className="p-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {v.timestamp}
                  </td>

                  {/* Blood Pressure & MAP */}
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex items-center space-x-1.5">
                      <span
                        className={`font-mono text-sm ${
                          v.isBpAbnormal
                            ? "font-bold text-red-600 underline decoration-red-400"
                            : "text-slate-800"
                        }`}
                      >
                        {v.bp} mmHg
                      </span>
                      {map !== null && (
                        <span
                          className={`text-[11px] px-1.5 py-0.5 rounded font-mono ${
                            isMapCritical
                              ? "bg-red-600 text-white font-bold animate-pulse"
                              : "bg-slate-100 text-slate-600"
                          }`}
                          title={`Mean Arterial Pressure: ${map} mmHg`}
                        >
                          MAP {map}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Heart Rate */}
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Heart
                        className={`h-3.5 w-3.5 ${
                          v.isHrAbnormal ? "text-red-600 fill-red-600" : "text-slate-400"
                        }`}
                      />
                      <span
                        className={`font-mono ${
                          v.isHrAbnormal
                            ? "font-bold text-red-600"
                            : "text-slate-800"
                        }`}
                      >
                        {v.hr} bpm
                      </span>
                      {v.hr > 100 && (
                        <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">
                          TACHY
                        </Badge>
                      )}
                    </div>
                  </td>

                  {/* Respiratory Rate */}
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`font-mono ${
                        v.isRrAbnormal
                          ? "font-bold text-red-600"
                          : "text-slate-800"
                      }`}
                    >
                      {v.rr} /min
                    </span>
                    {v.rr > 20 && (
                      <span className="ml-1 text-[10px] text-red-700 font-semibold">
                        (Tachypneic)
                      </span>
                    )}
                  </td>

                  {/* Temperature */}
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {v.isTempAbnormal && <Flame className="h-3.5 w-3.5 text-amber-600" />}
                      <span
                        className={`font-mono ${
                          v.isTempAbnormal
                            ? "font-bold text-amber-700"
                            : "text-slate-800"
                        }`}
                      >
                        {v.temp} {v.tempUnit}
                      </span>
                      {v.temp >= 101 && (
                        <Badge variant="warning" className="text-[10px] px-1 py-0 h-4">
                          FEVER
                        </Badge>
                      )}
                    </div>
                  </td>

                  {/* SpO2 & Oxygen */}
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`font-mono ${
                        v.isSpo2Abnormal
                          ? "font-bold text-red-600"
                          : "text-slate-800"
                      }`}
                    >
                      {v.spo2}%
                    </span>
                    <span className="text-slate-500 text-[11px] ml-1">
                      ({v.o2Delivery})
                    </span>
                  </td>

                  {/* Pain */}
                  <td className="p-3 whitespace-nowrap font-medium text-slate-700">
                    {v.painScore}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Clinical Warning Alert Card */}
      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2">
        <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Hemodynamic Alert:</span> Target Mean Arterial Pressure (MAP) for adequate organ perfusion is &ge; 65 mmHg. Notice rapid tachycardia compensations coinciding with falling systolic pressures.
        </div>
      </div>
    </div>
  );
}
