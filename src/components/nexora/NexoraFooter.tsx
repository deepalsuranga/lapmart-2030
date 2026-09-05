"use client";

import React from "react";
import Link from "next/link";
import { Globe, Smartphone, Download } from "lucide-react";
import { soundFX } from "@/utils/sound";

export default function NexoraFooter() {
  return (
    <footer className="bg-[#050711] text-white pt-14 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main Grid: 4 Links Columns + App Download Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Tagline (lg: 3 cols) */}
          <div className="lg:col-span-3">
            <Link
              href="/"
              onClick={() => soundFX.click()}
              className="flex items-center gap-2.5 mb-4 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 to-cyan-400 p-[2px]">
                <div className="w-full h-full bg-[#090D1E] rounded-[6px] flex items-center justify-center font-black text-rose-400 text-sm">
                  ✕
                </div>
              </div>
              <span className="text-xl font-black tracking-wider uppercase text-white group-hover:text-rose-400 transition-colors">
                Lap<span className="text-rose-500">Mart</span> 2030
              </span>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xs">
              Your world. Your style. <br />
              Sri Lanka&apos;s premier laptop & gaming station ecosystem.
            </p>
            <div className="mt-4 text-xs text-slate-500">
              Colombo • Kandy • Anuradhapura • Kurunegala • Polonnaruwa
            </div>
          </div>

          {/* Col 2: Shop (lg: 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=new" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=best" className="hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/shop?sale=true" className="hover:text-white transition-colors">
                  Flash Deals
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Gaming" className="hover:text-white transition-colors">
                  Gaming Rigs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care (lg: 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#showrooms" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="tel:0710595548" className="hover:text-white transition-colors">
                  Track Order (071 059 5548)
                </a>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Returns & Refunds
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  45-Pt Hardware Check
                </span>
              </li>
              <li>
                <a href="https://wa.me/94710595548" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: About LapMart (lg: 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              About LapMart
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  7 Physical Showrooms
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Direct Importers
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Sustainability & E-Waste
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Careers at LapMart
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Get the App (lg: 3 cols) - Matching Mockup from Screenshot */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Get the App
            </h4>
            
            <div className="flex items-center gap-4">
              <div className="space-y-2.5">
                {/* App Store Button */}
                <button
                  onClick={() => soundFX.pop()}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition-colors w-36"
                >
                  <span className="text-lg"></span>
                  <div>
                    <div className="text-[8px] text-slate-400 uppercase leading-none">Download on the</div>
                    <div className="text-xs font-bold text-white leading-tight">App Store</div>
                  </div>
                </button>

                {/* Google Play Button */}
                <button
                  onClick={() => soundFX.pop()}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition-colors w-36"
                >
                  <span className="text-base text-emerald-400">▶</span>
                  <div>
                    <div className="text-[8px] text-slate-400 uppercase leading-none">GET IT ON</div>
                    <div className="text-xs font-bold text-white leading-tight">Google Play</div>
                  </div>
                </button>
              </div>

              {/* Phone Mockup Mini Card (From Reference Image) */}
              <div className="w-16 h-28 rounded-2xl bg-gradient-to-b from-indigo-600 via-rose-500 to-amber-400 p-[2px] shadow-lg shadow-rose-500/20 rotate-3 hover:rotate-0 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-between p-1.5 overflow-hidden">
                  <div className="w-4 h-1 bg-slate-700 rounded-full"></div>
                  <div className="text-[9px] font-black text-rose-400">2030</div>
                  <div className="w-full h-8 rounded-lg bg-white/10 flex items-center justify-center text-[7px] text-slate-300">
                    LapMart App
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Country Selector Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 LapMart 2030. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Cookie Policy</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10 text-xs cursor-pointer hover:text-white">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sri Lanka (LKR)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
