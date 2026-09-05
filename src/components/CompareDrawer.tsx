"use client";

import React, { useRef, useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import {
  GitCompare,
  X,
  ChevronDown,
  ChevronUp,
  Cpu,
  Gauge,
  Zap,
  Battery,
  ShoppingCart,
  Trash2
} from "lucide-react";
import gsap from "gsap";
import PriceTag from "@/components/PriceTag";

export default function CompareDrawer() {
  const {
    compareList,
    removeFromCompare,
    clearCompare,
    isCompareOpen,
    setIsCompareOpen,
    addToCart,
    formatLKR
  } = useStore();

  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (drawerRef.current && isCompareOpen) {
      gsap.fromTo(
        drawerRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isCompareOpen]);

  if (compareList.length === 0) return null;

  return (
    <div
      ref={drawerRef}
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
        isCompareOpen ? "translate-y-0" : "translate-y-[calc(100%-48px)]"
      }`}
    >
      {/* Floating Header Toggle Strip */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="glass-panel bg-slate-900 text-white rounded-t-2xl px-5 py-3 flex items-center justify-between shadow-2xl border border-slate-700">
          
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-500 text-slate-950 flex items-center justify-center font-bold">
              <GitCompare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                2030 Hardware Duelist
              </span>
              <div className="text-sm font-black text-white">
                Comparing {compareList.length} of 3 Machines
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>

            <button
              onClick={() => setIsCompareOpen(!isCompareOpen)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>{isCompareOpen ? "Collapse" : "Expand Comparison"}</span>
              {isCompareOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expanded Comparison Matrix */}
        {isCompareOpen && (
          <div className="glass-panel bg-white/95 text-slate-900 border-x border-b border-slate-200 p-6 shadow-2xl overflow-x-auto max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[650px]">
              {compareList.map((laptop) => (
                <div
                  key={laptop.id}
                  className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-col justify-between space-y-4"
                >
                  {/* Card Top */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        {laptop.brand}
                      </span>
                      <button
                        onClick={() => removeFromCompare(laptop.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="h-32 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                      <img src={laptop.image} alt={laptop.name} className="w-full h-full object-cover" />
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                      {laptop.name}
                    </h4>

                    <div className="text-base font-black text-amber-600 font-mono">
                      <PriceTag amount={laptop.price} />
                    </div>
                  </div>

                  {/* Telemetry Metric Bars */}
                  <div className="space-y-2 text-[11px] font-semibold border-t border-slate-200 pt-3">
                    <div>
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span className="flex items-center gap-1">
                          <Gauge className="w-3 h-3 text-cyan-500" /> Gaming FPS Index
                        </span>
                        <span className="font-mono font-bold">{laptop.scores.gaming}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${laptop.scores.gaming}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-500" /> AI / NPU Compute
                        </span>
                        <span className="font-mono font-bold">{laptop.scores.aiCompute}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${laptop.scores.aiCompute}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span className="flex items-center gap-1">
                          <Battery className="w-3 h-3 text-emerald-500" /> Battery Score
                        </span>
                        <span className="font-mono font-bold">{laptop.scores.batteryLife}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${laptop.scores.batteryLife}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Specs List */}
                  <div className="text-[11px] space-y-1 text-slate-600 border-t border-slate-200 pt-3 font-mono">
                    <div><strong>CPU:</strong> {laptop.processor}</div>
                    <div><strong>RAM:</strong> {laptop.ram}</div>
                    <div><strong>Storage:</strong> {laptop.storage}</div>
                    <div><strong>Display:</strong> {laptop.display}</div>
                    <div><strong>Warranty:</strong> {laptop.specs.warranty}</div>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => addToCart(laptop)}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-all"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add Machine to Cart</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
