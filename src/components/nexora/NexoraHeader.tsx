"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { LAPMART_BRANCHES } from "@/data/lapmart-data";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Volume2,
  VolumeX,
  MapPin,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Sun,
  Moon,
  Check
} from "lucide-react";
import { soundFX } from "@/utils/sound";

interface NexoraHeaderProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function NexoraHeader({
  activeTab = "Home",
  setActiveTab
}: NexoraHeaderProps) {
  const {
    cartCount,
    cartTotal,
    setIsCartOpen,
    wishlist,
    setIsCommandPaletteOpen,
    selectedBranch,
    setSelectedBranch,
    soundEnabled,
    toggleSound,
    theme,
    toggleTheme,
    formatLKR
  } = useStore();

  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [currentNav, setCurrentNav] = useState(activeTab);
  const branchDropdownRef = useRef<HTMLDivElement>(null);

  // Close branch dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        branchDropdownRef.current &&
        !branchDropdownRef.current.contains(event.target as Node)
      ) {
        setIsBranchDropdownOpen(false);
      }
    }
    if (isBranchDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBranchDropdownOpen]);

  const currentBranch =
    LAPMART_BRANCHES.find((b) => b.id === selectedBranch) || LAPMART_BRANCHES[2];

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "#categories" },
    { name: "Collections", href: "#collections" },
    { name: "Deals", href: "#deals" },
    { name: "Creators", href: "#creators" },
    { name: "Showrooms", href: "#showrooms" },
    { name: "Diagnostic Lab", href: "#lab" }
  ];

  const handleNavClick = (item: { name: string; href: string }) => {
    soundFX.click();
    setCurrentNav(item.name);
    if (setActiveTab) setActiveTab(item.name);
    if (item.href.startsWith("#")) {
      const el = document.querySelector(item.href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#070913]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-2xl transition-colors duration-300">
      {/* Top Utility / Announcement Micro Bar (Clean & Opaque - Absolutely No Background Effect) */}
      <div className="relative z-30 bg-slate-100 dark:bg-[#070913] border-b border-slate-200/80 dark:border-white/10 py-1.5 px-4 sm:px-8 text-[11px] text-slate-600 dark:text-slate-300 flex items-center justify-between transition-colors duration-300">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Official Authorized Laptop Network
          </span>
          <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-600 dark:text-slate-300 hidden sm:inline">
            7 Physical Showrooms Across Sri Lanka • 45-Point Hardware Certified • Same-Day Dispatch
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-slate-500 dark:text-slate-400">
            Official Hotline: <strong className="text-slate-900 dark:text-white font-mono">071 059 5548</strong>
          </span>
          <button
            onClick={() => {
              toggleSound();
              soundFX.toggle();
            }}
            className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Audio Feedback Toggle"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            )}
            <span className="hidden md:inline">{soundEnabled ? "SFX On" : "SFX Off"}</span>
          </button>
        </div>
      </div>

      {/* Main Header Body Area */}
      <div className="relative w-full">
        {/* Primary Navigation Row */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-[68px] flex items-center justify-between gap-4">
        
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

        {/* Center Capsule Search Input */}
        <div className="flex-1 max-w-2xl mx-2 sm:mx-6">
          <button
            onClick={() => {
              soundFX.pop();
              setIsCommandPaletteOpen(true);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-100/90 dark:bg-white/[0.07] hover:bg-slate-200/80 dark:hover:bg-white/[0.12] border border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 group text-sm shadow-inner"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors shrink-0" />
            <span className="text-xs sm:text-sm truncate">
              Search for products, brands & more...
            </span>
            <span className="ml-auto hidden md:flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/5 shadow-xs">
              ⌘K
            </span>
          </button>
        </div>

        {/* Right Actions: Theme Toggle, User Account, Wishlist Heart, Shopping Cart */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Animated Header Theme Toggle Icon Button */}
          <button
            onClick={toggleTheme}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            title={theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
            aria-label="Toggle theme"
          >
            <div className="relative w-5 h-5 flex items-center justify-center transition-transform duration-500 transform group-hover:rotate-45 active:scale-90">
              {theme === "light" ? (
                <Moon className="w-[18px] h-[18px] text-slate-700 hover:text-indigo-600 transition-colors animate-in spin-in-90 duration-300 fill-slate-700/10" />
              ) : (
                <Sun className="w-[18px] h-[18px] text-amber-400 hover:text-amber-300 transition-colors animate-in spin-in-90 duration-300 fill-amber-400/20" />
              )}
            </div>
          </button>

          {/* User Profile Button */}
          <button
            onClick={() => {
              soundFX.click();
              setIsCommandPaletteOpen(true);
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            title="User Account"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Wishlist Heart */}
          <Link
            href="/shop?tab=wishlist"
            onClick={() => soundFX.click()}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon with Vibrant Badge Count */}
          <button
            onClick={() => {
              soundFX.cart();
              setIsCartOpen(true);
            }}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] font-black flex items-center justify-center shadow-md shadow-rose-600/50 animate-in zoom-in-50 duration-200">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Sub-row Navigation Pills & Showroom Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-3 pt-1 flex items-center justify-between gap-3 relative">
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 min-w-0">
          {navItems.map((item) => {
            const isActive = currentNav === item.name;
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md shadow-slate-900/10 dark:shadow-white/10 font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
                }`}
              >
                {item.name}
              </button>
            );
          })}
          
          <Link
            href="/shop"
            onClick={() => soundFX.click()}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all whitespace-nowrap"
          >
            Browse All Hardware →
          </Link>
        </nav>

        {/* Showroom selector badge on the right of subnav */}
        <div className="relative shrink-0" ref={branchDropdownRef}>
          <button
            onClick={() => {
              soundFX.click();
              setIsBranchDropdownOpen(!isBranchDropdownOpen);
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all cursor-pointer ${
              isBranchDropdownOpen
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-md font-semibold"
                : "bg-slate-100/90 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
            title="Choose Pickup / Visiting Showroom"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-medium whitespace-nowrap">
              {selectedBranch === "all" ? "All Branches" : `${currentBranch.city} Branch`}
            </span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isBranchDropdownOpen ? "rotate-180" : "text-slate-400"}`} />
          </button>

          {isBranchDropdownOpen && (
            <div className="absolute top-full mt-2 right-0 w-80 bg-white dark:bg-[#0d1226] border border-slate-200 dark:border-white/15 rounded-2xl p-2.5 z-50 shadow-2xl animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 dark:border-white/10 mb-1.5">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                  Islandwide Showrooms
                </span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Islandwide Stock
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto space-y-1 pr-1">
                {/* 1. All Branches option */}
                <button
                  onClick={() => {
                    soundFX.select();
                    setSelectedBranch("all");
                    setIsBranchDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors text-left cursor-pointer ${
                    selectedBranch === "all"
                      ? "bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-semibold border border-rose-200 dark:border-rose-500/30"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>All Branches</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold">
                        DEFAULT
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      7 Showrooms & Islandwide Fast Delivery
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                      Islandwide Hotline: 071 059 5548
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {selectedBranch === "all" && <Check className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      7 Hubs
                    </span>
                  </div>
                </button>

                {LAPMART_BRANCHES.map((b) => {
                  const isSelected = selectedBranch === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => {
                        soundFX.select();
                        setSelectedBranch(b.id);
                        setIsBranchDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors text-left cursor-pointer ${
                        isSelected
                          ? "bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-semibold border border-rose-200 dark:border-rose-500/30"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{b.city}</span>
                          {b.isFlagship && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold">
                              FLAGSHIP
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {b.address}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                          {b.hours} • {b.displayPhone}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isSelected && <Check className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
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
      </div>
    </header>
  );
}
