"use client";

import React from "react";
import { Star, Award, Gift, Users } from "lucide-react";
import { soundFX } from "@/utils/sound";

export default function NexoraRewardsPillars() {
  const pillars = [
    {
      icon: Star,
      title: "LapMart Rewards",
      desc: "Earn points & unlock exclusive benefits.",
      accent: "from-amber-400 to-rose-500"
    },
    {
      icon: Award,
      title: "Creator Picks",
      desc: "Handpicked favorites from top tech creators.",
      accent: "from-purple-400 to-indigo-500"
    },
    {
      icon: Gift,
      title: "Gift Vouchers",
      desc: "The perfect gift for every tech enthusiast.",
      accent: "from-cyan-400 to-blue-500"
    },
    {
      icon: Users,
      title: "Refer & Earn",
      desc: "Invite friends and earn hardware credits.",
      accent: "from-emerald-400 to-teal-500"
    }
  ];

  return (
    <section className="py-6 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Deep Indigo/Navy Capsule Container (Exact Reference UI) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0C1033] via-[#141B4D] to-[#0C1033] border border-white/15 p-6 sm:p-8 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {pillars.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                onClick={() => soundFX.pop()}
                className={`flex items-center gap-4 cursor-pointer group transition-all duration-200 hover:scale-[1.02] ${
                  idx > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""
                }`}
              >
                {/* Glowing Rounded Badge */}
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.accent} p-[1.5px] shadow-lg shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <div className="w-full h-full bg-[#0E1338] rounded-[14px] flex items-center justify-center text-white">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Text Content */}
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 font-normal leading-snug mt-0.5">
                    {item.desc}
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
