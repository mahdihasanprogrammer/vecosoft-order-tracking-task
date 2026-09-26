"use client";

import React from "react";
import { ViewState } from "@/types/tracking";
import { viewStatesList } from "@/data/mockData";
import { FiLayers } from "react-icons/fi";

interface StateSwitcherProps {
  currentState: ViewState;
  onSelectState: (state: ViewState) => void;
}

export default function StateSwitcher({
  currentState,
  onSelectState,
}: StateSwitcherProps) {
  return (
    <header className="w-full max-w-[430px] mx-auto mb-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-sm border border-slate-200/90 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              <FiLayers className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              State Switcher Bar
            </span>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            Interactive Test
          </span>
        </div>

        {/* Horizontal Scrollable Tab Bar with smooth scroll hiding */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex-nowrap">
          {viewStatesList.map((st) => {
            const isSelected = currentState === st.key;
            return (
              <button
                key={st.key}
                onClick={() => onSelectState(st.key)}
                className={`whitespace-nowrap flex-shrink-0 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 flex items-center justify-center ${
                  isSelected
                    ? "bg-white text-blue-600 shadow-sm font-extrabold border border-slate-200/90 ring-1 ring-blue-500/10 scale-[1.02]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 font-semibold"
                }`}
              >
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
