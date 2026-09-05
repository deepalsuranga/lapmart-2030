"use client";

import React from "react";
import {
  ShieldCheck,
  Cpu,
  Truck,
  Building2,
  RefreshCw,
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function TrustGuarantees() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "2-Year Official Warranty",
      desc: "Comprehensive hardware warranty with on-site technician service and authentic replacement parts.",
      tag: "Store Backed",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
    {
      icon: Cpu,
      title: "45-Point Diagnostic Lab",
      desc: "Every used machine undergoes 100% motherboard, thermal, RAM, and battery cell health testing.",
      tag: "Certified Grade A+",
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
    },
    {
      icon: Truck,
      title: "24h Islandwide Dispatch",
      desc: "Secure insured door-to-door courier delivery to all 25 districts in Sri Lanka with track & trace.",
      tag: "Free Shipping",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    {
      icon: Building2,
      title: "7 Physical Showrooms",
      desc: "Walk in to inspect, benchmark, and test before purchase in Colombo, Kandy, Kurunegala, etc.",
      tag: "Direct Walk-in",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      icon: RefreshCw,
      title: "7-Day Easy Exchange",
      desc: "Flexible model upgrade and component enhancement policy for total peace of mind.",
      tag: "Hassle Free",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20"
    }
  ];

  return (
    <section className="py-8 px-4 sm:px-8 border-y border-slate-200/80 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`p-4 rounded-2xl border ${pillar.border} bg-white shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-2 group`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl ${pillar.bg} ${pillar.color} flex items-center justify-center font-bold`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {pillar.tag}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
