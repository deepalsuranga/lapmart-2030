"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { LAPMART_BRANCHES, MASTER_HOTLINE, WHATSAPP_NUMBER } from "@/data/lapmart-data";
import {
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Zap,
  RotateCcw,
  Sliders,
  HardDrive,
  Gauge,
  PhoneCall,
  MessageSquare,
  Sparkles,
  Search
} from "lucide-react";

export default function DiagnosticLabSection() {
  const [activeCheckCategory, setActiveCheckCategory] = useState<number>(0);
  const [testedSerial, setTestedSerial] = useState("LM-2030-9482-A");

  const categories = [
    {
      name: "Motherboard & VRMs",
      icon: Cpu,
      tests: [
        { name: "Power Phase Voltage Ripple", status: "PASSED", metric: "< 12mV RMS" },
        { name: "ChIPSET Thermal Dissipation", status: "PASSED", metric: "68°C Stress Peak" },
        { name: "MOSFET Efficiency Rating", status: "PASSED", metric: "96.4% Tier 1" }
      ]
    },
    {
      name: "Lithium-Ion Battery Bank",
      icon: Zap,
      tests: [
        { name: "Design vs Actual Cell Capacity", status: "PASSED", metric: "88% - 100% Health" },
        { name: "Internal Impedance Uniformity", status: "PASSED", metric: "< 25 mΩ / cell" },
        { name: "Fast Charge Thermal Envelope", status: "PASSED", metric: "Normal (38°C)" }
      ]
    },
    {
      name: "High-Speed NVMe & RAM",
      icon: HardDrive,
      tests: [
        { name: "PCIe Gen4 Sequential Read/Write", status: "PASSED", metric: "4850 MB/s Verified" },
        { name: "DDR4 / DDR5 MemTest86 4-Pass", status: "PASSED", metric: "0 Errors Detected" },
        { name: "S.M.A.R.T. Spare Blocks & Life", status: "PASSED", metric: "100% Healthy" }
      ]
    },
    {
      name: "IPS Display Matrix & Hinge",
      icon: Gauge,
      tests: [
        { name: "Color Accuracy & sRGB Coverage", status: "PASSED", metric: "100% sRGB Calibrated" },
        { name: "Zero Dead Pixel Laser Scan", status: "PASSED", metric: "Certified Clear" },
        { name: "Torque Resistance (Hinge Cycles)", status: "PASSED", metric: "20,000 Cycle Rated" }
      ]
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-8 bg-slate-900 text-white relative overflow-hidden">
      {/* Laser accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sri Lanka&apos;s Strictest Pre-Sale Lab</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              LapMart 45-Point Hardware Certification
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Every single used laptop or open-box workstation imported by LapMart undergoes exhaustive hardware bench testing before reaching showroom shelves.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hello LapMart! I would like to request the 45-point diagnostic sheet for a laptop before buying."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-600/20 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Request Diagnostic Sheet</span>
            </a>
          </div>
        </div>

        {/* Live Interactive Benchmark Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Category Selector Tabs (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
              Diagnostic Test Workstreams:
            </span>
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              const isSelected = activeCheckCategory === idx;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCheckCategory(idx)}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-800 border-cyan-500 shadow-md text-white"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-cyan-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold">{cat.name}</span>
                  </div>
                  <CheckCircle2 className={`w-4 h-4 ${isSelected ? "text-cyan-400" : "text-slate-600"}`} />
                </button>
              );
            })}
          </div>

          {/* Real-Time Telemetry Terminal Display (8 cols) */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 shadow-inner relative overflow-hidden">
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-slate-300 font-bold">BENCHMARK LAB TELEMETRY</span>
              </div>
              <span className="text-slate-500">
                SERIAL: <span className="text-amber-400 font-bold">{testedSerial}</span>
              </span>
            </div>

            {/* Test Results Table */}
            <div className="space-y-3">
              {categories[activeCheckCategory].tests.map((test) => (
                <div
                  key={test.name}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-slate-200">{test.name}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-slate-400">{test.metric}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/30 text-[10px]">
                      {test.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Verification Guarantee Stamp */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Includes physical signed LapMart diagnostic certificate with barcode verification.</span>
              </div>
              <span className="text-emerald-400 font-mono font-bold text-[11px]">
                100% Pass Required to Stock
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
