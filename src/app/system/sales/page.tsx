"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  TrendingUp,
  DollarSign,
  Receipt,
  Store,
  Laptop,
  Sparkles,
  RefreshCw,
  Play,
  Pause,
  Zap,
  Volume2,
  VolumeX,
  Filter,
  Eye,
  Printer,
  X,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  Building2,
  User,
  ShoppingBag,
  SlidersHorizontal,
  ChevronRight,
  Award
} from "lucide-react";
import { BranchInvoice, DailySalesSummary, BranchSalesStats } from "@/types/sales";
import { soundFX } from "@/utils/sound";

export default function BranchWiseSalesPage() {
  const [summary, setSummary] = useState<DailySalesSummary | null>(null);
  const [invoices, setInvoices] = useState<BranchInvoice[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>("all");
  const [selectedPaymentFilter, setSelectedPaymentFilter] = useState<string>("all");
  const [isAutoSimulating, setIsAutoSimulating] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(6); // seconds
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedInvoice, setSelectedInvoice] = useState<BranchInvoice | null>(null);
  const [recentFlashBranchId, setRecentFlashBranchId] = useState<string | null>(null);
  const [newInvoiceToast, setNewInvoiceToast] = useState<BranchInvoice | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoTickerRef = useRef<NodeJS.Timeout | null>(null);

  // Load initial sales data
  const loadSalesData = async () => {
    try {
      const res = await fetch("/api/system/sales");
      if (res.ok) {
        const data = await res.json();
        setSummary(data.summary);
        setInvoices(data.invoices || []);
      }
    } catch (err) {
      console.error("Failed to load branch sales data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSalesData();
  }, []);

  // Trigger a new random automated invoice
  const triggerNewInvoice = async (targetBranchId?: string) => {
    try {
      const res = await fetch("/api/system/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate_random",
          branchId: targetBranchId && targetBranchId !== "all" ? targetBranchId : undefined
        })
      });

      if (res.ok) {
        const data = await res.json();
        const newInv: BranchInvoice = data.newInvoice;
        setSummary(data.summary);
        setInvoices((prev) => [newInv, ...prev.slice(0, 49)]);

        // Flash target branch
        setRecentFlashBranchId(newInv.branchId);
        setTimeout(() => setRecentFlashBranchId(null), 2500);

        // Toast notification
        setNewInvoiceToast(newInv);
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        toastTimerRef.current = setTimeout(() => setNewInvoiceToast(null), 4000);

        // Sound effect
        if (soundEnabled) {
          soundFX.success();
        }
      }
    } catch (err) {
      console.error("Failed to generate simulated invoice:", err);
    }
  };

  // Auto-simulation interval ticker
  useEffect(() => {
    if (!isAutoSimulating) {
      if (autoTickerRef.current) clearInterval(autoTickerRef.current);
      return;
    }

    autoTickerRef.current = setInterval(() => {
      triggerNewInvoice();
    }, simulationSpeed * 1000);

    return () => {
      if (autoTickerRef.current) clearInterval(autoTickerRef.current);
    };
  }, [isAutoSimulating, simulationSpeed, soundEnabled]);

  // Filter invoices for display
  const filteredInvoices = invoices.filter((inv) => {
    const matchesBranch = selectedBranchId === "all" || inv.branchId === selectedBranchId;
    const matchesPayment =
      selectedPaymentFilter === "all" || inv.paymentMethod.toLowerCase().includes(selectedPaymentFilter.toLowerCase());
    return matchesBranch && matchesPayment;
  });

  return (
    <main className="flex-1 p-3 sm:p-5 lg:p-6 max-w-[1750px] mx-auto w-full space-y-4 sm:space-y-5 overflow-y-auto bg-slate-100/70 dark:bg-[#060810] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* ================= 1. COMPACT HEADER & LIVE TICKER CONTROLS ================= */}
      <div className="relative rounded-2xl bg-white/90 dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 border border-slate-200/90 dark:border-slate-800 py-3 px-4 sm:py-3.5 sm:px-6 overflow-hidden shadow-xs backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-500/10 via-cyan-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[11px] font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>LIVE TELEMETRY</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-[11px] font-mono font-semibold">
                <ShieldCheck className="w-3 h-3" />
                <span>SUPER ADMIN & OWNER ACCESS ONLY</span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {summary?.date || "Today"}
              </span>
            </div>

            <h1 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              Branch-Wise Realtime Sales Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-1 max-w-3xl leading-normal">
              Real-time monitoring of POS invoice generation across all 7 physical showrooms in Sri Lanka. Automated live incoming invoices update branch leaderboards automatically.
            </p>
          </div>

          {/* Compact Automation & Control Bar */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/90 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0">
            {/* Auto Simulation Toggle */}
            <button
              onClick={() => setIsAutoSimulating(!isAutoSimulating)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                isAutoSimulating
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900"
              }`}
            >
              {isAutoSimulating ? (
                <>
                  <Pause className="w-3 h-3" />
                  <span>Auto-Pulse: ON ({simulationSpeed}s)</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3" />
                  <span>Auto-Pulse: PAUSED</span>
                </>
              )}
            </button>

            {/* Speed Selector */}
            {isAutoSimulating && (
              <div className="flex items-center gap-0.5 bg-white dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] font-mono">
                <button
                  onClick={() => setSimulationSpeed(3)}
                  className={`px-1.5 py-0.5 rounded ${
                    simulationSpeed === 3
                      ? "bg-cyan-500 text-black font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-white"
                  }`}
                >
                  3s
                </button>
                <button
                  onClick={() => setSimulationSpeed(6)}
                  className={`px-1.5 py-0.5 rounded ${
                    simulationSpeed === 6
                      ? "bg-cyan-500 text-black font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-white"
                  }`}
                >
                  6s
                </button>
                <button
                  onClick={() => setSimulationSpeed(10)}
                  className={`px-1.5 py-0.5 rounded ${
                    simulationSpeed === 10
                      ? "bg-cyan-500 text-black font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-white"
                  }`}
                >
                  10s
                </button>
              </div>
            )}

            {/* Instant Random Invoice Trigger */}
            <button
              onClick={() => triggerNewInvoice(selectedBranchId !== "all" ? selectedBranchId : undefined)}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs font-mono shadow-[0_0_15px_rgba(245,158,11,0.25)] flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              title="Immediately generate a live invoice"
            >
              <Zap className="w-3 h-3 text-slate-950" />
              <span>Instant Invoice</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                soundEnabled
                  ? "bg-cyan-50 dark:bg-cyan-500/15 border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300"
                  : "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-500"
              }`}
              title={soundEnabled ? "Mute Cash Register Sound" : "Enable Sound FX"}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= 2. LIVE INCOMING INVOICE TOAST ================= */}
      {newInvoiceToast && (
        <div className="relative rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white p-4 shadow-[0_10px_40px_rgba(16,185,129,0.35)] flex items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300 border border-emerald-400/30">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Receipt className="w-5 h-5 text-white animate-bounce" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="font-extrabold tracking-wider">{newInvoiceToast.invoiceNumber}</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  {newInvoiceToast.branchName}
                </span>
                <span className="text-emerald-100 text-[11px]">• {newInvoiceToast.timeFormatted}</span>
              </div>
              <div className="text-sm font-bold truncate mt-0.5">
                {newInvoiceToast.customerName} ({newInvoiceToast.customerCity}) purchased{" "}
                <span className="underline decoration-emerald-300 font-extrabold">{newInvoiceToast.items[0]?.name}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-xs text-emerald-100 font-mono">Total Paid</div>
              <div className="text-base sm:text-lg font-black font-mono">
                Rs. {newInvoiceToast.totalAmount.toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => setSelectedInvoice(newInvoiceToast)}
              className="px-3 py-1.5 rounded-xl bg-white text-emerald-950 font-bold text-xs hover:bg-emerald-50 transition-colors cursor-pointer shadow-xs"
            >
              View Slip
            </button>
            <button
              onClick={() => setNewInvoiceToast(null)}
              className="p-1 text-white/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= 3. TOP LEVEL METRIC CARDS (ROLL-UP STATS) ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Today's Network Revenue */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-bold tracking-wider">
              Today's Network Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl xl:text-4xl font-black text-slate-950 dark:text-white font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
              Rs. {summary?.totalRevenue.toLocaleString() || "0"}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs font-mono">
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 font-bold">
                <ArrowUpRight className="w-3.5 h-3.5" />
                Target: Rs. {summary?.targetRevenue ? (summary.targetRevenue / 1000000).toFixed(1) + "M" : "0"}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">
                {summary && summary.targetRevenue > 0
                  ? `${Math.round((summary.totalRevenue / summary.targetRevenue) * 100)}% of goal`
                  : "0%"}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Today's Invoices Generated */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-bold tracking-wider">
              Total Invoices Issued
            </span>
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl xl:text-4xl font-black text-slate-950 dark:text-white font-mono">
              {summary?.totalInvoices || 0} Invoices
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span>Avg Basket:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Rs. {summary?.averageOrderValue.toLocaleString() || "0"}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Laptops & Units Sold */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-bold tracking-wider">
              Units Dispatched Today
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Laptop className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl xl:text-4xl font-black text-slate-950 dark:text-white font-mono text-amber-600 dark:text-amber-400">
              {summary?.totalLaptopsSold || 0} Laptops
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span>+ {summary?.totalAccessoriesSold || 0} Peripherals</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-600 font-semibold">100% Passed 45-Pt Lab</span>
            </div>
          </div>
        </div>

        {/* Card 4: Top Performing Showroom */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between group hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-bold tracking-wider">
              Leaderboard #1 Showroom
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-lg sm:text-xl font-black text-slate-950 dark:text-white truncate">
              {summary?.branches[0]?.branchName || "Kandy CyberHub"}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs font-mono">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                Rs. {summary?.branches[0]?.currentRevenue.toLocaleString() || "0"}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">
                {summary?.branches[0]?.invoiceCount || 0} invoices
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 4. BRANCH-WISE REALTIME PERFORMANCE GRID ================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white flex items-center gap-2">
              <Store className="w-5 h-5 text-amber-500" />
              <span>Showroom Telemetry (7 Physical Branches)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              Click any showroom card to isolate and filter its live incoming invoice stream below
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            {selectedBranchId !== "all" && (
              <button
                onClick={() => setSelectedBranchId("all")}
                className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 cursor-pointer"
              >
                Clear Filter (Showing All)
              </button>
            )}
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
              ● All 7 Hubs Connected
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          {summary?.branches.map((branch) => {
            const isSelected = selectedBranchId === branch.branchId;
            const isFlashing = recentFlashBranchId === branch.branchId;
            const targetPct = Math.min(
              100,
              Math.round((branch.currentRevenue / branch.targetRevenue) * 100)
            );

            return (
              <div
                key={branch.branchId}
                onClick={() => setSelectedBranchId(isSelected ? "all" : branch.branchId)}
                className={`p-5 rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? "bg-cyan-50/90 dark:bg-cyan-950/40 border-cyan-500 dark:border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)] ring-2 ring-cyan-500/30"
                    : "bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md"
                } ${isFlashing ? "ring-4 ring-emerald-500 animate-pulse bg-emerald-50/50 dark:bg-emerald-950/40" : ""}`}
              >
                {/* Flashing glow on live transaction */}
                {isFlashing && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold animate-ping">
                    SALE!
                  </div>
                )}

                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold flex items-center justify-center text-slate-700 dark:text-slate-300">
                        #{branch.rank}
                      </span>
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">
                        {branch.branchCity}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mt-0.5">
                      {branch.isFlagship ? "Flagship CyberHub" : "Regional Showroom"}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                    {targetPct}% Goal
                  </span>
                </div>

                {/* Branch Revenue */}
                <div className="space-y-1 mb-3">
                  <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                    Rs. {branch.currentRevenue.toLocaleString()}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>Target: Rs. {(branch.targetRevenue / 1000).toLocaleString()}k</span>
                    <span>{branch.invoiceCount} invoices</span>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-1.5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        targetPct >= 80
                          ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                          : targetPct >= 40
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                          : "bg-gradient-to-r from-amber-500 to-orange-500"
                      }`}
                      style={{ width: `${targetPct}%` }}
                    />
                  </div>
                </div>

                {/* Sub metrics */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Laptops Sold:</span>
                    <strong className="text-slate-900 dark:text-white font-bold">{branch.laptopsSold} units</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Last Sale:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold truncate block">
                      {branch.lastInvoiceAt || "Awaiting"}
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  🏆 Top: <span className="font-semibold text-slate-700 dark:text-slate-300">{branch.topProduct}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= 5. HOURLY SALES CURVE & CATEGORY BREAKDOWN ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Hourly Distribution Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-500" />
                <span>Today's Hourly Sales Velocity</span>
              </h3>
              <p className="text-xs text-slate-500 font-mono">Revenue generated per hour across all 7 branches</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
              Peak Hours: 11:00 AM – 04:00 PM
            </span>
          </div>

          {/* Interactive SVG Bar Visualization */}
          <div className="h-56 w-full flex items-end gap-2 sm:gap-3 pt-6 pb-2 px-2 overflow-x-auto no-scrollbar">
            {summary?.hourlyDistribution.map((slot) => {
              const maxSlot = Math.max(...(summary?.hourlyDistribution.map((s) => s.amount) || [1]));
              const heightPct = maxSlot > 0 ? Math.max(12, Math.round((slot.amount / maxSlot) * 100)) : 10;

              return (
                <div key={slot.hour} className="flex-1 min-w-[42px] flex flex-col items-center gap-2 group h-full justify-end">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-center bg-slate-900 text-white px-2 py-1 rounded-md pointer-events-none whitespace-nowrap shadow-md">
                    Rs. {(slot.amount / 1000).toFixed(0)}k ({slot.count} inv)
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden h-36 flex items-end">
                    <div
                      className="w-full rounded-t-xl bg-gradient-to-t from-cyan-600 via-cyan-500 to-teal-400 group-hover:from-emerald-500 group-hover:to-teal-300 transition-all duration-500"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>

                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {slot.hour}:00
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              <span>Category Share</span>
            </h3>
            <p className="text-xs text-slate-500 font-mono">Sales share by hardware classification</p>
          </div>

          <div className="space-y-3 pt-2">
            {summary?.categoryBreakdown.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{cat.category}</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    Rs. {(cat.amount / 1000).toLocaleString()}k ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 6. LIVE REALTIME INVOICE STREAM FEED ================= */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Live Transaction Stream (Real-Time Invoices)
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Showing {filteredInvoices.length} transactions across Sri Lanka. Updated in real-time.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Branch Filter dropdown */}
            <select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <option value="all">All Showrooms (7 Branches)</option>
              {summary?.branches.map((b) => (
                <option key={b.branchId} value={b.branchId}>
                  {b.branchName}
                </option>
              ))}
            </select>

            {/* Payment Method filter */}
            <select
              value={selectedPaymentFilter}
              onChange={(e) => setSelectedPaymentFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <option value="all">All Payment Methods</option>
              <option value="Visa">Visa / Mastercard</option>
              <option value="Koko">Koko 0% Installment</option>
              <option value="Mintpay">Mintpay 0% Installment</option>
              <option value="Cash">Cash on Counter</option>
              <option value="Bank">Bank Transfer</option>
            </select>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 dark:bg-slate-950/90 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Branch Showroom</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Purchased Product</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4 text-right">Amount (LKR)</th>
                <th className="py-3 px-4 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900/40">
              {filteredInvoices.map((inv, idx) => (
                <tr
                  key={inv.id}
                  className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors ${
                    idx === 0 ? "bg-emerald-50/30 dark:bg-emerald-950/20 font-semibold" : ""
                  }`}
                >
                  <td className="py-3 px-4 text-slate-900 dark:text-white font-bold">
                    <span className="flex items-center gap-1.5">
                      {idx === 0 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />}
                      {inv.invoiceNumber}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {inv.timeFormatted}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                      {inv.branchName}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-sans">
                    <div className="font-bold">{inv.customerName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{inv.customerCity}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-sans max-w-xs truncate">
                    <div className="font-bold truncate">{inv.items[0]?.name}</div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                      + FREE 6-Pc VIP Gift Pack
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30 text-[10px]">
                      {inv.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-950 dark:text-white text-sm">
                    Rs. {inv.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-all cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= 7. PRINTABLE THERMAL POS INVOICE MODAL ================= */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  Official POS Tax Invoice
                </h3>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Thermal POS Invoice Body */}
            <div className="py-4 space-y-4 font-mono text-xs text-slate-800 dark:text-slate-200">
              {/* Brand Header */}
              <div className="text-center space-y-1">
                <div className="text-lg font-black tracking-widest text-slate-950 dark:text-white">
                  LAPMART 2030
                </div>
                <div className="text-[11px] text-slate-500">Official Computer Distribution Network</div>
                <div className="text-[10px] text-slate-500 font-sans">
                  {selectedInvoice.branchName} • Hotline: 071 059 5548
                </div>
              </div>

              <div className="border-t border-dashed border-slate-300 dark:border-slate-700 my-2" />

              {/* Invoice Meta */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Invoice #:</span>
                  <strong className="font-bold text-slate-900 dark:text-white">{selectedInvoice.invoiceNumber}</strong>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">Date & Time:</span>
                  <span>{selectedInvoice.timeFormatted}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Customer:</span>
                  <strong className="text-slate-900 dark:text-white">{selectedInvoice.customerName}</strong>
                  <div className="text-[10px] text-slate-500">{selectedInvoice.customerPhone}</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">Cashier:</span>
                  <span>{selectedInvoice.cashierName} ({selectedInvoice.cashierId})</span>
                </div>
              </div>

              <div className="border-t border-dashed border-slate-300 dark:border-slate-700 my-2" />

              {/* Line Items */}
              <div className="space-y-2">
                <div className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Itemized Details:</div>
                {selectedInvoice.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="font-bold text-slate-900 dark:text-white">{item.name}</div>
                      <div className="text-[10px] text-slate-500">
                        SKU: {item.sku} • Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="text-right font-bold text-slate-900 dark:text-white shrink-0">
                      {item.price > 0 ? `Rs. ${(item.price * item.quantity).toLocaleString()}` : "FREE (0.00)"}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-slate-300 dark:border-slate-700 my-2" />

              {/* Total Summary */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-sm font-black text-slate-950 dark:text-white">
                  <span>NET TOTAL:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Rs. {selectedInvoice.totalAmount.toLocaleString()} LKR
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Payment Mode:</span>
                  <span>{selectedInvoice.paymentMethod}</span>
                </div>
              </div>

              <div className="border-t border-dashed border-slate-300 dark:border-slate-700 my-2" />

              {/* Warranty & Certification Footnote */}
              <div className="space-y-1 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px]">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Hardware Diagnostics Lab Certified</span>
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  Cert No: <strong>{selectedInvoice.diagnosticsCertNumber}</strong>
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  Warranty: <strong>{selectedInvoice.warrantyPeriod}</strong>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
