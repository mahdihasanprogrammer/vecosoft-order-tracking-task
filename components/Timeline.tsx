"use client";

import React, { useState } from "react";
import { TimelineStep, ViewState } from "@/types/tracking";
import {
  FiPackage,
  FiTruck,
  FiMapPin,
  FiCheckCircle,
  FiCheck,
  FiNavigation,
  FiClipboard,
  FiRefreshCw,
  FiBell,
} from "react-icons/fi";

interface TimelineProps {
  timeline: TimelineStep[];
  stateKey: ViewState;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  onNotifyToggle?: () => void;
  notifySubscribed?: boolean;
}

export default function Timeline({
  timeline,
  stateKey,
  onRefresh,
  isRefreshing = false,
  onNotifyToggle,
  notifySubscribed = false,
}: TimelineProps) {
  const [selectedStepId, setSelectedStepId] = useState<string | null>("step-3");

  // Node Icon Renderer
  const renderStepIcon = (
    iconType: TimelineStep["iconType"],
    status: TimelineStep["status"]
  ) => {
    let IconComp = FiPackage;
    if (iconType === "processing") IconComp = FiClipboard;
    if (iconType === "shipped") IconComp = FiTruck;
    if (iconType === "out_for_delivery") IconComp = FiNavigation;
    if (iconType === "delivered") IconComp = FiCheckCircle;

    if (status === "completed") {
      return (
        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 ring-4 ring-white z-10">
          <FiCheck className="w-4 h-4 stroke-[3]" />
        </div>
      );
    }

    if (status === "active") {
      return (
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 ring-4 ring-blue-100 animate-pulse z-10">
          <IconComp className="w-4 h-4" />
        </div>
      );
    }

    return (
      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 border border-slate-300 flex items-center justify-center ring-4 ring-white z-10">
        <IconComp className="w-4 h-4" />
      </div>
    );
  };

  /* Empty State for Tracking Not Available */
  if (stateKey === "tracking_not_available") {
    return (
      <section className="w-full bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs text-center space-y-4">
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-30" />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
            <FiPackage className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h3 className="text-base font-extrabold text-slate-900">
            Processing Order Details
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-[300px] mx-auto leading-relaxed">
            We&apos;ve received your order! Our fulfillment center is currently packing your items. Tracking updates will appear here automatically.
          </p>
        </div>

        {/* Stepper overview */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
            <span className="text-blue-600 font-bold">1. Order Placed ✓</span>
            <span className="text-amber-600 font-bold">2. Packing...</span>
            <span className="text-slate-400">3. Carrier Dispatch</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-amber-500 h-full w-1/2 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all"
          >
            <FiRefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span>Refresh Status</span>
          </button>

          <button
            onClick={onNotifyToggle}
            className={`flex-1 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 border transition-all ${
              notifySubscribed
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <FiBell className="w-3.5 h-3.5" />
            <span>
              {notifySubscribed ? "Alerts Enabled ✓" : "Notify On Dispatch"}
            </span>
          </button>
        </div>
      </section>
    );
  }

  /* Timeline View */
  return (
    <section className="w-full bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <FiNavigation className="w-3.5 h-3.5 text-blue-600" />
          Tracking Timeline (4 Stages)
        </h3>
        <span className="text-[11px] text-slate-400 font-medium">
          Tap step for details
        </span>
      </div>

      <div className="relative pl-3 space-y-6">
        {timeline.map((step, idx) => {
          const isLast = idx === timeline.length - 1;
          const isSelected = selectedStepId === step.id;

          let lineBgClass = "bg-slate-200";
          if (step.status === "completed") {
            lineBgClass = "bg-emerald-500";
          } else if (step.status === "active") {
            lineBgClass = "bg-gradient-to-b from-blue-500 to-slate-200";
          }

          return (
            <div
              key={step.id}
              onClick={() =>
                setSelectedStepId(isSelected ? null : step.id)
              }
              className="relative flex items-start gap-3.5 group cursor-pointer"
            >
              {!isLast && (
                <div
                  className={`absolute left-[15px] top-8 bottom-0 w-1 ${lineBgClass} rounded-full transition-all duration-300`}
                />
              )}

              <div className="flex-shrink-0 mt-0.5">
                {renderStepIcon(step.iconType, step.status)}
              </div>

              <div
                className={`flex-1 rounded-xl p-2.5 transition-all ${
                  isSelected
                    ? "bg-blue-50/70 border border-blue-200/80"
                    : "hover:bg-slate-50 border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      step.status === "completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : step.status === "active"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {step.stageName}
                  </span>
                  {step.timestamp && (
                    <span className="text-[11px] font-semibold text-slate-500">
                      {step.timestamp}
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-1">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {step.description}
                </p>

                {step.location && (
                  <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 mt-1.5">
                    <FiMapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{step.location}</span>
                  </div>
                )}

                {isSelected && (
                  <div className="mt-2.5 pt-2 border-t border-blue-200/60 text-xs text-slate-700 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Facility Code:</span>
                      <span className="font-mono font-semibold">
                        HUB-SEA-8902
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Scan Status:</span>
                      <span className="font-semibold text-emerald-700">
                        Verified Barcode #9812
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
