"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { LAPTOP_PRODUCTS, ACCESSORY_PRODUCTS, LAPMART_BRANCHES } from "@/data/lapmart-data";
import { getLaptopSlug } from "@/utils/slug";
import {
  Search,
  Laptop,
  Gamepad2,
  MapPin,
  X,
  ArrowRight,
  Sparkles,
  Command,
  Zap,
  CornerDownLeft
} from "lucide-react";
import { soundFX } from "@/utils/sound";
import PriceTag from "@/components/PriceTag";

export default function CommandPalette() {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setQuickViewProduct,
    setSelectedBranch,
    setFilters,
    setActiveBrandTab,
    formatLKR
  } = useStore();

  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredLaptops = LAPTOP_PRODUCTS.filter((p) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.processor.toLowerCase().includes(q)
    );
  }).slice(0, 4);

  const filteredAccessories = ACCESSORY_PRODUCTS.filter((a) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.sku.toLowerCase().includes(q) ||
      a.subCategory.toLowerCase().includes(q)
    );
  }).slice(0, 3);

  const filteredBranches = LAPMART_BRANCHES.filter((b) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return b.city.toLowerCase().includes(q) || b.address.toLowerCase().includes(q);
  });

  const popularSearches = [
    { label: "Acer Nitro 16", type: "laptop", action: () => setQuery("Nitro") },
    { label: "ThinkPad T490", type: "laptop", action: () => setQuery("T490") },
    { label: "RTX 4060 Rigs", type: "spec", action: () => setQuery("RTX 4060") },
    { label: "DDR5 16GB RAM", type: "accessory", action: () => setQuery("DDR5") },
    { label: "Bambalapitiya Showroom", type: "branch", action: () => setQuery("Bambalapitiya") }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-2xl glass-panel bg-white/95 rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-amber-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search laptops, SKUs, RAM, branch hotlines, or specs..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200 rounded">
              ESC
            </kbd>
            <button
              onClick={() => setIsCommandPaletteOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          
          {/* Quick recommendations if empty */}
          {!query.trim() && (
            <div className="space-y-3 py-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 block">
                Trending Searches & Shortcuts
              </span>
              <div className="flex flex-wrap gap-2 px-2">
                {popularSearches.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      soundFX.click();
                      item.action();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-500 hover:text-white text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500 group-hover:text-white" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Quick Jump actions */}
              <div className="pt-3 border-t border-slate-100 space-y-1">
                <button
                  onClick={() => {
                    soundFX.switchTab();
                    setFilters((prev) => ({ ...prev, condition: "Brand New" }));
                    setActiveBrandTab("BRAND NEW");
                    setIsCommandPaletteOpen(false);
                    document.getElementById("product-catalog")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      ✦
                    </div>
                    <span>Jump to Factory-Sealed Brand New Laptops</span>
                  </div>
                  <CornerDownLeft className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    soundFX.switchTab();
                    setFilters((prev) => ({ ...prev, condition: "Used" }));
                    setActiveBrandTab("USED");
                    setIsCommandPaletteOpen(false);
                    document.getElementById("product-catalog")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      ↺
                    </div>
                    <span>Jump to Certified Used Laptops (Grade A+)</span>
                  </div>
                  <CornerDownLeft className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    soundFX.switchTab();
                    setIsCommandPaletteOpen(false);
                    document.getElementById("accessories")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                      ⚡
                    </div>
                    <span>Jump to RAM, SSDs, & GaN Chargers</span>
                  </div>
                  <CornerDownLeft className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          )}

          {/* Laptops Search Matches */}
          {filteredLaptops.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 px-2 block">
                Matching Laptops ({filteredLaptops.length})
              </span>
              {filteredLaptops.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    soundFX.click();
                    setIsCommandPaletteOpen(false);
                    router.push(`/product/${getLaptopSlug(p)}`);
                  }}
                  className="p-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between gap-3 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-amber-600 truncate">
                        {p.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">
                        SKU: {p.sku} • {p.condition} • {p.ram}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold font-mono text-amber-600">
                      <PriceTag amount={p.price} />
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600">In Stock</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Accessories Matches */}
          {filteredAccessories.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 px-2 block">
                Matching Accessories ({filteredAccessories.length})
              </span>
              {filteredAccessories.map((a) => (
                <div
                  key={a.id}
                  onClick={() => {
                    soundFX.switchTab();
                    setIsCommandPaletteOpen(false);
                    document.getElementById("accessories")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="p-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between gap-3 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                      <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-cyan-600 truncate">
                        {a.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {a.subCategory} • SKU: {a.sku}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs font-bold font-mono text-slate-900 shrink-0">
                    <PriceTag amount={a.price} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Branches Matches */}
          {filteredBranches.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 px-2 block">
                Matching Branches & Hotlines
              </span>
              {filteredBranches.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    soundFX.click();
                    setSelectedBranch(b.id);
                    setIsCommandPaletteOpen(false);
                    document.getElementById("branches")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="p-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between gap-3 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        LapMart {b.city} {b.isFlagship && "(Flagship)"}
                      </div>
                      <div className="text-[10px] text-slate-500">{b.address}</div>
                    </div>
                  </div>

                  <a
                    href={`tel:${b.hotline}`}
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-mono font-bold"
                  >
                    {b.displayPhone}
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {query.trim() &&
            filteredLaptops.length === 0 &&
            filteredAccessories.length === 0 &&
            filteredBranches.length === 0 && (
              <div className="py-8 text-center text-xs text-slate-500">
                No matching hardware found for "{query}". Press ESC or search another spec like "RTX" or "RAM".
              </div>
            )}
        </div>

        {/* Footer info strip */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>Navigate with mouse or keyboard</span>
          <span>LapMart 2030 Telemetry</span>
        </div>
      </div>
    </div>
  );
}
