"use client";

import React, { useState } from "react";
import Image from "next/image";
import { OrderItem } from "@/types/tracking";
import {
  FiPackage,
  FiChevronDown,
  FiChevronUp,
  FiMapPin,
  FiCreditCard,
} from "react-icons/fi";

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: string;
  paymentMethod: string;
}

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  tax,
  total,
  shippingAddress,
  paymentMethod,
}: OrderSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Accordion Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition-all text-left"
      >
        <div className="flex items-center gap-2">
          <FiPackage className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Order Summary
          </span>
          <span className="text-xs text-slate-400 font-medium">
            ({items.length} item{items.length > 1 ? "s" : ""})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold text-slate-900">
            ${total.toFixed(2)}
          </span>
          {isExpanded ? (
            <FiChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <FiChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </div>
      </button>

      {/* Accordion Body */}
      {isExpanded && (
        <div className="p-4 pt-2 space-y-4 border-t border-slate-100">
          {/* Product Items List */}
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              <div className="relative w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 shadow-xs">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {item.name}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {item.variant}
                </p>
                <div className="flex items-center justify-between mt-1 text-xs">
                  <span className="text-slate-500 font-medium">
                    Qty: {item.quantity}
                  </span>
                  <span className="font-bold text-slate-900">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Pricing Breakdown */}
          <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs text-slate-600 border border-slate-100">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Express Shipping</span>
              <span className="font-semibold text-slate-800">
                ${shipping.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax</span>
              <span className="font-semibold text-slate-800">
                ${tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-slate-900 text-sm">
              <span>Total Paid</span>
              <span className="text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Meta details */}
          <div className="text-[11px] text-slate-500 space-y-1 pt-1">
            <div className="flex items-center gap-1.5">
              <FiMapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">Shipping to: {shippingAddress}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiCreditCard className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>Paid via {paymentMethod}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
