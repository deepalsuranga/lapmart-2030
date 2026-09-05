"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronRight, CheckCircle2 } from "lucide-react";
import { soundFX } from "@/utils/sound";

export default function NexoraReviews() {
  const reviews = [
    {
      id: 1,
      name: "Jessica M.",
      location: "Colombo 07",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      thumb: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      text: "Amazing quality and super fast delivery! LapMart 2030 is now my go-to store for all creative & video gear."
    },
    {
      id: 2,
      name: "Daniel K.",
      location: "Kandy City",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      thumb: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      text: "Love the wide variety and the verified 45-point testing report. Received my ROG rig within 24 hours!"
    },
    {
      id: 3,
      name: "Priya S.",
      location: "Bambalapitiya",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      thumb: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      text: "The deals are unbeatable and physical showroom support at Unity Plaza is genuinely phenomenal."
    }
  ];

  return (
    <section id="creators" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            What Shoppers Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real feedback from verified buyers across 7 Sri Lankan branches
          </p>
        </div>

        <Link
          href="/shop"
          onClick={() => soundFX.click()}
          className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
        >
          View All Reviews
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3 Review Cards Grid (Exact Layout from Screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            onMouseEnter={() => soundFX.tick()}
            className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-start gap-4"
          >
            {/* Left Thumbnail / Product Badge */}
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80">
              <Image
                src={rev.thumb}
                alt={rev.name}
                fill
                className="object-cover p-1"
              />
            </div>

            {/* Right Review Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-slate-900">{rev.name}</h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{rev.location}</span>
              </div>

              {/* 5 Gold Stars */}
              <div className="flex items-center gap-0.5 my-1.5">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                &ldquo;{rev.text}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
