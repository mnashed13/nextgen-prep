"use client";

import React, { useState } from "react";
import { LabResultEntry } from "@/lib/mock-cases";
import { FlaskConical, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LabResultsTableProps {
  labs: LabResultEntry[];
}

export function LabResultsTable({ labs }: LabResultsTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(labs.map((l) => l.category)))];

  const filteredLabs =
    selectedCategory === "All"
      ? labs
      : labs.filter((l) => l.category === selectedCategory);

  return (
    <div className="space-y-4 p-4 text-slate-800 text-sm overflow-y-auto max-h-full font-sans">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 gap-2">
        <div className="flex items-center space-x-2">
          <FlaskConical className="h-4 w-4 text-indigo-600" />
          <span className="font-bold text-slate-900 tracking-wide uppercase text-xs">
            Diagnostic Laboratory Panel
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-700 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lab Results Table */}
      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
              <th className="p-3 font-semibold">Test Name</th>
              <th className="p-3 font-semibold">Result</th>
              <th className="p-3 font-semibold">Flag</th>
              <th className="p-3 font-semibold">Reference Range</th>
              <th className="p-3 font-semibold hidden sm:table-cell">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredLabs.map((lab, index) => {
              const isHigh = lab.flag === "H" || lab.flag === "CRITICAL";
              const isLow = lab.flag === "L";
              const isCritical = lab.flag === "CRITICAL";

              return (
                <tr
                  key={index}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    isCritical
                      ? "bg-red-50/40"
                      : isHigh
                      ? "bg-amber-50/20"
                      : isLow
                      ? "bg-blue-50/20"
                      : ""
                  }`}
                >
                  <td className="p-3 font-medium text-slate-900">
                    {lab.testName}
                  </td>
                  <td className="p-3 font-mono font-bold whitespace-nowrap">
                    <span
                      className={`${
                        isCritical
                          ? "text-red-700 font-extrabold text-sm"
                          : isHigh
                          ? "text-red-600"
                          : isLow
                          ? "text-blue-700"
                          : "text-slate-800"
                      }`}
                    >
                      {lab.value} {lab.unit}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {lab.flag === "NORMAL" ? (
                      <span className="inline-flex items-center text-emerald-700 text-[11px]">
                        <Check className="h-3 w-3 mr-0.5" /> Normal
                      </span>
                    ) : (
                      <Badge
                        variant={isCritical ? "destructive" : isHigh ? "destructive" : "secondary"}
                        className={`text-[10px] px-1.5 py-0 uppercase font-mono ${
                          isCritical ? "animate-pulse ring-1 ring-red-500" : ""
                        }`}
                      >
                        {lab.flag}
                      </Badge>
                    )}
                  </td>
                  <td className="p-3 font-mono text-slate-500 whitespace-nowrap">
                    {lab.referenceRange} {lab.unit}
                  </td>
                  <td className="p-3 text-slate-500 hidden sm:table-cell">
                    {lab.category}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
