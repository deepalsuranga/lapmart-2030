"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Users,
  Shield,
  Activity,
  ArrowRight,
  RefreshCw,
  Clock,
  Sparkles,
  Layers,
  MapPin,
  Cpu,
  TrendingUp,
  DollarSign,
  Store
} from "lucide-react";
import { CustomerChatProfile } from "@/app/api/system/chats/route";
import { DailySalesSummary } from "@/types/sales";

export default function SystemDashboardPage() {
  const [customers, setCustomers] = useState<CustomerChatProfile[]>([]);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalMessages: 0,
    languages: { en: 0, si: 0, ta: 0 } as Record<string, number>
  });
  const [salesSummary, setSalesSummary] = useState<DailySalesSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const [chatRes, salesRes] = await Promise.all([
        fetch("/api/system/chats"),
        fetch("/api/system/sales")
      ]);

      if (chatRes.ok) {
        const data = await chatRes.json();
        setCustomers(data.customers || []);
        if (data.stats) {
          setStats(data.stats);
        }
      }

      if (salesRes.ok) {
        const salesData = await salesRes.json();
        setSalesSummary(salesData.summary);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex-1 p-6 lg:p-8 max-w-[1700px] mx-auto w-full space-y-8 overflow-y-auto bg-slate-100/60 dark:bg-[#060810] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>LapMart 2030 Unified Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Owner Operations & Realtime Telemetry
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Real-time monitoring of POS showroom sales across Sri Lanka, automated live incoming invoices, and customer AI chat memory profiles.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/system/sales"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm font-mono shadow-[0_0_25px_rgba(16,185,129,0.3)] flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Branch Sales (Live)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
            </Link>

            <Link
              href="/system/chat"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white dark:text-slate-950 font-bold text-xs sm:text-sm font-mono shadow-[0_0_25px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Customer Chats</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Live Branch Sales Spotlight Banner */}
      {salesSummary && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/30 border border-emerald-500/30 shadow-lg relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-wider">
                  TODAY'S BRANCH NETWORK TURNOVER (LIVE)
                </span>
                <span className="text-xs text-slate-400 font-mono">• 7 Showrooms Active</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
                Rs. {salesSummary.totalRevenue.toLocaleString()}{" "}
                <span className="text-sm font-normal text-emerald-400">LKR</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {salesSummary.totalInvoices} invoices generated today • {salesSummary.totalLaptopsSold} laptops dispatched • Top Showroom:{" "}
                <strong className="text-white">{salesSummary.branches[0]?.branchName}</strong>
              </p>
            </div>

            <Link
              href="/system/sales"
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm font-mono flex items-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.35)] shrink-0 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Store className="w-4 h-4 text-slate-950" />
              <span>Open Sales Telemetry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Total Customers */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">Total Customers</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">{stats.totalCustomers}</div>
            <p className="text-[11px] text-slate-500 font-mono mt-1">
              Active memory profiles in system
            </p>
          </div>
        </div>

        {/* Card 2: Total Chat Messages */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">Messages Exchanged</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">{stats.totalMessages}</div>
            <p className="text-[11px] text-slate-500 font-mono mt-1">
              Recorded in customer markdown logs
            </p>
          </div>
        </div>

        {/* Card 3: Language Diversity */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">Languages Used</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-700 dark:text-purple-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 font-mono text-xs text-slate-700 dark:text-slate-300">
            <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">
              SI: {stats.languages.si || 0}
            </span>
            <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">
              EN: {stats.languages.en || 0}
            </span>
            <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">
              TA: {stats.languages.ta || 0}
            </span>
          </div>
        </div>

        {/* Card 4: Islandwide Showrooms */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">Physical Showrooms</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">7 Hubs</div>
            <p className="text-[11px] text-slate-500 font-mono mt-1">
              Colombo, Kandy, Anuradhapura, Kurunegala
            </p>
          </div>
        </div>
      </div>

      {/* Customer Inquiries Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-wide">
              Recent Customer Inquiries
            </h2>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Direct access to live conversation logs
            </p>
          </div>

          <Link
            href="/system/chat"
            className="text-xs font-mono text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 flex items-center gap-1 transition-colors font-semibold"
          >
            <span>View All in Chat Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Phone Number</th>
                <th className="py-3.5 px-6">Language</th>
                <th className="py-3.5 px-6">Messages</th>
                <th className="py-3.5 px-6">Latest Interaction</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    Loading inquiries...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No customer records found.
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.phone} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-slate-200">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-cyan-700 dark:text-cyan-300 font-bold text-xs">
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <span>{c.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400 font-semibold">{c.phone}</td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 text-[10px] uppercase font-bold">
                        {c.language}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-cyan-700 dark:text-cyan-400 font-bold">{c.messages.length}</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400 truncate max-w-xs font-sans">
                      {c.latestMessage ? c.latestMessage.text.substring(0, 50) + "..." : "Initialized"}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href="/system/chat"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30 transition-all text-[11px] font-semibold"
                      >
                        <span>Open Chat</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
