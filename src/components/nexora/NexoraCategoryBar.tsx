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
      icon: Gamepad2,
      bgColor: "bg-rose-50 text-rose-600 border-rose-100",
      accent: "group-hover:ring-rose-400"
    },
    {
      name: "Ultrabooks",
      key: "Budget",
      icon: Laptop,
      bgColor: "bg-blue-50 text-blue-600 border-blue-100",
      accent: "group-hover:ring-blue-400"
    },
    {
      name: "Creator Studio",
      key: "Creator",
      icon: Palette,
      bgColor: "bg-purple-50 text-purple-600 border-purple-100",
      accent: "group-hover:ring-purple-400"
    },
    {
      name: "Workstations",
      key: "Business",
      icon: Cpu,
      bgColor: "bg-amber-50 text-amber-600 border-amber-100",
      accent: "group-hover:ring-amber-400"
    },
    {
      name: "Displays",
      key: "Monitors",
      icon: Monitor,
      bgColor: "bg-cyan-50 text-cyan-600 border-cyan-100",
      accent: "group-hover:ring-cyan-400"
    },
    {
      name: "Peripherals",
      key: "Accessories",
      icon: Keyboard,
      bgColor: "bg-indigo-50 text-indigo-600 border-indigo-100",
      accent: "group-hover:ring-indigo-400"
    },
    {
      name: "Components",
      key: "Storage",
      icon: HardDrive,
      bgColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      accent: "group-hover:ring-emerald-400"
    },
    {
      name: "More",
      key: "ALL",
      icon: Grid,
      bgColor: "bg-slate-100 text-slate-700 border-slate-200",
      accent: "group-hover:ring-slate-400"
    }
  ];

  const handleCategoryClick = (catKey: string) => {
    soundFX.select();
    setFilters((prev) => ({ ...prev, category: catKey }));
    const el = document.querySelector("#recommended");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="categories" className="relative -mt-10 sm:-mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Floating White Rounded Capsule Container (Exact Reference UI) */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-[0_16px_50px_-10px_rgba(0,0,0,0.08)] border border-slate-100">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 items-center">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat.key)}
                className="group flex flex-col items-center justify-center text-center p-2 rounded-2xl hover:bg-slate-50 transition-all duration-200 cursor-pointer"
              >
                {/* Circular Icon Pod */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border ${cat.bgColor} shadow-sm transition-all duration-200 group-hover:scale-110 group-hover:shadow-md group-hover:ring-4 ${cat.accent} ring-transparent mb-2.5`}
                >
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                {/* Category Title */}
                <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-slate-950 transition-colors">
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
