"use client";

import React, { useRef } from "react";
import { useStore } from "@/context/StoreContext";
import {
  Laptop,
  Gamepad2,
  CheckCircle2,
  Sparkles,
  Repeat
} from "lucide-react";
import gsap from "gsap";

export default function BrandSelector() {
  const { activeBrandTab, setActiveBrandTab, setFilters, filters } = useStore();
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const brandTabs = [
    { id: "ALL LAPTOPS", label: "ALL LAPTOPS", icon: Laptop, type: "all" },
    { id: "GAMING", label: "GAMING", icon: Gamepad2, type: "category" },
    { id: "HP", label: "HP", type: "brand" },
    { id: "ACER", label: "ACER", type: "brand" },
    { id: "DELL", label: "DELL", type: "brand" },
    { id: "ASUS", label: "ASUS", type: "brand" },
    { id: "LENOVO", label: "LENOVO", type: "brand" },
    { id: "MSI", label: "MSI", type: "brand" },
    { id: "APPLE", label: "APPLE", type: "brand" },
    { id: "BRAND NEW", label: "BRAND NEW", icon: Sparkles, type: "condition" },
    { id: "USED", label: "USED (A+)", icon: Repeat, type: "condition" }
  ];

  const handleTabClick = (tab: typeof brandTabs[0]) => {
    setActiveBrandTab(tab.id);

    if (tab.type === "all") {
      setFilters((prev) => ({
        ...prev,
        brand: "ALL",
        condition: "ALL",
        category: "ALL"
      }));
    } else if (tab.type === "category") {
      setFilters((prev) => ({
        ...prev,
        brand: "ALL",
        condition: "ALL",
        category: "Gaming"
      }));
    } else if (tab.type === "brand") {
      setFilters((prev) => ({
        ...prev,
        brand: tab.id.charAt(0) + tab.id.slice(1).toLowerCase(),
        category: "ALL"
      }));
    } else if (tab.type === "condition") {
      setFilters((prev) => ({
        ...prev,
        brand: "ALL",
        condition: tab.id === "BRAND NEW" ? "Brand New" : "Used"
      }));
    }

    // GSAP subtle bounce on container
    if (tabsContainerRef.current) {
      gsap.fromTo(
        "#product-catalog-grid",
        { opacity: 0.7, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  };

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Choose your favorite Brand
          </h3>
          <span className="text-xl animate-bounce">👇</span>
        </div>
        <span className="text-xs font-mono text-slate-500 hidden sm:inline">
          Filter by manufacturer & architecture
        </span>
      </div>

      {/* Tabs Row */}
      <div
        ref={tabsContainerRef}
        className="glass-panel bg-white/80 p-2 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-1.5 overflow-x-auto no-scrollbar"
      >
        {brandTabs.map((tab) => {
          const isActive = activeBrandTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/25 scale-[1.02]"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-amber-500"}`} />}
              <span>{tab.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping ml-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
