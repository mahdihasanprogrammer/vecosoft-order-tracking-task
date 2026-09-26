"use client";

import React from "react";
import { NoticeBannerInfo, ViewState } from "@/types/tracking";
import {
  FiAlertTriangle,
  FiShieldOff,
  FiInfo,
  FiExternalLink,
} from "react-icons/fi";

interface NoticeBannerProps {
  banner?: NoticeBannerInfo;
  stateKey: ViewState;
  onOpenClaimModal?: () => void;
  onTriggerSupport?: () => void;
}

export default function NoticeBanner({
  banner,
  stateKey,
  onOpenClaimModal,
  onTriggerSupport,
}: NoticeBannerProps) {
  if (!banner) return null;

  return (
    <section
      className={`w-full rounded-2xl p-4 border transition-all duration-300 ${
        banner.type === "delay"
          ? "bg-amber-50/90 border-amber-200/90 text-amber-950"
          : banner.type === "delivered_warning"
          ? "bg-rose-50/90 border-rose-200/90 text-rose-950"
          : "bg-indigo-50/90 border-indigo-200/90 text-indigo-950"
      }`}
    >
      <div className="flex items-start gap-3">
        {banner.type === "delay" && (
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <FiAlertTriangle className="w-5 h-5" />
          </div>
        )}
        {banner.type === "delivered_warning" && (
          <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <FiShieldOff className="w-5 h-5" />
          </div>
        )}
        {banner.type === "info" && (
          <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <FiInfo className="w-5 h-5" />
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-sm font-bold leading-snug">{banner.title}</h3>
          <p className="text-xs text-slate-700 mt-1 leading-relaxed">
            {banner.message}
          </p>

          {/* Contextual Action Trigger */}
          {stateKey === "delayed" && (
            <button
              onClick={onTriggerSupport}
              className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 underline underline-offset-2"
            >
              <span>{banner.actionText || "Contact Priority Carrier Line"}</span>
              <FiExternalLink className="w-3.5 h-3.5" />
            </button>
          )}

          {stateKey === "delivered_not_received" && (
            <button
              onClick={onOpenClaimModal}
              className="mt-3 inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm active:scale-95 transition-all"
            >
              <FiShieldOff className="w-3.5 h-3.5" />
              <span>{banner.actionText || "Start Non-Receipt Claim"}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
