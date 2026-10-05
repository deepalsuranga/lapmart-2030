"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Zap, Tag, ArrowRight, ShoppingCart, Check, ShieldCheck } from "lucide-react";
import { soundFX } from "@/utils/sound";
import { useStore } from "@/context/StoreContext";
import { LAPTOP_PRODUCTS, ACCESSORY_PRODUCTS } from "@/data/lapmart-data";
import { LaptopProduct } from "@/types";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function NexoraMidSplit() {
  const { setQuickViewProduct, addToCart, formatLKR } = useStore();
  const [copiedCode, setCopiedCode] = useState(false);

  // Real-time ticking countdown
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 5, minutes: 42, seconds: 19 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const trendingItems = LAPTOP_PRODUCTS.slice(0, 3);
  const flashItem = ACCESSORY_PRODUCTS[0] || {
    id: "acc-flash-1",
    name: "Razer BlackShark V2 HyperSpeed Wireless Esports Headset",
    price: 34500,
    originalPrice: 42000,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80"
  };

  const handleCopyPromo = () => {
    soundFX.pop();
    navigator.clipboard.writeText("LAPMART2030");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section id="deals" className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* COLUMN 1: Trending Now (Rank 1, 2, 3) */}
        <ScrollReveal animation="fade-left" duration={650} className="lg:col-span-3 flex flex-col">
          <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] flex flex-col justify-between h-full transition-colors">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Trending in Showrooms
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Most requested this week</p>
              </div>
              <Link
                href="/shop"
                onClick={() => soundFX.click()}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                See All
              </Link>
            </div>

            <div className="space-y-3 flex-1 flex flex-col justify-around my-2">
              {trendingItems.map((item: LaptopProduct, idx: number) => (
                <div
                  key={item.id}
                  onClick={() => {
                    soundFX.pop();
                    setQuickViewProduct(item);
                  }}
                  className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all cursor-pointer group"
                >
                  {/* Rank Badge */}
                  <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-500 dark:text-slate-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 transition-colors">
                    {idx + 1}
                  </div>

                  {/* Clean Thumbnail */}
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 shrink-0 border border-slate-200/60 dark:border-slate-700 p-1 flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1 group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-black text-slate-900 dark:text-white font-mono">
                        {formatLKR(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[10px] text-slate-400 line-through font-mono hidden sm:inline">
                          {formatLKR(item.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>All models include 2-Yr LapMart warranty</span>
            </div>
          </div>
        </ScrollReveal>

        {/* COLUMN 2: Seasonal Tech Fest Promotional Campaign Banner */}
        <ScrollReveal animation="zoom-in" delay={120} duration={700} className="lg:col-span-6 flex flex-col">
          <div className="relative rounded-3xl overflow-hidden min-h-[340px] sm:min-h-[360px] shadow-xl group flex flex-col justify-center p-6 sm:p-10 bg-[#0A1128] text-white border border-slate-800 h-full">
            {/* Newly Generated High-Resolution Studio Retail Banner */}
            <Image
              src="/generated/tech-promo-banner.jpg"
              alt="LapMart Tech Festival & Mega Hardware Sale"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />

            {/* Left Gradient Scrim for crystal clear typography */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128]/95 via-[#0A1128]/80 to-transparent"></div>

            {/* Banner Typography & Real Promotion Content */}
            <div className="relative z-10 max-w-xs sm:max-w-sm">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider mb-3 backdrop-blur-md">
                <Zap className="w-3 h-3 fill-amber-300" />
                <span>Season Finale Hardware Event</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-2 tracking-tight">
                Major Tech Festival <br />
                <span className="text-amber-400">Up to 35% Off</span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm font-medium mb-5 leading-relaxed">
                Complimentary 6-Piece VIP Pack (LKR 35,000 value) included with every flagship gaming and business laptop purchase.
              </p>

              {/* Promo Code Pill */}
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={handleCopyPromo}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-mono font-bold text-white transition-all cursor-pointer backdrop-blur-md"
                  title="Click to copy promo code"
                >
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  <span>CODE: LAPMART2030</span>
                  {copiedCode && (
                    <span className="text-emerald-400 text-[10px] font-sans font-extrabold ml-1">COPIED!</span>
                  )}
                </button>
                <span className="text-[10px] text-slate-300">Extra 5% at checkout</span>
              </div>

              <Link
                href="/shop?sale=true"
                onClick={() => soundFX.pop()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Shop Festival Deals</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* COLUMN 3: Flash Deals with Live Countdown Timer */}
        <ScrollReveal animation="fade-right" delay={240} duration={650} className="lg:col-span-3 flex flex-col">
          <div className="bg-[#F8FAFF] dark:bg-slate-900/90 rounded-3xl p-5 border border-indigo-100/90 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] flex flex-col justify-between h-full transition-colors">
            
            {/* Header & Title */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
                  Showroom Flash Deal
                </span>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                  Live
                </span>
              </div>

              {/* Countdown Blocks */}
              <div className="flex items-center justify-center gap-1.5 my-2 py-1">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 mt-0.5">HRS</span>
                </div>
                <span className="text-slate-400 font-bold text-xs -mt-3">:</span>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 mt-0.5">MINS</span>
                </div>
                <span className="text-slate-400 font-bold text-xs -mt-3">:</span>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-rose-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <span className="text-[9px] font-bold text-rose-600 mt-0.5">SECS</span>
                </div>
              </div>

              {/* Product Visual */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 my-2 p-2 flex items-center justify-center">
                <Image
                  src={flashItem.image}
                  alt={flashItem.name}
                  fill
                  className="object-contain p-2 hover:scale-105 transition-transform"
                />
              </div>

              {/* Title & Ratings */}
              <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">
                {flashItem.name}
              </h4>

              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
                <span className="text-[10px] text-slate-400 ml-1 font-mono">4.9 (84)</span>
              </div>
            </div>

            {/* Price & Claim Button */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-black text-rose-600 dark:text-rose-400 font-mono block">
                    {formatLKR(flashItem.price)}
                  </span>
                  {flashItem.originalPrice && (
                    <span className="text-[10px] text-slate-400 line-through font-mono">
                      {formatLKR(flashItem.originalPrice)}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                  SAVE 20%
                </span>
              </div>

              <button
                onClick={() => {
                  addToCart(flashItem);
                  soundFX.success();
                }}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Claim Deal Now</span>
              </button>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
