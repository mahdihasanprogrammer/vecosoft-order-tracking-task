"use client";

import React, { useState } from "react";
import { BadgeVariant } from "@/types/tracking";
import {
  FiCopy,
  FiCheck,
  FiClock,
  FiTruck,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";

interface HeaderProps {
  orderId: string;
  placedDate: string;
  statusLabel: string;
  badgeVariant: BadgeVariant;
  etaDisplay: string;
  subEta: string;
  carrier: string;
  trackingNumber?: string;
  onCopyOrderId: () => void;
}

export default function Header({
  orderId,
  placedDate,
  statusLabel,
  badgeVariant,
  etaDisplay,
  subEta,
  carrier,
  trackingNumber,
  onCopyOrderId,
}: HeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyOrderId();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
      {/* Top Row: Order ID & Status Badge */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Order ID:</span>
            <button
              onClick={handleCopy}
              className="group inline-flex items-center gap-1 font-mono text-sm font-bold text-slate-900 bg-slate-50 hover:bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60 transition-all active:scale-95"
              title="Click to copy Order ID"
            >
              <span>{orderId}</span>
              {copied ? (
                <FiCheck className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <FiCopy className="w-3 h-3 text-slate-400 group-hover:text-slate-700" />
              )}
            </button>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Placed on {placedDate}</p>
        </div>

        {/* Dynamic Status Badge */}
        <div>
          {badgeVariant === "blue" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              {statusLabel}
            </span>
          )}
          {badgeVariant === "amber" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
              <FiAlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              {statusLabel}
            </span>
          )}
          {badgeVariant === "emerald" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <FiCheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              {statusLabel}
            </span>
          )}
          {badgeVariant === "slate" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              <FiClock className="w-3.5 h-3.5 text-slate-500 animate-spin" />
              {statusLabel}
            </span>
          )}
        </div>
      </div>

      {/* Prominent ETA Display */}
      <div className="pt-0.5 flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
            Estimated Delivery
          </span>
          <div className="flex items-center gap-2">
            <FiClock className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              {etaDisplay}
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1 font-medium">{subEta}</p>
        </div>
      </div>

      {/* Carrier Info Bar */}
      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <FiTruck className="w-4 h-4 text-slate-600" />
          <span className="font-semibold text-slate-700">{carrier}</span>
        </div>
        {trackingNumber && (
          <span className="font-mono text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">
            {trackingNumber}
          </span>
        )}
      </div>
    </section>
  );
}
