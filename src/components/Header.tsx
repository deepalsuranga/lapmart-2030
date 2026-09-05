"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LAPMART_BRANCHES, MASTER_HOTLINE } from "@/data/lapmart-data";
import { useStore } from "@/context/StoreContext";
import {
  Phone,
  Search,
  ShoppingCart,
  Heart,
  User,
  MapPin,
  ChevronDown,
  Volume2,
  VolumeX,
  Command,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import PriceTag from "@/components/PriceTag";
import { soundFX } from "@/utils/sound";
import gsap from "gsap";

export default function Header() {
  const {
    cartTotal,
    cartCount,
    setIsCartOpen,
    wishlist,
    selectedBranch,
    setSelectedBranch,
    setIsCommandPaletteOpen,
    soundEnabled,
    toggleSound,
    formatLKR
  } = useStore();

  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const currentBranch =
    LAPMART_BRANCHES.find((b) => b.id === selectedBranch) || LAPMART_BRANCHES[2];

  // GSAP entrance animation
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full transition-all duration-300"
    >
      {/* ULTRA-CLEAN UNIFIED 2030 FROSTED GLASS STICKY BAR */}
      <div className="backdrop-blur-2xl bg-white/85 border-b border-slate-200/80 shadow-[0_4px_24px_-2px_rgba(0,0,0,0.04)] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto h-16 sm:h-[70px] flex items-center justify-between gap-3 sm:gap-6">
          
          {/* 1. BRAND MARK & BRANCH PICKER */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => soundFX.click()}
              className="flex items-center gap-2.5 group select-none"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 shadow-sm shadow-orange-500/25 border border-amber-300/40 group-hover:scale-105 transition-transform duration-300">
                <div className="w-4 h-3 border-2 border-white rounded-[2px] flex flex-col items-center justify-end pb-0.5">
                  <div className="w-1.5 h-0.5 bg-white rounded-full"></div>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-cyan-400 rounded-full flex items-center justify-center text-[8px] font-black text-slate-950">
                  ⚡
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                  Lap<span className="text-amber-500">Mart</span>
                </span>
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200/70">
                  2030
                </span>
              </div>
            </Link>

            {/* Clean Branch Indicator Pill */}
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  soundFX.click();
                  setIsBranchDropdownOpen(!isBranchDropdownOpen);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  isBranchDropdownOpen
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-amber-400"
                }`}
                title="Select from 7 Islandwide Branches"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{currentBranch.city}</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isBranchDropdownOpen ? "rotate-180 text-amber-400" : "text-slate-400"
                  }`}
                />
              </button>

              {/* Clean Branch Dropdown Popover */}
              {isBranchDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 w-80 glass-panel bg-white/98 rounded-2xl border border-slate-200/90 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between border-b border-slate-100">
                    <span>7 Physical Showrooms</span>
                    <span className="text-emerald-600">All Online</span>
                  </div>

                  <div className="space-y-1 mt-1.5 max-h-72 overflow-y-auto">
                    {LAPMART_BRANCHES.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => {
                          soundFX.click();
                          setSelectedBranch(b.id);
                          setIsBranchDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          b.id === selectedBranch
                            ? "bg-amber-500 text-white font-medium shadow-sm"
                            : "hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        <div>
                          <div className="font-bold flex items-center gap-1.5">
                            {b.city}
                            {b.isFlagship && (
                              <span
                                className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                                  b.id === selectedBranch
                                    ? "bg-amber-700 text-amber-100"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                FLAGSHIP
                              </span>
                            )}
                          </div>
                          <div
                            className={`text-[10px] font-mono mt-0.5 ${
                              b.id === selectedBranch ? "text-amber-100" : "text-slate-400"
                            }`}
                          >
                            {b.displayPhone}
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            b.id === selectedBranch
                              ? "bg-amber-600 text-white"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}
                        >
                          Open
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. MINIMALIST SPOTLIGHT SEARCH BAR (Apple / Raycast Style) */}
          <div className="flex-1 max-w-lg mx-2 sm:mx-6">
            <button
              onClick={() => {
                soundFX.click();
                setIsCommandPaletteOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100/80 hover:bg-white border border-slate-200/90 hover:border-amber-400/80 text-slate-400 hover:text-slate-600 transition-all duration-200 group shadow-2xs cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Search className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors shrink-0" />
                <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 truncate">
                  Search laptops, RTX, RAM, ThinkPad...
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-400 group-hover:text-slate-600 text-[10px] font-mono font-semibold shrink-0 shadow-2xs">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </button>
          </div>

          {/* 3. CLEAN RIGHT ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Direct Shop Link Button */}
            <Link
              href="/shop"
              onClick={() => soundFX.click()}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/90 text-slate-800 text-xs font-bold transition-all shadow-2xs hover:text-amber-600"
              title="Browse All Laptops & Gears"
            >
              <span>Shop All</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            </Link>

            {/* Master Hotline Pill (Desktop) */}
            <a
              href={`tel:${MASTER_HOTLINE.replace(/\s/g, "")}`}
              onClick={() => soundFX.click()}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-700 hover:text-amber-600 text-xs font-semibold transition-all shadow-2xs"
              title="Call LapMart Direct Hotline"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-mono">{MASTER_HOTLINE}</span>
            </a>

            {/* Tactile Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                soundEnabled
                  ? "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100"
                  : "bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600 hover:bg-slate-100"
              }`}
              title={
                soundEnabled
                  ? "Cyber Sound: Active (Click to mute)"
                  : "Cyber Sound: Muted (Click to enable)"
              }
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-amber-600" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                soundFX.click();
                alert(`Wishlist contains ${wishlist.length} saved laptops.`);
              }}
              className="relative p-2 rounded-xl text-slate-600 hover:text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
              )}
            </button>

            {/* Clean Cart Button with Badge */}
            <button
              onClick={() => {
                soundFX.click();
                setIsCartOpen(true);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-md transition-all group cursor-pointer"
              title="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>

              <div className="hidden sm:flex items-baseline gap-1">
                <PriceTag
                  amount={cartTotal}
                  className="text-xs font-mono font-bold text-amber-300"
                  currencyClassName="text-[0.8em] font-bold mr-0.5 opacity-80"
                  decimalClassName="text-[0.7em] font-medium opacity-70 ml-0.5"
                />
              </div>
            </button>

            {/* Sign In */}
            <button
              onClick={() => {
                soundFX.click();
                alert("LapMart 2030 Customer Portal");
              }}
              className="hidden lg:flex p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              title="Customer Account"
            >
              <User className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
