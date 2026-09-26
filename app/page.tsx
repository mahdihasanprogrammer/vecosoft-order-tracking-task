"use client";

import React, { useState } from "react";
import { ViewState } from "@/types/tracking";
import { mockOrdersData } from "@/data/mockData";
import StateSwitcher from "@/components/StateSwitcher";
import Header from "@/components/Header";
import NoticeBanner from "@/components/NoticeBanner";
import Timeline from "@/components/Timeline";
import OrderSummary from "@/components/OrderSummary";
import SupportActions from "@/components/SupportActions";

import { FiPackage, FiRefreshCw, FiX } from "react-icons/fi";

export default function OrderTrackingPage() {
  const [currentStateKey, setCurrentStateKey] = useState<ViewState>("normal");
  const currentOrder = mockOrdersData[currentStateKey];

  // Interactivity states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notifySubscribed, setNotifySubscribed] = useState(false);

  // Helper for floating toasts
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Refresh trigger handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      triggerToast("Order status re-checked. Still processing at warehouse.");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 py-6 px-3 sm:px-6 flex flex-col items-center justify-start font-sans">
      {/* 1. TOP STATE SWITCHER BAR */}
      <StateSwitcher
        currentState={currentStateKey}
        onSelectState={(stateKey) => {
          setCurrentStateKey(stateKey);
          triggerToast(`Switched to: ${mockOrdersData[stateKey].statusLabel}`);
        }}
      />

      {/* 2. CENTER-ALIGNED MOBILE FRAME (max-w-[430px]) */}
      <main className="w-full max-w-107.5 bg-slate-50 rounded-[36px] shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col relative transition-all duration-300">
        {/* Device Status Bar Header */}
        <div className="bg-white pt-3 pb-2 px-6 flex items-center justify-between border-b border-slate-100 text-xs font-semibold text-slate-800">
          <span>9:41</span>
          <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto shadow-inner flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-800 mr-2" />
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <span className="text-[10px] font-bold">5G</span>
            <div className="w-4 h-2.5 border border-slate-700 rounded-sm p-0.5 flex items-center">
              <div className="w-full h-full bg-slate-700 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Header */}
        <nav className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
              <FiPackage className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-tight">
                VecoTrack
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">
                Official Order Tracking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              title="Refresh tracking status"
              className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-all"
            >
              <FiRefreshCw
                className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-blue-600" : ""}`}
              />
            </button>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live
            </span>
          </div>
        </nav>

        {/* Scrollable Container with Strict Consistent Spacing & Padding */}
        <div className="p-4 space-y-4 overflow-y-auto max-h-187.5 pb-6">
          {/* Header Card Component */}
          <Header
            orderId={currentOrder.orderId}
            placedDate={currentOrder.placedDate}
            statusLabel={currentOrder.statusLabel}
            badgeVariant={currentOrder.badgeVariant}
            etaDisplay={currentOrder.etaDisplay}
            subEta={currentOrder.subEta}
            carrier={currentOrder.carrier}
            trackingNumber={currentOrder.trackingNumber}
            onCopyOrderId={() =>
              triggerToast(
                `Order ID (${currentOrder.orderId}) copied to clipboard!`
              )
            }
          />

          {/* Dynamic Notice Banner Component */}
          <NoticeBanner
            banner={currentOrder.noticeBanner}
            stateKey={currentStateKey}
            onTriggerSupport={() =>
              triggerToast(
                "Priority Carrier Hotline requested. Connecting agent..."
              )
            }
          />

          {/* Timeline / Empty State Component */}
          <Timeline
            timeline={currentOrder.timeline}
            stateKey={currentStateKey}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
            notifySubscribed={notifySubscribed}
            onNotifyToggle={() => {
              setNotifySubscribed(!notifySubscribed);
              triggerToast(
                !notifySubscribed
                  ? "SMS & Email notifications enabled for package dispatch!"
                  : "Dispatch alerts turned off."
              );
            }}
          />

          {/* Order Summary Component */}
          <OrderSummary
            items={currentOrder.items}
            subtotal={currentOrder.subtotal}
            shipping={currentOrder.shipping}
            tax={currentOrder.tax}
            total={currentOrder.total}
            shippingAddress={currentOrder.shippingAddress}
            paymentMethod={currentOrder.paymentMethod}
          />

          {/* Support Actions & Modals Component */}
          <SupportActions
            stateKey={currentStateKey}
            onShowToast={triggerToast}
          />
        </div>

        {/* Floating Toast Notification Component */}
        {toastMessage && (
          <div className="absolute bottom-4 left-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center justify-between border border-slate-700 animate-slideUp">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
