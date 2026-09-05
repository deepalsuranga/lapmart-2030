"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { MASTER_HOTLINE } from "@/data/lapmart-data";
import {
  Laptop,
  Gamepad2,
  Home,
  ShoppingBag,
  MapPin,
  PhoneCall,
  Share2,
  Sparkles,
  ExternalLink
} from "lucide-react";
import gsap from "gsap";

export default function CyberDock() {
  const { filters, setFilters, setActiveBrandTab } = useStore();
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dockRef.current) {
      gsap.fromTo(
        dockRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  const brands = [
    { name: "Acer", label: "Acer Predator & Nitro", glyph: "ACER" },
    { name: "HP", label: "HP ZBook & Omen", glyph: "HP" },
    { name: "Dell", label: "Dell XPS & Alienware", glyph: "DELL" },
    { name: "Asus", label: "ASUS ROG & ZenBook", glyph: "ASUS" },
    { name: "MSI", label: "MSI Stealth & Thin", glyph: "MSI" },
    { name: "Lenovo", label: "Lenovo ThinkPad & Legion", glyph: "LENOVO" }
  ];

  const handleBrandClick = (brandName: string) => {
    setFilters((prev) => ({ ...prev, brand: brandName }));
    setActiveBrandTab(brandName.toUpperCase());
    // Scroll smoothly to products
    const elem = document.getElementById("product-catalog");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside
      ref={dockRef}
      className="hidden md:flex fixed left-4 top-28 z-40 flex-col items-center gap-3 py-4 px-2 glass-panel bg-white/80 rounded-2xl border border-slate-200/90 shadow-xl backdrop-blur-xl"
    >
      {/* 2030 Status Indicator */}
      <div className="flex flex-col items-center pb-2 border-b border-slate-200/80">
        <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-black text-xs shadow-inner">
          <Laptop className="w-4 h-4 text-amber-400" />
        </div>
        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 mt-1">
          DOCK
        </span>
      </div>

      {/* Brand Shortcuts with Hover Telemetry */}
      <div className="flex flex-col gap-1.5 py-1">
        {brands.map((b) => (
          <div key={b.name} className="relative group">
            <button
              onClick={() => handleBrandClick(b.name)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[10px] tracking-wider transition-all ${
                filters.brand.toLowerCase() === b.name.toLowerCase()
                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/30 scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white"
              }`}
            >
              {b.glyph.slice(0, 3)}
            </button>

            {/* GSAP Hover Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 glass-panel bg-slate-900 text-white rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-lg z-50">
              <span>{b.label}</span>
              <div className="text-[9px] font-mono text-amber-400">Click to filter inventory</div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-6 h-px bg-slate-200 my-1" />

      {/* Core Navigation Shortcuts */}
      <div className="flex flex-col gap-1.5">
        <Link
          href="/"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition-colors group relative"
          title="Home"
        >
          <Home className="w-4 h-4" />
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 glass-panel bg-slate-900 text-white rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
            Home
          </div>
        </Link>

        <Link
          href="/shop"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition-colors group relative"
          title="Shop Laptops & Gears"
        >
          <ShoppingBag className="w-4 h-4" />
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 glass-panel bg-slate-900 text-white rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
            Shop (All Products)
          </div>
        </Link>

        <a
          href="#accessories"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition-colors group relative"
          title="Accessories"
        >
          <Gamepad2 className="w-4 h-4" />
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 glass-panel bg-slate-900 text-white rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
            Accessories & Gears
          </div>
        </a>

        <a
          href="#branches"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition-colors group relative"
          title="Branch Network"
        >
          <MapPin className="w-4 h-4" />
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 glass-panel bg-slate-900 text-white rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
            7 Islandwide Branches
          </div>
        </a>
      </div>

      <div className="w-6 h-px bg-slate-200 my-1" />

      {/* Social & Hotline */}
      <div className="flex flex-col gap-1.5 items-center">
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors"
          title="LapMart YouTube Channel"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>

        <a
          href={`tel:${MASTER_HOTLINE.replace(/\s/g, "")}`}
          className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/25 hover:scale-105 transition-transform"
          title={`Direct Hotline: ${MASTER_HOTLINE}`}
        >
          <PhoneCall className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </aside>
  );
}
