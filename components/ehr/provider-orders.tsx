"use client";

import React from "react";
import { ProviderOrderEntry } from "@/lib/mock-cases";
import { ClipboardList, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProviderOrdersProps {
  orders: ProviderOrderEntry[];
}

export function ProviderOrders({ orders }: ProviderOrdersProps) {
  return (
    <div className="space-y-4 p-4 text-slate-800 text-sm overflow-y-auto max-h-full font-sans">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <ClipboardList className="h-4 w-4 text-teal-700" />
          <span className="font-bold text-slate-900 tracking-wide uppercase text-xs">
            Active Provider & Interdisciplinary Orders
          </span>
        </div>
        <span className="text-[11px] text-slate-500">
          Showing {orders.length} orders
        </span>
      </div>

      <div className="space-y-2.5">
        {orders.map((ord) => {
          const isStat = ord.urgency === "STAT";

          return (
            <div
              key={ord.id}
              className={`p-3.5 rounded-lg border bg-white shadow-xs transition-shadow hover:shadow-sm ${
                isStat ? "border-amber-300 bg-amber-50/10" : "border-slate-200"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={isStat ? "destructive" : "secondary"}
                    className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5"
                  >
                    {ord.urgency}
                  </Badge>
                  <span className="font-semibold text-slate-700">
                    {ord.orderType}
                  </span>
                  {ord.route && (
                    <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      Route: {ord.route}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-slate-500 text-[11px] font-mono">
                  <Clock className="h-3 w-3" />
                  <span>{ord.timestamp}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed">
                {ord.description}
              </p>

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Status: {ord.status}</span>
                </div>
                <span className="font-mono text-slate-400">ID: {ord.id}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
