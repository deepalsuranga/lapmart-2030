"use client";

import React from "react";
import Link from "next/link";
import { soundFX } from "@/utils/sound";
import { useStore } from "@/context/StoreContext";
import {
  Gamepad2,
  Laptop,
  Palette,
  Cpu,
  Monitor,
  Keyboard,
  HardDrive,
  Grid
} from "lucide-react";

export default function NexoraCategoryBar() {
  const { setFilters } = useStore();

  const categories = [
    {
      name: "Gaming Rigs",
      key: "Gaming",
      anchor: "#cat-gaming",
      icon: Gamepad2,
      bgColor: "bg-rose-50 text-rose-600 border-rose-100",
      accent: "group-hover:ring-rose-400"
    },
    {
      name: "Ultrabooks",
      key: "Ultrabook",
      anchor: "#cat-ultrabooks",
      icon: Laptop,
      bgColor: "bg-blue-50 text-blue-600 border-blue-100",
      accent: "group-hover:ring-blue-400"
    },
    {
      name: "Creator Studio",
      key: "Workstation",
      anchor: "#cat-creator",
      icon: Palette,
      bgColor: "bg-purple-50 text-purple-600 border-purple-100",
      accent: "group-hover:ring-purple-400"
    },
    {
      name: "Workstations",
      key: "Business",
      anchor: "#cat-workstations",
      icon: Cpu,
      bgColor: "bg-amber-50 text-amber-600 border-amber-100",
      accent: "group-hover:ring-amber-400"
    },
    {
      name: "Displays",
      key: "Monitors",
      anchor: "#cat-peripherals",
      icon: Monitor,
      bgColor: "bg-cyan-50 text-cyan-600 border-cyan-100",
      accent: "group-hover:ring-cyan-400"
    },
    {
      name: "Peripherals",
      key: "Accessories",
      anchor: "#cat-peripherals",
      icon: Keyboard,
      bgColor: "bg-indigo-50 text-indigo-600 border-indigo-100",
      accent: "group-hover:ring-indigo-400"
    },
    {
      name: "Components",
      key: "Storage",
      anchor: "#cat-peripherals",
      icon: HardDrive,
      bgColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      accent: "group-hover:ring-emerald-400"
    },
    {
      name: "More",
      key: "ALL",
      anchor: "/shop",
      icon: Grid,
      bgColor: "bg-slate-100 text-slate-700 border-slate-200",
      accent: "group-hover:ring-slate-400"
    }
  ];

  const handleCategoryClick = (cat: typeof categories[0]) => {
    soundFX.select();
    if (cat.anchor.startsWith("#")) {
      const el = document.querySelector(cat.anchor);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.location.href = cat.anchor;
  };

  return (
    <section id="categories" className="relative mt-6 sm:mt-8 mb-4 z-20 max-w-7xl mx-auto px-4 sm:px-8 animate-in fade-in duration-300">
      {/* Floating White / Dark Rounded Capsule Container (Visible Immediately On Load) */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl p-3 sm:p-4 shadow-[0_16px_50px_-10px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_50px_-10px_rgba(0,0,0,0.4)] border border-slate-200/80 dark:border-white/10 transition-colors duration-300">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3 items-center">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat)}
                className="group flex flex-col items-center justify-center text-center p-1.5 sm:p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-200 cursor-pointer"
              >
                {/* Circular Icon Pod */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border ${cat.bgColor} shadow-sm transition-all duration-200 group-hover:scale-110 group-hover:shadow-md group-hover:ring-4 ${cat.accent} ring-transparent mb-1 sm:mb-1.5`}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {/* Category Title */}
                <span className="text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white transition-colors leading-tight">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
