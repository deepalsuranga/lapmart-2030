"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Check,
  Sparkles,
  Sun,
  Moon
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
    theme,
    toggleTheme,
    formatLKR
  } = useStore();

  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const branchDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (branchDropdownRef.current && !branchDropdownRef.current.contains(e.target as Node)) {
        setIsBranchDropdownOpen(false);
      }
    };
    if (isBranchDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isBranchDropdownOpen]);

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
      <div className="relative overflow-visible backdrop-blur-2xl bg-white/85 dark:bg-[#070913]/90 border-b border-slate-200/80 dark:border-white/10 shadow-[0_4px_24px_-2px_rgba(0,0,0,0.04)] px-4 sm:px-8">
        <div className="relative z-10 max-w-7xl mx-auto h-16 sm:h-[70px] flex items-center justify-between gap-3 sm:gap-6">
          
          {/* 1. BRAND MARK & BRANCH PICKER */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Brand Logo Container (Clean & Borderless with Black Popup Shadow Effect) */}
            <div className="relative flex items-center shrink-0">
              {/* Official LapMart Brand Logo */}
              <Link
                href="/"
                onClick={() => soundFX.click()}
                className="relative z-10 flex items-center group select-none py-1 focus:outline-none"
              >
                <div className="relative h-9 sm:h-10 w-[115px] sm:w-[130px] flex items-center shrink-0">
                  <Image
                    src="/lapmart-logo.svg"
                    alt="LapMart Official Brand Logo"
                    width={130}
                    height={40}
                    priority
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      filter: "drop-shadow(0 1.5px 2px rgba(0, 0, 0, 0.7)) drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4)) drop-shadow(0 6px 12px rgba(0, 0, 0, 0.25))"
                    }}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
            </div>

            {/* Clean Branch Indicator Pill */}
            <div className="relative shrink-0" ref={branchDropdownRef}>
              <button
                onClick={() => {
                  soundFX.click();
                  setIsBranchDropdownOpen(!isBranchDropdownOpen);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  isBranchDropdownOpen
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-sm"
                    : "bg-slate-100/90 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                }`}
                title="Select from 7 Islandwide Branches"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{selectedBranch === "all" ? "All Branches" : `${currentBranch.city} Branch`}</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isBranchDropdownOpen ? "rotate-180 text-rose-500 dark:text-rose-400" : "text-slate-400"
                  }`}
                />
              </button>

              {/* Clean Branch Dropdown Popover */}
              {isBranchDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 w-80 bg-white dark:bg-[#0d1226] rounded-2xl border border-slate-200 dark:border-white/15 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between border-b border-slate-100 dark:border-white/10">
                    <span>Islandwide Showrooms</span>
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      All Online
                    </span>
                  </div>

                  <div className="space-y-1 mt-1.5 max-h-80 overflow-y-auto">
                    {/* 1. All Branches option */}
                    <button
                      onClick={() => {
                        soundFX.select();
                        setSelectedBranch("all");
                        setIsBranchDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        selectedBranch === "all"
                          ? "bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-semibold border border-rose-200 dark:border-rose-500/30 shadow-xs"
                          : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 border border-transparent"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                          <span>All Branches</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                            DEFAULT
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          7 Showrooms & Islandwide Fast Delivery
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                          Islandwide Hotline: 071 059 5548
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {selectedBranch === "all" && <Check className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-bold">
                          7 Hubs
                        </span>
                      </div>
                    </button>

                    {LAPMART_BRANCHES.map((b) => {
                      const isSelected = b.id === selectedBranch;
                      return (
                        <button
                          key={b.id}
                          onClick={() => {
                            soundFX.select();
                            setSelectedBranch(b.id);
                            setIsBranchDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-semibold border border-rose-200 dark:border-rose-500/30 shadow-xs"
                              : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 border border-transparent"
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <div className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                              {b.city}
                              {b.isFlagship && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300">
                                  FLAGSHIP
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {b.address}
                            </div>
                            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                              {b.hours} • {b.displayPhone}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {isSelected && <Check className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-bold">
                              Open
                            </span>
                          </div>
                        </button>
                      );
                    })}
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

            {/* Animated Header Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 hover:border-amber-300 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-amber-600 transition-all cursor-pointer group"
              title={theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
              aria-label="Toggle theme"
            >
              <div className="w-4 h-4 flex items-center justify-center transition-transform duration-500 transform group-hover:rotate-45 active:scale-90">
                {theme === "light" ? (
                  <Moon className="w-4 h-4 text-slate-700 hover:text-indigo-600 transition-colors" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500 hover:text-amber-400 transition-colors" />
                )}
              </div>
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
