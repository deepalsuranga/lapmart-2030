"use client";

import React, { useState } from "react";
import { WHATSAPP_NUMBER, MASTER_HOTLINE } from "@/data/lapmart-data";
import { MessageSquare, X, Phone, ShieldCheck, Laptop, ChevronRight } from "lucide-react";

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsAppWithMessage = (topic: string) => {
    const text = `Hello LapMart Sri Lanka! I am contacting you regarding: ${topic}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Options Menu */}
      {isOpen && (
        <div className="mb-3 w-80 glass-panel bg-white/95 rounded-2xl border border-slate-200 shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">LapMart Quick Hub</h4>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Specialists Online (Avg reply: 2m)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 mt-3 text-xs">
            <button
              onClick={() => openWhatsAppWithMessage("Checking live laptop stock and best price")}
              className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium transition-colors"
            >
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-amber-500" />
                <span>Check Live Laptop Stock</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => openWhatsAppWithMessage("Inquiring about RAM/SSD upgrade or battery replacement")}
              className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-500" />
                <span>RAM / SSD / Battery Upgrade</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => openWhatsAppWithMessage("Requesting showroom address or delivery details")}
              className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700 font-medium transition-colors"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>Branch Location & Pickup</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Direct Call: {MASTER_HOTLINE}</span>
            <span>Sri Lanka GMT+5:30</span>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 via-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
        title="Chat with LapMart on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white"></span>
        <MessageSquare className="w-7 h-7 text-white fill-white/20 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}
