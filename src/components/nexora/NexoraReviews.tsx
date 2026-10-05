"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ChevronRight,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  Play,
  Sparkles,
  ShieldCheck,
  MapPin,
  Cpu,
  Flame,
  Award,
  Filter,
  X,
  Send,
  Video,
  ExternalLink,
  Check
} from "lucide-react";
import { soundFX } from "@/utils/sound";
import confetti from "canvas-confetti";
import PriceTag from "@/components/PriceTag";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  SRI_LANKA_TECH_REVIEWS,
  TECH_COMMUNITY_STATS,
  TechReview
} from "@/data/tech-reviews-data";

type FilterCategory = "all" | "creators" | "engineers" | "gamers" | "artists";

export default function NexoraReviews() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [selectedReview, setSelectedReview] = useState<TechReview | null>(null);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});

  // Review submission modal state
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    branch: "Kandy CyberHub Flagship",
    laptop: "Acer Nitro 16 AI Edition",
    role: "Tech Enthusiast",
    rating: 5,
    comment: ""
  });

  // Filter reviews
  const filteredReviews = useMemo(() => {
    if (activeCategory === "all") return SRI_LANKA_TECH_REVIEWS;
    return SRI_LANKA_TECH_REVIEWS.filter((r) => r.category === activeCategory);
  }, [activeCategory]);

  const handleHelpfulClick = (reviewId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFX.click();

    if (userVoted[reviewId]) {
      // Toggle off
      setUserVoted((prev) => ({ ...prev, [reviewId]: false }));
      setHelpfulVotes((prev) => ({
        ...prev,
        [reviewId]: (prev[reviewId] || 0) - 1
      }));
    } else {
      // Toggle on
      setUserVoted((prev) => ({ ...prev, [reviewId]: true }));
      setHelpfulVotes((prev) => ({
        ...prev,
        [reviewId]: (prev[reviewId] || 0) + 1
      }));
      soundFX.pop();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.success();
    setSubmitSuccess(true);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ff5a5f", "#3b82f6", "#10b981", "#f59e0b"]
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitModalOpen(false);
      setFormData({
        name: "",
        branch: "Kandy CyberHub Flagship",
        laptop: "Acer Nitro 16 AI Edition",
        role: "Tech Enthusiast",
        rating: 5,
        comment: ""
      });
    }, 2200);
  };

  return (
    <section id="creators" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-8">
      {/* 1. Header & Trust Stats Banner */}
      <ScrollReveal animation="fade-up" duration={600}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/50 text-xs font-extrabold uppercase tracking-wider mb-2.5">
              <span>🇱🇰</span>
              <span>Sri Lanka&apos;s Tech Community Verdict</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              What Shoppers &amp; Tech Critics Say
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Real thermal benchmark verdicts, coding reliability reports, and unboxing audits from Sri Lanka&apos;s top YouTubers, software engineers, and pro gamers.
            </p>
          </div>

          {/* Action links */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                soundFX.click();
                setIsSubmitModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-400 shadow-xs transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <Send className="w-3.5 h-3.5 text-rose-500" />
              <span>Submit Tech Review</span>
            </button>

            <Link
              href="/shop"
              onClick={() => soundFX.click()}
              className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-500/20 transition-all cursor-pointer flex items-center gap-1 active:scale-95"
            >
              <span>Explore Tested Rigs</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Aggregate Credibility Highlight Pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="bg-white dark:bg-[#0E1338]/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">
                {TECH_COMMUNITY_STATS.averageRating} / 5.0
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {TECH_COMMUNITY_STATS.totalReviews.toLocaleString()}+ Verified Sri Lankan Orders
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E1338]/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">
                {TECH_COMMUNITY_STATS.zeroDeadPixelPassRate}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Zero Dead-Pixel Lab Pass
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E1338]/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">
                {TECH_COMMUNITY_STATS.islandwideBranches} Showrooms
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Islandwide Tech Centers
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E1338]/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/40 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">
                {TECH_COMMUNITY_STATS.recommendationRate}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Tech Reviewer Approval
              </div>
            </div>
          </div>
        </div>

        {/* 2. Persona / Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
          {[
            { id: "all", label: "All Tech Reviews", count: SRI_LANKA_TECH_REVIEWS.length },
            { id: "creators", label: "Tech Creators & YouTubers", count: 2 },
            { id: "engineers", label: "Software Engineers & Devs", count: 2 },
            { id: "gamers", label: "Esports Pro Gamers", count: 1 },
            { id: "artists", label: "3D & Creative Artists", count: 1 }
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundFX.click();
                  setActiveCategory(cat.id as FilterCategory);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-slate-900 dark:bg-rose-600 text-white shadow-md scale-102"
                    : "bg-white dark:bg-[#0E1338] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-extrabold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* 3. Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReviews.map((rev, idx) => {
          const isVoted = userVoted[rev.id] || false;
          const currentHelpful = rev.helpfulCount + (helpfulVotes[rev.id] || 0);

          return (
            <ScrollReveal
              key={rev.id}
              animation="fade-up"
              delay={idx * 80}
              duration={600}
              className="h-full"
            >
              <div
                onClick={() => {
                  soundFX.click();
                  setSelectedReview(rev);
                }}
                className="bg-white dark:bg-[#0E1338]/90 rounded-3xl p-5 border border-slate-200/90 dark:border-white/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:border-rose-400/80 dark:hover:border-rose-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer text-left relative overflow-hidden"
              >
                <div>
                  {/* Top Bar: Reviewer Avatar, Name, Verified Tag */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/80 dark:border-white/10">
                        <Image
                          src={rev.avatar}
                          alt={rev.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                            {rev.name}
                          </h4>
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {rev.role}
                        </p>
                      </div>
                    </div>

                    {/* Showroom tag */}
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold border border-slate-200/60 dark:border-white/10 shrink-0">
                      {rev.branch}
                    </span>
                  </div>

                  {/* Rating Stars & Verified Tag */}
                  <div className="flex items-center justify-between my-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>

                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                      ✓ {rev.verifiedTag}
                    </span>
                  </div>

                  {/* Benchmark & Thermal Badge */}
                  <div className="my-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-white/5 text-[11px] font-mono font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <span className="truncate">{rev.benchmarkBadge}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    &ldquo;{rev.shortReview}&rdquo;
                  </p>

                  {/* Technical Metrics Chips */}
                  <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-white/5">
                    {rev.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="bg-slate-50 dark:bg-slate-900/60 p-1.5 rounded-lg text-center"
                      >
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 block truncate">
                          {metric.label}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Tested Machine Link & Helpful Upvote */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                  <Link
                    href={`/product/${rev.productSlug}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFX.click();
                    }}
                    className="flex items-center gap-2 group/link truncate"
                  >
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-white/10">
                      <Image
                        src={rev.productImage}
                        alt=""
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] text-slate-400 block font-mono">
                        Tested Machine:
                      </span>
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 group-hover/link:text-rose-600 dark:group-hover/link:text-rose-400 transition-colors truncate block">
                        {rev.productName}
                      </span>
                    </div>
                  </Link>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {rev.hasVideoTeaser && (
                      <span
                        className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/40"
                        title="Unboxing / Benchmark Video Available"
                      >
                        <Video className="w-3.5 h-3.5" />
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => handleHelpfulClick(rev.id, e)}
                      className={`px-2 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                        isVoted
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                      title="Helpful Review"
                    >
                      <ThumbsUp className={`w-3 h-3 ${isVoted ? "fill-white" : ""}`} />
                      <span>{currentHelpful}</span>
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* 4. MODAL: In-Depth Tech Review & Benchmark Breakdown */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#0E1338] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-white/10 text-left space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Reviewer Header */}
            <div className="flex items-start gap-4">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-white/10">
                <Image
                  src={selectedReview.avatar}
                  alt={selectedReview.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {selectedReview.name}
                  </h3>
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  {selectedReview.handle && (
                    <span className="text-xs font-mono text-slate-400">
                      {selectedReview.handle}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedReview.role}
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                    ✓ {selectedReview.verifiedTag}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Showroom: {selectedReview.branch} • {selectedReview.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Star Rating & Benchmark Highlight */}
            <div className="bg-slate-50 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/80 dark:border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(selectedReview.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                  <span className="ml-1 text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
                    5.0 / 5.0
                  </span>
                </div>

                <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-200/60 dark:border-rose-900/40">
                  Verified Lab Quality Pass
                </span>
              </div>

              <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                {selectedReview.benchmarkBadge}
              </div>
            </div>

            {/* Full Review Text */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Complete Technical Assessment:
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {selectedReview.fullReview}
              </p>
            </div>

            {/* Hardware Metrics Grid */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Performance Diagnostics:
              </h4>
              <div className="grid grid-cols-3 gap-2.5">
                {selectedReview.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-white/5 text-center"
                  >
                    <span className="text-[10px] text-slate-400 block truncate">
                      {m.label}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-black text-rose-600 dark:text-rose-400">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Machine Card & CTA */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 truncate">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/10 shrink-0 p-1">
                  <Image
                    src={selectedReview.productImage}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="truncate">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase block">
                    Audited Rig (SKU: {selectedReview.productSku})
                  </span>
                  <div className="text-xs font-bold text-white truncate">
                    {selectedReview.productName}
                  </div>
                  <div className="text-xs font-mono font-black text-amber-400 mt-0.5">
                    <PriceTag amount={selectedReview.productPrice} />
                  </div>
                </div>
              </div>

              <Link
                href={`/product/${selectedReview.productSlug}`}
                onClick={() => {
                  soundFX.click();
                  setSelectedReview(null);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>View Full Page &amp; VIP Pack</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL: Submit Tech Review */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0E1338] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-white/10 text-left space-y-4">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/40 text-[10px] font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" />
                <span>Sri Lanka Tech Community</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Submit Your Tech Review &amp; Benchmark
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Share your real thermals, FPS benchmarks, or showroom collection experience with fellow Lankan tech enthusiasts.
              </p>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Review Submitted Successfully!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  Thank you! Your verified hardware benchmark report is being verified by the LapMart Diagnostics Lab team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Your Name / YouTube Channel Handle
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ruwan Silva / @LankaTechDiary"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Showroom Branch
                    </label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                    >
                      <option value="Kandy CyberHub Flagship">Kandy Flagship</option>
                      <option value="Unity Plaza Bambalapitiya">Unity Plaza Bambalapitiya</option>
                      <option value="Kurunegala Tech Store">Kurunegala Tech Hub</option>
                      <option value="Anuradhapura Tech Counter">Anuradhapura Tech Counter</option>
                      <option value="Borella Cyber Center">Borella Cyber Center</option>
                      <option value="Polonnaruwa Branch">Polonnaruwa Branch</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Your Primary Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                    >
                      <option value="Tech Reviewer / Creator">Tech Reviewer / Creator</option>
                      <option value="Software Engineer / Dev">Software Engineer / Dev</option>
                      <option value="Esports / Pro Gamer">Esports / Pro Gamer</option>
                      <option value="3D Animator / Video Editor">3D Animator / Video Editor</option>
                      <option value="University Student">University Student</option>
                      <option value="Verified Buyer">Verified Buyer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => {
                          soundFX.click();
                          setFormData({ ...formData, rating: s });
                        }}
                        className="p-1 cursor-pointer hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            s <= formData.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-300 dark:text-slate-700"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 font-mono font-bold text-slate-800 dark:text-slate-200">
                      {formData.rating} Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Your In-Depth Review &amp; Benchmark Notes
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Mention thermals, battery life, unboxing condition, Cinebench / FPS stats, or branch service quality..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-lg shadow-rose-500/25 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Community Tech Review</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

