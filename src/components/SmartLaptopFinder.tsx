"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  Laptop,
  Filter,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Gamepad2,
  Box,
  Code2,
  Briefcase
} from "lucide-react";
import { soundFX } from "@/utils/sound";
import confetti from "canvas-confetti";

export default function SmartLaptopFinder() {
  const { filters, setFilters, formatLKR } = useStore();

  const [tempBrand, setTempBrand] = useState(filters.brand);
  const [tempCondition, setTempCondition] = useState(filters.condition);
  const [tempProcessor, setTempProcessor] = useState(filters.processor);
  const [tempMaxPrice, setTempMaxPrice] = useState(filters.priceRange[1]);
  const [activePersona, setActivePersona] = useState<string>(filters.workflowPersona || "ALL");

  const brandOptions = ["ALL", "Acer", "HP", "Dell", "Asus", "MSI", "Lenovo", "Apple"];
  const conditionOptions = ["ALL", "Brand New", "Used"];
  const processorOptions = [
    "ALL",
    "Intel Core Ultra / i9",
    "Intel Core i7",
    "Intel Core i5",
    "AMD Ryzen 7 / 9",
    "Apple M-Series"
  ];

  const personas = [
    {
      id: "GAMING",
      label: "Gaming & Esports",
      icon: Gamepad2,
      tag: "RTX & 144Hz+",
      apply: () => {
        setTempBrand("ALL");
        setTempCondition("ALL");
        setTempProcessor("AMD Ryzen 7 / 9");
        setTempMaxPrice(600000);
        setActivePersona("GAMING");
        setFilters((prev) => ({
          ...prev,
          category: "Gaming",
          brand: "ALL",
          condition: "ALL",
          processor: "ALL",
          workflowPersona: "GAMING"
        }));
      }
    },
    {
      id: "3D_RENDER",
      label: "3D, Blender & CAD",
      icon: Box,
      tag: "Multi-Core & 32GB",
      apply: () => {
        setTempBrand("ALL");
        setTempCondition("ALL");
        setTempProcessor("Intel Core i7");
        setTempMaxPrice(550000);
        setActivePersona("3D_RENDER");
        setFilters((prev) => ({
          ...prev,
          category: "Workstation",
          brand: "ALL",
          condition: "ALL",
          processor: "Intel Core i7",
          workflowPersona: "3D_RENDER"
        }));
      }
    },
    {
      id: "CODING_UNI",
      label: "Coding & University",
      icon: Code2,
      tag: "Battery & Value",
      apply: () => {
        setTempBrand("Lenovo");
        setTempCondition("Used");
        setTempProcessor("Intel Core i5");
        setTempMaxPrice(200000);
        setActivePersona("CODING_UNI");
        setFilters((prev) => ({
          ...prev,
          category: "ALL",
          brand: "Lenovo",
          condition: "Used",
          processor: "Intel Core i5",
          workflowPersona: "CODING_UNI"
        }));
      }
    },
    {
      id: "BUSINESS",
      label: "Executive Ultrabook",
      icon: Briefcase,
      tag: "OLED & Lightweight",
      apply: () => {
        setTempBrand("HP");
        setTempCondition("Brand New");
        setTempProcessor("ALL");
        setTempMaxPrice(500000);
        setActivePersona("BUSINESS");
        setFilters((prev) => ({
          ...prev,
          category: "Ultrabook",
          brand: "HP",
          condition: "Brand New",
          processor: "ALL",
          workflowPersona: "BUSINESS"
        }));
      }
    }
  ];

  const handleApplyFilter = () => {
    soundFX.click();
    setFilters((prev) => ({
      ...prev,
      brand: tempBrand,
      condition: tempCondition,
      processor: tempProcessor,
      priceRange: [50000, tempMaxPrice],
      workflowPersona: activePersona as any
    }));

    // Trigger subtle celebratory confetti
    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#ff6b00", "#06b6d4", "#f59e0b"]
      });
    } catch {
      // ignore
    }

    const catalog = document.getElementById("product-catalog");
    if (catalog) {
      catalog.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReset = () => {
    soundFX.click();
    setTempBrand("ALL");
    setTempCondition("ALL");
    setTempProcessor("ALL");
    setTempMaxPrice(1000000);
    setActivePersona("ALL");
    setFilters((prev) => ({
      ...prev,
      brand: "ALL",
      condition: "ALL",
      processor: "ALL",
      category: "ALL",
      workflowPersona: "ALL",
      priceRange: [50000, 1000000]
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto glass-panel bg-white/80 backdrop-blur-2xl rounded-3xl border border-slate-200/80 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,255,255,0.7)_inset] p-5 sm:p-7 md:p-8 relative overflow-hidden">
      {/* Ambient background refraction orbs inside panel */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-gradient-to-tl from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Futuristic Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 shrink-0">
            <Laptop className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Choose Your Laptop <span className="text-amber-500">2030</span>
              </h2>
              <span className="hidden sm:inline text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-bold border border-cyan-200">
                Neural Matcher
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Explore custom laptop specs tailored to your performance workflow. Instant stock check across 7 branches.
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* 2030 NEURAL WORKFLOW PERSONA CARDS */}
      <div className="relative z-10 pt-5 pb-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
          1-Click Mission Tuning:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {personas.map((p) => {
            const Icon = p.icon;
            const isActive = activePersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  soundFX.switchTab();
                  p.apply();
                }}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/25 scale-[1.02]"
                    : "bg-white/70 hover:bg-white text-slate-800 border-slate-200/90 hover:border-amber-400 shadow-2xs backdrop-blur-md"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-amber-500"}`} />
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${isActive ? "bg-amber-700 text-amber-100" : "bg-slate-200/70 text-slate-600"}`}>
                    {p.tag}
                  </span>
                </div>
                <div className="text-xs font-bold mt-2 truncate">{p.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Controls Matrix */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-4 pt-4 border-t border-slate-200/60">
        
        {/* Brand Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Brand
          </label>
          <select
            value={tempBrand}
            onChange={(e) => setTempBrand(e.target.value)}
            className="w-full bg-white/75 backdrop-blur-md border border-slate-200 hover:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-2xs transition-all cursor-pointer"
          >
            {brandOptions.map((brand) => (
              <option key={brand} value={brand}>
                {brand === "ALL" ? "All Top Brands" : brand}
              </option>
            ))}
          </select>
        </div>

        {/* Condition Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
            Condition
          </label>
          <select
            value={tempCondition}
            onChange={(e) => setTempCondition(e.target.value)}
            className="w-full bg-white/75 backdrop-blur-md border border-slate-200 hover:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-2xs transition-all cursor-pointer"
          >
            {conditionOptions.map((cond) => (
              <option key={cond} value={cond}>
                {cond === "ALL" ? "Any Condition" : cond === "Used" ? "Certified Used (Grade A+)" : "Brand New Factory Sealed"}
              </option>
            ))}
          </select>
        </div>

        {/* Processor Tier */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Processor
          </label>
          <select
            value={tempProcessor}
            onChange={(e) => setTempProcessor(e.target.value)}
            className="w-full bg-white/75 backdrop-blur-md border border-slate-200 hover:border-emerald-400 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-2xs transition-all cursor-pointer"
          >
            {processorOptions.map((proc) => (
              <option key={proc} value={proc}>
                {proc === "ALL" ? "All Processors" : proc}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Budget Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              Max Budget
            </label>
            <span className="font-mono font-bold text-amber-600">
              {formatLKR(tempMaxPrice).replace(".00", "")}
            </span>
          </div>
          <div className="pt-2">
            <input
              type="range"
              min="90000"
              max="800000"
              step="10000"
              value={tempMaxPrice}
              onChange={(e) => setTempMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200/80 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="relative z-10 mt-6 pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Showing verified inventory with immediate pickup across all 7 branches.</span>
        </div>

        <button
          onClick={handleApplyFilter}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all transform active:scale-98 cursor-pointer"
        >
          <Filter className="w-4 h-4" />
          <span>FILTER LAPTOPS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
