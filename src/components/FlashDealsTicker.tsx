"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LAPTOP_PRODUCTS, WHATSAPP_NUMBER } from "@/data/lapmart-data";
import { useStore } from "@/context/StoreContext";
import PriceTag from "@/components/PriceTag";
import { soundFX } from "@/utils/sound";
import {
  Flame,
  Clock,
  Zap,
  ArrowRight,
  ShieldCheck,
  Truck,
  Eye,
  ShoppingCart,
  Sparkles,
  Percent
} from "lucide-react";
import confetti from "canvas-confetti";

export default function FlashDealsTicker() {
  const { addToCart, setQuickViewProduct } = useStore();
  
  // Deals selection: laptops on sale or marked hot
  const deals = LAPTOP_PRODUCTS.filter((p) => p.isSale || p.isHot).slice(0, 4);

  // Synchronized countdown timer (2030 live countdown reset)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickAdd = (product: any, e: React.MouseEvent) => {
    soundFX.click();
    addToCart(product);
    try {
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: ["#ff6b00", "#10b981"]
      });
    } catch {}
  };

  return (
    <section className="py-10 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Banner Header: Cyber Flash Countdown */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white border border-amber-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle Cyber Grid Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>2030 Direct Import Drops</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Flash Hardware Vault</span>
              <span className="text-amber-400 text-sm font-mono font-normal">| Verified Stock</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Limited-quantity warehouse allocations with factory discounts. Same-day physical pickup across all 7 showrooms or free islandwide insured dispatch.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3 relative z-10 self-start md:self-auto">
            <div className="flex items-center gap-1 text-slate-400 text-xs font-mono mr-1">
              <Clock className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>ENDS IN:</span>
            </div>
            
            <div className="flex items-center gap-1.5 font-mono">
              <div className="flex flex-col items-center bg-slate-900/90 border border-amber-500/30 px-3 py-2 rounded-xl min-w-[50px] shadow-inner">
                <span className="text-lg font-black text-white">{String(timeLeft.hours).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">HRS</span>
              </div>
              <span className="text-amber-400 font-bold text-lg">:</span>
              <div className="flex flex-col items-center bg-slate-900/90 border border-amber-500/30 px-3 py-2 rounded-xl min-w-[50px] shadow-inner">
                <span className="text-lg font-black text-amber-400">{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">MIN</span>
              </div>
              <span className="text-amber-400 font-bold text-lg">:</span>
              <div className="flex flex-col items-center bg-slate-900/90 border border-amber-500/30 px-3 py-2 rounded-xl min-w-[50px] shadow-inner">
                <span className="text-lg font-black text-rose-400">{String(timeLeft.seconds).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">SEC</span>
              </div>
            </div>

            <Link
              href="/shop"
              className="ml-2 hidden lg:flex items-center gap-1 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/30"
            >
              <span>View All Drops</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {deals.map((laptop) => {
            const savings = laptop.originalPrice ? laptop.originalPrice - laptop.price : 0;
            const discountPct = laptop.originalPrice
              ? Math.round(((laptop.originalPrice - laptop.price) / laptop.originalPrice) * 100)
              : 0;

            return (
              <div
                key={laptop.id}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Top Badges */}
                <div>
                  <div className="relative h-44 rounded-xl overflow-hidden bg-slate-950 mb-3.5 flex items-center justify-center">
                    <img
                      src={laptop.image}
                      alt={laptop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badge: Discount Pill */}
                    {discountPct > 0 && (
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-rose-500 text-white font-mono font-black text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md">
                        <Percent className="w-3 h-3" />
                        <span>Save {discountPct}%</span>
                      </div>
                    )}

                    {/* Stock Alert */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-white border border-white/10">
                      <span className="text-emerald-400">⚡ Verified In-Stock</span>
                      <span className="text-amber-400">{laptop.stockCount} Units Left</span>
                    </div>
                  </div>

                  {/* Brand & Condition */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/70">
                      {laptop.brand} • {laptop.condition}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      SKU: {laptop.sku}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug mb-2">
                    {laptop.name}
                  </h3>

                  {/* Quick specs pill */}
                  <div className="text-[11px] font-mono text-slate-500 space-y-0.5 mb-3 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <div className="truncate">⚡ {laptop.processor}</div>
                    <div className="truncate">🧠 {laptop.ram} • 💽 {laptop.storage}</div>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      {laptop.originalPrice && (
                        <div className="text-[10px] text-slate-400 line-through font-mono">
                          <PriceTag amount={laptop.originalPrice} />
                        </div>
                      )}
                      <div className="text-base font-black text-amber-600 font-mono">
                        <PriceTag amount={laptop.price} />
                      </div>
                    </div>

                    {savings > 0 && (
                      <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        Save Rs. {(savings / 1000).toFixed(0)}K
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        soundFX.click();
                        setQuickViewProduct(laptop);
                      }}
                      className="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>360 View</span>
                    </button>

                    <button
                      onClick={(e) => handleQuickAdd(laptop, e)}
                      className="py-2 rounded-xl bg-slate-900 hover:bg-amber-600 text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer active:scale-95"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-amber-400" />
                      <span>Claim Deal</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
