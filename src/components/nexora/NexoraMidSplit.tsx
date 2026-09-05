"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Zap } from "lucide-react";
import { soundFX } from "@/utils/sound";
import { useStore } from "@/context/StoreContext";
import { LAPTOP_PRODUCTS, ACCESSORY_PRODUCTS } from "@/data/lapmart-data";
import { LaptopProduct } from "@/types";

export default function NexoraMidSplit() {
  const { setQuickViewProduct, formatLKR } = useStore();

  // Real-time ticking countdown
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 18
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
        return { hours: 2, minutes: 45, seconds: 18 };
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

  return (
    <section id="deals" className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* COLUMN 1: Trending Now (Rank 1, 2, 3) */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Trending Now
            </h3>
            <Link
              href="/shop"
              onClick={() => soundFX.click()}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              See All
            </Link>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-around">
            {trendingItems.map((item: LaptopProduct, idx: number) => (
              <div
                key={item.id}
                onClick={() => {
                  soundFX.pop();
                  setQuickViewProduct(item);
                }}
                className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer group"
              >
                {/* Rank Number */}
                <span className="text-sm font-extrabold text-slate-400 font-mono w-4 shrink-0 group-hover:text-rose-600">
                  {idx + 1}
                </span>

                {/* Thumbnail Image */}
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/60">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-1 group-hover:scale-110 transition-transform"
                  />
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-rose-600 transition-colors">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-extrabold text-slate-900">
                      {formatLKR(item.price)}
                    </span>
                    <span className="flex items-center gap-0.5 text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-100">
                      ★ {item.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 2: Summer Refresh Sale (Realistic Reference Match) */}
        <div className="lg:col-span-6 relative rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[340px] shadow-lg group flex flex-col justify-center p-6 sm:p-10 bg-[#122888]">
          {/* Realistic High-Res Summer Sale Background Image */}
          <Image
            src="/generated/summer-sale.webp"
            alt="Summer Refresh Sale"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-right sm:object-center group-hover:scale-105 transition-transform duration-700"
          />

          {/* Mobile gradient overlay for text legibility on narrow screens */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#102379]/85 via-[#102379]/30 to-transparent sm:hidden"></div>

          {/* Banner Typography & CTA exactly matching reference */}
          <div className="relative z-10 max-w-[220px] sm:max-w-[260px]">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-[1.12] mb-2.5 tracking-tight">
              Summer <br /> Refresh <br /> Sale
            </h2>
            <p className="text-white/90 text-sm font-medium mb-6">
              Up to 50% Off
            </p>
            <Link
              href="/shop?sale=true"
              onClick={() => soundFX.pop()}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#FF5A5F] hover:bg-[#f84349] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#FF5A5F]/30 hover:scale-105 active:scale-95 transition-all"
            >
              Shop The Sale
            </Link>
          </div>
        </div>

        {/* COLUMN 3: Flash Offers with Live Countdown Timer */}
        <div className="lg:col-span-3 bg-[#F0F4FF] rounded-3xl p-5 border border-indigo-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
                Flash Offers
              </span>
              <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                Live
              </span>
            </div>

            {/* Countdown Blocks (Exact Orange Blocks from Screenshot) */}
            <div className="flex items-center justify-center gap-2 my-2 py-2">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-rose-500 to-red-500 text-white font-mono font-black text-sm flex items-center justify-center shadow-md shadow-rose-500/20">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <span className="text-[9px] font-bold text-slate-500 mt-1 uppercase">HRS</span>
              </div>
              <span className="text-rose-500 font-black text-base -mt-4">:</span>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-rose-500 to-red-500 text-white font-mono font-black text-sm flex items-center justify-center shadow-md shadow-rose-500/20">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <span className="text-[9px] font-bold text-slate-500 mt-1 uppercase">MINS</span>
              </div>
              <span className="text-rose-500 font-black text-base -mt-4">:</span>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-rose-500 to-red-500 text-white font-mono font-black text-sm flex items-center justify-center shadow-md shadow-rose-500/20">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <span className="text-[9px] font-bold text-slate-500 mt-1 uppercase">SECS</span>
              </div>
            </div>
          </div>

          {/* Featured Deal Product Image */}
          <div className="relative w-full h-32 my-1 rounded-2xl overflow-hidden bg-white shadow-sm flex items-center justify-center group cursor-pointer">
            <Image
              src={flashItem.image}
              alt={flashItem.name}
              fill
              className="object-contain p-2 group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Title & Price Breakdown */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-900 truncate">
              {flashItem.name}
            </h4>
            <div className="flex items-baseline justify-between mt-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-extrabold text-slate-900">
                  {formatLKR(flashItem.price)}
                </span>
                <span className="text-xs text-slate-400 line-through">
                  {formatLKR(flashItem.originalPrice || flashItem.price * 1.3)}
                </span>
              </div>
              <span className="text-[10px] font-black text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded">
                33% OFF
              </span>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-3">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
