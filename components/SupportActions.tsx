"use client";

import React, { useState } from "react";
import { ViewState } from "@/types/tracking";
import {
  FiMessageSquare,
  FiAlertCircle,
  FiShieldOff,
  FiPhoneCall,
  FiArrowRight,
  FiX,
  FiSend,
} from "react-icons/fi";

interface SupportActionsProps {
  stateKey: ViewState;
  onShowToast: (msg: string) => void;
}

export default function SupportActions({
  stateKey,
  onShowToast,
}: SupportActionsProps) {
  const [activeModal, setActiveModal] = useState<
    "none" | "support" | "report" | "claim"
  >("none");

  // Form states
  const [reportIssueType, setReportIssueType] = useState("delayed");
  const [reportText, setReportText] = useState("");
  const [claimReason, setClaimReason] = useState("not_found");
  const [claimNotes, setClaimNotes] = useState("");

  return (
    <section className="w-full space-y-2 pt-1">
      {stateKey === "delivered_not_received" ? (
        <div className="space-y-2">
          {/* Primary Claim Button for Delivered State */}
          <button
            onClick={() => setActiveModal("claim")}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-lg shadow-rose-600/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <FiShieldOff className="w-4 h-4" />
            <span>Claim Not Received</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveModal("support")}
              className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <FiMessageSquare className="w-3.5 h-3.5 text-blue-600" />
              <span>Contact Support</span>
            </button>
            <button
              onClick={() => setActiveModal("report")}
              className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <FiAlertCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>Report Issue</span>
            </button>
          </div>
        </div>
      ) : (
        /* Standard Action Buttons */
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => setActiveModal("support")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-3 rounded-xl shadow-md shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <FiMessageSquare className="w-4 h-4" />
            <span>Contact Support</span>
          </button>

          <button
            onClick={() => setActiveModal("report")}
            className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs py-3 px-3 rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <FiAlertCircle className="w-4 h-4 text-slate-500" />
            <span>Report Issue</span>
          </button>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* MODALS & DRAWERS */}
      {/* -------------------------------------------------- */}

      {/* A) CONTACT SUPPORT MODAL */}
      {activeModal === "support" && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-3 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <FiMessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    VecoTrack Support
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Est. response time: &lt; 2 mins
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal("none")}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setActiveModal("none");
                  onShowToast("Connecting to live chat agent...");
                }}
                className="w-full bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-3 text-left flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <FiMessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                      Start Live Chat
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Chat directly with courier dispatch
                    </p>
                  </div>
                </div>
                <FiArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </button>

              <button
                onClick={() => {
                  setActiveModal("none");
                  onShowToast("Dialing customer support hotline...");
                }}
                className="w-full bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 rounded-xl p-3 text-left flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <FiPhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                      Call Support Line
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      +1 (800) 555-0199 (Toll Free)
                    </p>
                  </div>
                </div>
                <FiArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
              </button>
            </div>

            <button
              onClick={() => setActiveModal("none")}
              className="w-full py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* B) REPORT ISSUE MODAL */}
      {activeModal === "report" && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-3 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <FiAlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Report Shipment Issue
                  </h3>
                  <p className="text-[11px] text-slate-500">Order #ORD-8921</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal("none")}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Select Issue Category
                </label>
                <select
                  value={reportIssueType}
                  onChange={(e) => setReportIssueType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="delayed">Unusual Shipment Delay</option>
                  <option value="address">Wrong Delivery Address</option>
                  <option value="damaged">Item or Packaging Damaged</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Additional Comments
                </label>
                <textarea
                  rows={3}
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="Describe the issue you are experiencing..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                onClick={() => {
                  setActiveModal("none");
                  setReportText("");
                  onShowToast(
                    "Issue report submitted! Case ticket #TCK-7712 created."
                  );
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <FiSend className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* C) CLAIM NOT RECEIVED MODAL */}
      {activeModal === "claim" && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-3 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                  <FiShieldOff className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    File Non-Receipt Claim
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Priority Carrier Investigation
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal("none")}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-rose-50 rounded-xl p-3 border border-rose-200 text-rose-900 space-y-1">
                <span className="font-bold block text-xs">
                  Quick Verification Checklist:
                </span>
                <ul className="list-disc list-inside text-[11px] space-y-0.5 text-rose-800">
                  <li>Checked porch, garage, and rear entrances?</li>
                  <li>Checked with household members or neighbors?</li>
                </ul>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Reason for Claim
                </label>
                <select
                  value={claimReason}
                  onChange={(e) => setClaimReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
                >
                  <option value="not_found">
                    Checked everywhere, package missing
                  </option>
                  <option value="wrong_photo">
                    Delivery proof photo shows wrong porch
                  </option>
                  <option value="stolen">Suspect stolen or misdelivered</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Details / Instructions
                </label>
                <input
                  type="text"
                  value={claimNotes}
                  onChange={(e) => setClaimNotes(e.target.value)}
                  placeholder="e.g. Looked around front door at 3:00 PM"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <button
                onClick={() => {
                  setActiveModal("none");
                  setClaimNotes("");
                  onShowToast(
                    "Claim #CLM-9012 submitted! Logistics team investigating with driver."
                  );
                }}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-rose-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <FiShieldOff className="w-3.5 h-3.5" />
                <span>Submit Non-Receipt Claim</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
