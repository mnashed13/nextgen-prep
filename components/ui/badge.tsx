import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "cbt";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantClasses = {
    default: "border-transparent bg-blue-600 text-white shadow hover:bg-blue-700",
    secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
    destructive: "border-transparent bg-red-600 text-white shadow hover:bg-red-700",
    outline: "text-slate-950 border border-slate-300",
    success: "border-transparent bg-emerald-600 text-white shadow hover:bg-emerald-700",
    warning: "border-transparent bg-amber-500 text-slate-950 font-semibold shadow hover:bg-amber-600",
    cbt: "border-slate-400 bg-slate-800 text-slate-100 text-[11px] uppercase tracking-wider font-mono",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
