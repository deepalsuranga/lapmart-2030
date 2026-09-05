"use client";

import React, { useState } from "react";
import { ACCESSORY_PRODUCTS, CATEGORY_TAXONOMY, WHATSAPP_NUMBER } from "@/data/lapmart-data";
import { useStore } from "@/context/StoreContext";
import {
  Gamepad2,
  Laptop,
  Zap,
  HardDrive,
  Wrench,
  Headphones,
  Briefcase,
  BatteryCharging,
  Cpu,
  CircuitBoard,
  ShoppingCart,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from "lucide-react";
import PriceTag from "@/components/PriceTag";
import confetti from "canvas-confetti";

export default function AccessoriesSection() {
  const { addToCart, formatLKR } = useStore();
  const [activeTaxonomy, setActiveTaxonomy] = useState(0);

  const iconMap: Record<string, any> = {
    Gamepad2,
    Laptop,
    Zap,
    HardDrive,
    Wrench,
    Headphones,
    Briefcase,
    BatteryCharging,
    Cpu,
    CircuitBoard
  };

  const handleAddToCart = (item: any, e: React.MouseEvent) => {
    addToCart(item);
    try {
      confetti({
        particleCount: 15,
        spread: 40,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: ["#ff6b00", "#10b981"]
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="accessories" className="py-16 px-4 sm:px-8 bg-slate-100/60 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Components & Upgrades 2030</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Laptop Accessories & Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              High-frequency DDR5 memory, PCIe Gen4/Gen5 SSDs, authentic GaN fast chargers, and gaming peripherals.
            </p>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello LapMart! I need help with laptop accessories, RAM upgrade, or charger.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto px-4 py-2.5 rounded-xl glass-panel bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2 transition-colors shadow-2xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Request Custom Component via WhatsApp</span>
          </a>
        </div>

        {/* Featured Accessories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ACCESSORY_PRODUCTS.map((item) => (
            <div
              key={item.id}
              className="glass-panel bg-white/95 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400/50 transition-all p-4 flex flex-col justify-between group"
            >
              {/* Top info */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {item.subCategory}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">SKU: {item.sku}</span>
                </div>

                {/* Photo */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-3 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.isSale && (
                    <span className="absolute top-2 left-2 w-7 h-7 rounded-full bg-amber-500 text-white font-black text-[9px] flex items-center justify-center shadow">
                      SALE
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 line-clamp-2 transition-colors">
                  {item.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 font-mono">
                  {item.specs}
                </p>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-3">
                <div>
                  {item.originalPrice && (
                    <div className="mb-0.5">
                      <PriceTag
                        amount={item.originalPrice}
                        className="text-[11px] text-slate-400 line-through"
                        decimalClassName="text-[0.7em] opacity-70 ml-0.5"
                      />
                    </div>
                  )}
                  <div>
                    <PriceTag
                      amount={item.price}
                      className="text-sm font-black text-amber-600 font-mono"
                      decimalClassName="text-[0.65em] font-bold opacity-75 ml-0.5"
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => handleAddToCart(item, e)}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-amber-400 group-hover:text-white" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 2030 MEGA CATEGORY TAXONOMY MATRIX (Replaces Screenshot 4/5 Footer Matrix) */}
        <div className="glass-panel bg-slate-950 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                Ecosystem Architecture
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Explore Full Tech & Component Taxonomy
              </h3>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello LapMart! I am looking for a specific laptop part / component.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all self-start md:self-auto"
            >
              <span>SHOP ALL ACCESSORIES &gt;&gt;</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 pt-8">
            {CATEGORY_TAXONOMY.map((cat, idx) => {
              const Icon = iconMap[cat.icon] || Cpu;
              return (
                <div key={cat.title} className="space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-white text-xs font-bold">{cat.title}</span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {cat.items.map((item) => (
                      <li key={item}>
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello LapMart! Inquiring about stock for: ${item}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-amber-400 hover:translate-x-1 inline-block transition-all text-[11px]"
                        >
                          – {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
