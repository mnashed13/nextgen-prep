"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calculator as CalcIcon } from "lucide-react";

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalculatorModal({ isOpen, onClose }: CalculatorModalProps) {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  const handleDigit = (d: string) => {
    setDisplay((prev) => (prev === "0" ? d : prev + d));
  };

  const handleOp = (op: string) => {
    setEquation(`${display} ${op} `);
    setDisplay("0");
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
  };

  const handleCalculate = () => {
    try {
      const sanitized = (equation + display).replace(/[^0-9+\-*/.]/g, "");
      const result = Function(`'use strict'; return (${sanitized})`)();
      setDisplay(String(Math.round(result * 10000) / 10000));
      setEquation("");
    } catch {
      setDisplay("Error");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xs p-4 font-sans bg-slate-900 text-white border-slate-700">
        <DialogHeader className="pb-2 border-b border-slate-800">
          <DialogTitle className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
            <CalcIcon className="h-4 w-4 text-blue-400" />
            Standard Clinical CBT Calculator
          </DialogTitle>
        </DialogHeader>

        {/* Display Screen */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-right">
          <div className="text-[10px] text-slate-500 h-4">{equation}</div>
          <div className="text-2xl font-bold text-emerald-400 truncate">
            {display}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-1.5 text-xs font-mono font-bold mt-2">
          <button
            onClick={handleClear}
            className="col-span-2 p-2.5 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 cursor-pointer"
          >
            CLEAR
          </button>
          <button
            onClick={() => handleOp("/")}
            className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 cursor-pointer"
          >
            /
          </button>
          <button
            onClick={() => handleOp("*")}
            className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 cursor-pointer"
          >
            *
          </button>

          {["7", "8", "9"].map((n) => (
            <button
              key={n}
              onClick={() => handleDigit(n)}
              className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 cursor-pointer"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handleOp("-")}
            className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 cursor-pointer"
          >
            -
          </button>

          {["4", "5", "6"].map((n) => (
            <button
              key={n}
              onClick={() => handleDigit(n)}
              className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 cursor-pointer"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handleOp("+")}
            className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 cursor-pointer"
          >
            +
          </button>

          {["1", "2", "3"].map((n) => (
            <button
              key={n}
              onClick={() => handleDigit(n)}
              className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 cursor-pointer"
            >
              {n}
            </button>
          ))}
          <button
            onClick={handleCalculate}
            className="row-span-2 p-2.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-extrabold flex items-center justify-center cursor-pointer"
          >
            =
          </button>

          <button
            onClick={() => handleDigit("0")}
            className="col-span-2 p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 cursor-pointer"
          >
            0
          </button>
          <button
            onClick={() => handleDigit(".")}
            className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 cursor-pointer"
          >
            .
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
