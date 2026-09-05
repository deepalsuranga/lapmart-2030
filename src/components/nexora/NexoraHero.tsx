"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  ArrowRight,
  Sparkles,
  Zap
} from "lucide-react";
import { soundFX } from "@/utils/sound";
import { useStore } from "@/context/StoreContext";
import { LAPTOP_PRODUCTS } from "@/data/lapmart-data";
import { LaptopProduct } from "@/types";

export default function NexoraHero() {
  const { setFilters, setQuickViewProduct } = useStore();
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const trustBadges = [
    {
      icon: ShieldCheck,
      title: "Secure Shopping",
      sub: "45-Pt Tested"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      sub: "Islandwide 24h"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      sub: "7-Day Exchange"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      sub: "Hotline & Chat"
    }
  ];

  const handleInspect = (category: string) => {
    soundFX.cardHover();
    const found = LAPTOP_PRODUCTS.find(
      (l: LaptopProduct) => l.category.toLowerCase() === category.toLowerCase()
    ) || LAPTOP_PRODUCTS[0];
    setQuickViewProduct(found);
  };

  return (
    <section className="relative overflow-hidden bg-[#060814] text-white pt-8 sm:pt-14 pb-24 sm:pb-32 min-h-[640px] lg:min-h-[740px] flex items-center">
      
      {/* 1. FULL-BLEED 16:9 PANORAMIC 3D SHOWROOM BACKGROUND */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/generated/hero-portal-wide.jpg"
          alt="LapMart 2030 Holographic Showroom"
          fill
          priority
          quality={95}
          className="object-cover object-[75%_center] lg:object-right-top transition-transform duration-1000 scale-[1.02]"
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060814] via-[#060814]/95 md:via-[#060814]/80 lg:via-[#060814]/45 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#060814] via-transparent to-[#060814]/40"></div>
      </div>

      {/* 2. AMBIENT NEON GLOWS */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none -z-0 animate-pulse"></div>
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-0"></div>

      {/* 3. HERO CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Hero Copy & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Super Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-rose-300 backdrop-blur-md mb-6 w-fit shadow-lg shadow-black/40">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span className="font-semibold tracking-wide">Next-Gen Laptop & PC Showroom</span>
            </div>

            {/* Giant Futuristic Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] mb-6 drop-shadow-2xl">
              Your World <br />
              Of Tech <br />
              <span className="bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_6px_28px_rgba(244,63,94,0.45)]">
                Starts Here.
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-slate-200 text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-8 drop-shadow-md">
              Explore endless choices, discover high-performance verified hardware, and shop Sri Lanka&apos;s leading tech ecosystem in a whole new way.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 sm:mb-12">
              <Link
                href="/shop"
                onClick={() => soundFX.pop()}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-rose-500/40 hover:shadow-rose-500/60 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <button
                onClick={() => {
                  soundFX.click();
                  const el = document.querySelector("#collections");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-slate-100 font-semibold text-sm backdrop-blur-md shadow-md transition-all duration-200 cursor-pointer"
              >
                Explore Collections
              </button>
            </div>

            {/* 4 Micro-Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 max-w-xl">
              {trustBadges.map((badge, idx) => {
                const IconComponent = badge.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-full border border-white/25 bg-white/10 backdrop-blur-md flex items-center justify-center text-slate-200 group-hover:text-rose-400 group-hover:border-rose-400/60 group-hover:bg-rose-500/20 transition-all shrink-0 shadow-sm">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">
                        {badge.title}
                      </div>
                      <div className="text-[10px] text-slate-300 leading-tight">
                        {badge.sub}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* RIGHT COLUMN: 3D GAMING LAPTOP PNG SHOWCASE & INTERACTIVE HUD */}
          <div className="lg:col-span-6 relative min-h-[420px] sm:min-h-[500px] flex items-center justify-center">
            
            {/* Centerpiece: 3D High-End Gaming Laptop */}
            <div
              onClick={() => handleInspect("Gaming")}
              className="relative w-full max-w-[440px] sm:max-w-[490px] aspect-square flex items-center justify-center cursor-pointer group select-none z-10"
            >
              {/* Neon Cyber Radial Glow Under Laptop */}
              <div className="absolute inset-x-8 bottom-12 h-28 bg-cyan-500/25 rounded-full blur-3xl group-hover:bg-cyan-400/40 transition-all duration-700 pointer-events-none"></div>
              <div className="absolute inset-x-14 bottom-14 h-20 bg-rose-500/20 rounded-full blur-2xl group-hover:bg-rose-400/35 transition-all duration-700 pointer-events-none"></div>

              {/* 3D Floating Gaming Laptop PNG Asset */}
              <div className="relative w-full h-full transform group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                <Image
                  src="/generated/hero-gaming-laptop.png"
                  alt="LapMart 2030 Flagship 3D Gaming Laptop"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_20px_35px_rgba(6,182,212,0.45)]"
                />
              </div>

              {/* Concentric Neon Rings Base */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 border-2 border-cyan-400/40 rounded-full shadow-[0_0_25px_rgba(6,182,212,0.6)] animate-pulse pointer-events-none"></div>
            </div>

            {/* Chip 1: Titan GX • RTX 4090 (Top Left) */}
            <div
              onClick={() => handleInspect("Gaming")}
              onMouseEnter={() => {
                soundFX.tick();
                setActiveChip("gaming");
              }}
              onMouseLeave={() => setActiveChip(null)}
              className={`absolute top-2 sm:top-6 left-2 sm:left-4 backdrop-blur-xl bg-slate-900/85 border border-cyan-400/50 p-2.5 sm:p-3 rounded-2xl shadow-2xl shadow-cyan-500/20 flex items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-cyan-300 z-20 ${
                activeChip === "gaming" ? "scale-105 border-cyan-300 ring-2 ring-cyan-400/40" : ""
              }`}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 text-base shadow-inner shrink-0">
                ⚡
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono text-cyan-400 font-bold tracking-wider">
                  Titan GX • RTX 4090
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">Esports Battlestation</div>
              </div>
            </div>

            {/* Chip 2: 240Hz OLED Display (Top Right) */}
            <div
              onClick={() => handleInspect("Creator")}
              onMouseEnter={() => {
                soundFX.tick();
                setActiveChip("creator");
              }}
              onMouseLeave={() => setActiveChip(null)}
              className={`absolute top-10 sm:top-14 right-2 sm:right-4 backdrop-blur-xl bg-slate-900/85 border border-purple-400/50 p-2.5 sm:p-3 rounded-2xl shadow-2xl shadow-purple-500/20 flex items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-purple-300 z-20 ${
                activeChip === "creator" ? "scale-105 border-purple-300 ring-2 ring-purple-400/40" : ""
              }`}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 text-base shadow-inner shrink-0">
                🎨
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono text-purple-400 font-bold tracking-wider">
                  240Hz 4K OLED
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">True 10-Bit Color</div>
              </div>
            </div>

            {/* Chip 3: Liquid Metal Cooling (Bottom Left) */}
            <div
              onClick={() => handleInspect("Business")}
              onMouseEnter={() => {
                soundFX.tick();
                setActiveChip("cooling");
              }}
              onMouseLeave={() => setActiveChip(null)}
              className={`absolute bottom-6 sm:bottom-10 left-2 sm:left-8 backdrop-blur-xl bg-slate-900/90 border border-rose-400/50 p-2.5 sm:p-3 rounded-2xl shadow-2xl shadow-rose-500/20 flex items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-rose-300 z-20 ${
                activeChip === "cooling" ? "scale-105 border-rose-300 ring-2 ring-rose-400/40" : ""
              }`}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 text-base shadow-inner shrink-0">
                ❄️
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono text-rose-400 font-bold tracking-wider">
                  Liquid Metal V2
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">Sub-70°C Under Load</div>
              </div>
            </div>

            {/* Floating Reaction Badges (Right Side) */}
            <div className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 flex flex-col gap-3 z-20">
              <button
                onClick={() => soundFX.pop()}
                className="backdrop-blur-xl bg-slate-900/80 border border-white/20 p-2.5 rounded-full text-xs shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Customer Loves"
              >
                <span>❤️</span>
                <span className="text-[11px] font-bold text-white pr-1">3.8k</span>
              </button>
              <button
                onClick={() => soundFX.cart()}
                className="backdrop-blur-xl bg-slate-900/80 border border-white/20 p-2.5 rounded-full text-xs shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                title="Instant Cart"
              >
                <span>🛒</span>
              </button>
            </div>

            {/* Interactive Badge Indicator */}
            <div className="absolute bottom-1 right-2 sm:right-4 text-[10px] font-mono text-cyan-300 bg-slate-950/85 px-3 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md shadow-lg flex items-center gap-2 z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Click Laptop to Inspect Full Specs</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
