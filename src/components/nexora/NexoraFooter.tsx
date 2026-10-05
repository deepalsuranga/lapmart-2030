"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, Smartphone, Download } from "lucide-react";
import { soundFX } from "@/utils/sound";

export default function NexoraFooter() {
  return (
    <footer className="bg-slate-100 dark:bg-[#050711] text-slate-800 dark:text-white pt-14 pb-10 border-t border-slate-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main Grid: 4 Links Columns + App Download Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-white/10">
          
          {/* Col 1: Brand & Tagline (lg: 3 cols) */}
          <div className="lg:col-span-3">
            <Link
              href="/"
              onClick={() => soundFX.click()}
              className="flex items-center gap-2.5 mb-4 group"
            >
              <div className="relative w-[100px] h-[30px] flex items-center justify-center shrink-0 overflow-hidden">
                <Image
                  src="/lapmart-logo.svg"
                  alt="LapMart Official Brand Logo"
                  width={100}
                  height={30}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  className="w-full h-full object-contain drop-shadow-[0_2px_10px_rgba(234,160,29,0.25)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-[9px] font-mono tracking-widest text-amber-600 dark:text-amber-400 font-bold bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded-full">
                2030
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xs">
              Your world. Your style. <br />
              Sri Lanka&apos;s premier laptop & gaming station ecosystem.
            </p>
            <div className="mt-4 text-xs text-slate-500">
              Colombo • Kandy • Anuradhapura • Kurunegala • Polonnaruwa
            </div>
          </div>

          {/* Col 2: Shop (lg: 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/shop" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=new" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=best" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/shop?sale=true" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Flash Deals
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Gaming" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Gaming Rigs
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Workstation" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Creator Studios
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care (lg: 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  FAQ & Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Track Delivery
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Warranty & Returns
                </Link>
              </li>
              <li>
                <Link href="#lab" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  45-Point Hardware Diagnostics
                </Link>
              </li>
              <li>
                <Link href="/installments" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  0% Installments (Koko/Mintpay)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Physical Hubs (lg: 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Physical Hubs
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="#showrooms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Colombo Flagship
                </Link>
              </li>
              <li>
                <Link href="#showrooms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Kandy City Center
                </Link>
              </li>
              <li>
                <Link href="#showrooms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Bambalapitiya Hub
                </Link>
              </li>
              <li>
                <Link href="#showrooms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Kurunegala Megastore
                </Link>
              </li>
              <li>
                <Link href="#showrooms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Anuradhapura Tech Zone
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Download App Box (lg: 3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Get the App
            </h4>
            
            <div className="flex items-center gap-4">
              <div className="space-y-2.5">
                {/* App Store Button */}
                <button
                  onClick={() => soundFX.pop()}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-200/70 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-left transition-colors w-36 shadow-2xs cursor-pointer"
                >
                  <span className="text-lg text-slate-900 dark:text-white"></span>
                  <div>
                    <div className="text-[8px] text-slate-500 dark:text-slate-400 uppercase leading-none">Download on the</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">App Store</div>
                  </div>
                </button>

                {/* Google Play Button */}
                <button
                  onClick={() => soundFX.pop()}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-200/70 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-left transition-colors w-36 shadow-2xs cursor-pointer"
                >
                  <span className="text-base text-emerald-500">▶</span>
                  <div>
                    <div className="text-[8px] text-slate-500 dark:text-slate-400 uppercase leading-none">GET IT ON</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Google Play</div>
                  </div>
                </button>
              </div>

              {/* Phone Mockup Mini Card */}
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
            <span className="hover:text-slate-800 dark:hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-slate-800 dark:hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-800 dark:hover:text-slate-300 cursor-pointer transition-colors">Cookie Policy</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-400 bg-white dark:bg-white/5 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 text-xs cursor-pointer hover:text-slate-900 dark:hover:text-white shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
            <span>Sri Lanka (LKR)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
