"use client";

import React, { useState } from "react";
import { LAPMART_BRANCHES, MASTER_HOTLINE, WHATSAPP_NUMBER } from "@/data/lapmart-data";
import { useStore } from "@/context/StoreContext";
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  MessageSquare
} from "lucide-react";

export default function BranchLocator() {
  const { selectedBranch, setSelectedBranch } = useStore();
  const [activeTab, setActiveTab] = useState(selectedBranch);

  const activeBranchData =
    LAPMART_BRANCHES.find((b) => b.id === activeTab) || LAPMART_BRANCHES[0];

  return (
    <section id="branches" className="py-16 px-4 sm:px-8 relative bg-white">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>7 ISLANDWIDE DIRECT DISTRIBUTION HUBS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Visit Our Showrooms Across Sri Lanka
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Every branch features live demo stations, warranty claim desk, and on-site certified technicians for instant RAM/SSD upgrades.
          </p>
        </div>

        {/* Branch Selector Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {LAPMART_BRANCHES.map((b) => {
            const isSelected = activeTab === b.id;
            return (
              <button
                key={b.id}
                onClick={() => {
                  setActiveTab(b.id);
                  setSelectedBranch(b.id);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-amber-400" : "text-slate-400"}`} />
                <span>{b.city}</span>
                {b.isFlagship && (
                  <span className="text-[9px] px-1 py-0.2 bg-amber-500 text-slate-950 font-bold rounded">
                    FLAGSHIP
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Branch Showcase Card */}
        <div className="glass-panel bg-gradient-to-br from-white via-slate-50 to-amber-50/30 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-mono text-xs font-bold">
                {activeBranchData.city.toUpperCase()} HUB
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {activeBranchData.status}
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                LapMart {activeBranchData.city}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{activeBranchData.address}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  Direct Hotline
                </div>
                <a
                  href={`tel:${activeBranchData.hotline}`}
                  className="text-base font-black text-slate-900 hover:text-amber-600 font-mono mt-1 block transition-colors"
                >
                  {activeBranchData.displayPhone}
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase">
                  <Clock className="w-3.5 h-3.5 text-cyan-500" />
                  Showroom Hours
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1">
                  {activeBranchData.hours}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`tel:${activeBranchData.hotline}`}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-amber-500/25 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Branch Showroom</span>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello LapMart ${activeBranchData.city}! I would like to check stock at your branch.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp This Branch</span>
              </a>
            </div>
          </div>

          {/* Interactive Visual Map Representation (5 Cols) */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-slate-950 p-6 text-white space-y-4 border border-slate-800 shadow-inner">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
              <span className="font-mono text-cyan-400">SRI LANKA NETWORK HUD</span>
              <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                GPS: {activeBranchData.coordinates?.lat}, {activeBranchData.coordinates?.lng}
              </span>
            </div>

            {/* Stylized Node Map representation */}
            <div className="py-6 flex flex-col items-center justify-center relative">
              <div className="w-20 h-20 rounded-full border border-amber-500/30 flex items-center justify-center animate-ping absolute" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/40 relative z-10">
                <Navigation className="w-8 h-8" />
              </div>
              <div className="mt-4 text-center">
                <div className="text-sm font-black text-white">{activeBranchData.city} Center</div>
                <div className="text-[11px] text-slate-400">Direct Importer Warehouse & Service Hub</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
              <span>Main Hotline Sync:</span>
              <span className="font-mono font-bold text-amber-400">{MASTER_HOTLINE}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
