"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  ShieldCheck
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
    formatLKR
  } = useStore();

  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [currentNav, setCurrentNav] = useState(activeTab);

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
    <header className="sticky top-0 z-50 w-full bg-[#070913]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all">
      {/* Top Utility / Announcement Micro Bar (Subtle & High-tech) */}
      <div className="bg-gradient-to-r from-rose-950/40 via-indigo-950/40 to-slate-950/40 border-b border-white/5 py-1 px-4 sm:px-8 text-[11px] text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-rose-400 font-semibold">
            <Sparkles className="w-3 h-3 text-rose-400 animate-spin" />
            Cyber Summer Drop 2030
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">
            7 Islandwide Branches in Sri Lanka • 45-Point Hardware Certified
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-slate-400">
            Official Hotline: <strong className="text-white font-mono">071 059 5548</strong>
          </span>
          <button
            onClick={() => {
              toggleSound();
              soundFX.toggle();
            }}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            title="Audio Feedback Toggle"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span className="hidden md:inline">{soundEnabled ? "SFX On" : "SFX Off"}</span>
          </button>
        </div>
      </div>

      {/* Primary Navigation Row (Exact Reference UI Hierarchy) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-[68px] flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => soundFX.click()}
          className="flex items-center gap-2.5 group shrink-0 select-none"
        >
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 via-purple-600 to-cyan-400 p-[2px] shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#090D1E] rounded-[6px] flex items-center justify-center font-black text-rose-400 text-base">
              ✕
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black tracking-wider text-white group-hover:text-rose-400 transition-colors uppercase">
              Lap<span className="text-rose-500">Mart</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold">
              2030
            </span>
          </div>
        </Link>

        {/* Center Capsule Search Input (Exact Look of Reference Image) */}
        <div className="flex-1 max-w-2xl mx-2 sm:mx-6">
          <button
            onClick={() => {
              soundFX.pop();
              setIsCommandPaletteOpen(true);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 transition-all text-slate-400 hover:text-slate-200 group text-sm shadow-inner"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-rose-400 transition-colors shrink-0" />
            <span className="text-xs sm:text-sm truncate">
              Search for products, brands & more...
            </span>
            <span className="ml-auto hidden md:flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 border border-white/5">
              ⌘K
            </span>
          </button>
        </div>

        {/* Right Actions: User Account, Wishlist Heart, Shopping Cart */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* User Profile Button */}
          <button
            onClick={() => {
              soundFX.click();
              setIsCommandPaletteOpen(true);
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            title="User Account"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Wishlist Heart */}
          <Link
            href="/shop?tab=wishlist"
            onClick={() => soundFX.click()}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-300 hover:text-rose-400 hover:bg-white/10 transition-all"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon with Vibrant Badge Count (Matching Reference UI) */}
          <button
            onClick={() => {
              soundFX.cart();
              setIsCartOpen(true);
            }}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 ? (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-rose-500 to-red-600 text-white text-[11px] font-black flex items-center justify-center shadow-md shadow-rose-600/50 animate-bounce">
                {cartCount}
              </span>
            ) : (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500/80 text-white text-[10px] font-bold flex items-center justify-center">
                0
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Sub-row Navigation Pills (Exact Pill Tab Design from Reference UI) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-3 pt-1 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
        <nav className="flex items-center gap-1.5 sm:gap-2">
          {navItems.map((item) => {
            const isActive = currentNav === item.name;
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-white text-slate-950 shadow-md shadow-white/10 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.name}
              </button>
            );
          })}
          
          <Link
            href="/shop"
            onClick={() => soundFX.click()}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all whitespace-nowrap"
          >
            Browse All Hardware →
          </Link>
        </nav>

        {/* Showroom selector badge on the right of subnav */}
        <div className="relative hidden lg:block shrink-0">
          <button
            onClick={() => {
              soundFX.click();
              setIsBranchDropdownOpen(!isBranchDropdownOpen);
            }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-medium">{currentBranch.city} Branch</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isBranchDropdownOpen && (
            <div className="absolute top-full mt-2 right-0 w-72 bg-[#0d1226] border border-white/15 rounded-2xl p-2.5 z-50 shadow-2xl animate-in fade-in slide-in-from-top-2">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-3 py-1 border-b border-white/10 mb-1">
                7 Physical Showrooms
              </div>
              {LAPMART_BRANCHES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    soundFX.select();
                    setSelectedBranch(b.id);
                    setIsBranchDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors text-left ${
                    selectedBranch === b.id
                      ? "bg-rose-500/20 text-rose-300 font-semibold"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <div>
                    <div className="font-semibold text-white">{b.city}</div>
                    <div className="text-[10px] text-slate-400">{b.hours}</div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Open</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
