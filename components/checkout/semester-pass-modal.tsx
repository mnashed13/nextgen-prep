"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { activateAccessPass } from "@/lib/engine/fsrs-scheduler";
import confetti from "canvas-confetti";
import {
  CreditCard,
  Lock,
  CheckCircle2,
  Tag,
  Scale,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SemesterPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPassType?: "semester_cram" | "full_access";
}

export function SemesterPassModal({
  isOpen,
  onClose,
  defaultPassType = "semester_cram",
}: SemesterPassModalProps) {
  const router = useRouter();
  const [passType, setPassType] = useState<"semester_cram" | "full_access">(
    defaultPassType
  );
  const [name, setName] = useState("Candidate M. Nashed");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvc, setCvc] = useState("981");
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const basePrice = passType === "semester_cram" ? 79 : 149;
  const finalPrice = Math.max(0, Math.round(basePrice * (1 - discountPercent / 100)));
  const gstAmount = (finalPrice / 11).toFixed(2);

  const handleApplyCoupon = () => {
    setCouponError("");
    const clean = coupon.trim().toUpperCase();
    if (clean === "NEXTGEN100" || clean === "STUDENT100") {
      setDiscountPercent(100);
    } else if (clean === "CRAM20" || clean === "PASS20") {
      setDiscountPercent(20);
    } else {
      setCouponError("Invalid coupon code. Try 'NEXTGEN100' for demo access.");
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);
      activateAccessPass(passType, orderNumber);
      setIsProcessing(false);
      setIsSuccess(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback
      }
    }, 1200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg font-sans p-6">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-blue-400 bg-blue-50 text-blue-800 text-[10px] font-bold">
              NON-RENEWING SECURE CHECKOUT
            </Badge>
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900 mt-1">
            {isSuccess ? "Access Pass Activated!" : "Activate Your Clinical Exam Pass"}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            {isSuccess
              ? "Your account now has active CBT simulation privileges."
              : "One-time payment. Never recurring. Immediate access."}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                {passType === "semester_cram"
                  ? "90-Day Semester Cram Pass Active"
                  : "180-Day Full Access Pass Active"}
              </h3>
              <p className="text-xs text-slate-600 max-w-sm">
                You now have unrestricted access to all NextGen Clinical case studies, EHR exhibits, and the FSRS spaced repetition engine.
              </p>
            </div>

            <Button
              variant="default"
              size="lg"
              onClick={() => {
                onClose();
                router.push("/");
              }}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs"
            >
              Return to Case Library & Dashboard
            </Button>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="space-y-4 text-xs">
            {/* Pass Selection Radio Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setPassType("semester_cram")}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  passType === "semester_cram"
                    ? "border-blue-600 bg-blue-50/70 ring-1 ring-blue-500"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="font-bold text-slate-900">90-Day Pass</div>
                <div className="text-slate-500 text-[11px]">Semester Cram</div>
                <div className="font-mono font-bold text-blue-700 mt-1">$79 AUD</div>
                <div className="text-[10px] text-slate-400">inc. GST • Non-renewing</div>
              </button>

              <button
                type="button"
                onClick={() => setPassType("full_access")}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  passType === "full_access"
                    ? "border-blue-600 bg-blue-50/70 ring-1 ring-blue-500"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="font-bold text-slate-900">180-Day Pass</div>
                <div className="text-slate-500 text-[11px]">Full Clinical Access</div>
                <div className="font-mono font-bold text-blue-700 mt-1">$149 AUD</div>
                <div className="text-[10px] text-slate-400">inc. GST • Non-renewing</div>
              </button>
            </div>

            {/* Candidate Billing Details */}
            <div className="space-y-2.5 pt-2">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-8 px-2.5 rounded border border-slate-300 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 flex items-center justify-between">
                  <span>Card Information</span>
                  <span className="text-[10px] text-slate-400 flex items-center">
                    <Lock className="h-3 w-3 mr-0.5" /> 256-bit SSL Simulated
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full h-8 pl-8 pr-2.5 rounded border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
                  />
                  <CreditCard className="h-4 w-4 text-slate-400 absolute left-2.5 top-2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Expires
                  </label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full h-8 px-2.5 rounded border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    required
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="w-full h-8 px-2.5 rounded border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="pt-2 border-t border-slate-200">
              <label className="block text-slate-700 font-semibold mb-1">
                Promotional / Institution Code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="e.g. NEXTGEN100"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 h-8 px-2.5 rounded border border-slate-300 uppercase font-mono text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleApplyCoupon}
                  className="h-8 text-xs font-semibold px-3"
                >
                  Apply
                </Button>
              </div>
              {discountPercent > 0 && (
                <div className="text-emerald-700 text-[11px] font-semibold mt-1 flex items-center">
                  <Tag className="h-3 w-3 mr-1" />
                  Coupon applied: {discountPercent}% discount
                </div>
              )}
              {couponError && (
                <div className="text-red-600 text-[11px] mt-1">{couponError}</div>
              )}
            </div>

            {/* Price Summary with Australian GST Breakdown */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Total Billed Today:</span>
                <div className="text-right">
                  {discountPercent > 0 && (
                    <span className="text-slate-400 line-through text-xs mr-2 font-mono">
                      ${basePrice} AUD
                    </span>
                  )}
                  <span className="text-lg font-mono font-extrabold text-slate-950">
                    ${finalPrice} AUD
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                <span>Includes 10% Australian GST:</span>
                <span className="font-mono font-medium">${gstAmount} AUD</span>
              </div>
              <div className="text-[10px] text-slate-400 text-right">
                Single charge • Strictly non-renewing fixed license
              </div>
            </div>

            {/* Australian Terms & Privacy Consent Checkbox */}
            <div className="pt-1 flex items-start space-x-2">
              <Checkbox
                id="modal-terms-checkbox"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                className="mt-0.5"
              />
              <label
                htmlFor="modal-terms-checkbox"
                className="text-[11px] text-slate-600 leading-tight cursor-pointer"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  target="_blank"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Terms and Conditions
                </Link>
                ,{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Privacy Policy (APPs)
                </Link>
                , and understand my statutory rights under the{" "}
                <Link
                  href="/refund-policy"
                  target="_blank"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Australian Consumer Law
                </Link>
                .
              </label>
            </div>

            <Button
              type="submit"
              disabled={isProcessing || !agreedToTerms}
              variant="default"
              size="lg"
              className="w-full h-11 text-xs sm:text-sm font-bold bg-blue-700 hover:bg-blue-800 text-white cursor-pointer disabled:opacity-50"
            >
              {isProcessing
                ? "Authorizing Clinical License..."
                : `Confirm & Pay $${finalPrice} AUD`}
            </Button>

            <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <Scale className="h-3 w-3 text-slate-400" />
              <span>Protected by the Australian Consumer Law Guarantees</span>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
