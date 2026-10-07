"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MessageSquare,
  LayoutDashboard,
  LogOut,
  ExternalLink,
  Shield,
  Laptop,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Sun,
  Moon,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { SystemThemeProvider, useSystemTheme } from "@/context/SystemThemeContext";

function SystemLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useSystemTheme();

  const [isVerifying, setIsVerifying] = useState(true);
  const [adminUser, setAdminUser] = useState<{ email: string; name: string; role: string } | null>(null);
  const [chatCount, setChatCount] = useState<number>(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Client-side verification
  useEffect(() => {
    let isMounted = true;
    async function verifyAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
          return;
        }
        const data = await res.json();
        if (isMounted) {
          setAdminUser(data.user);
          setIsVerifying(false);
        }
      } catch {
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      }
    }
    verifyAuth();

    // Fetch chat count badge
    async function loadStats() {
      try {
        const res = await fetch("/api/system/chats");
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setChatCount(data.customers?.length || 0);
          }
        }
      } catch {}
    }
    loadStats();

    const interval = setInterval(loadStats, 6000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [pathname, router]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    router.replace("/login");
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070913] flex flex-col items-center justify-center text-slate-800 dark:text-slate-100 font-mono transition-colors duration-200">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 animate-ping" />
          <div className="relative w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)]">
            <Shield className="w-8 h-8 text-cyan-600 dark:text-cyan-400 animate-pulse" />
          </div>
        </div>
        <p className="text-sm font-semibold tracking-wider text-slate-700 dark:text-slate-300">
          VERIFYING LAPMART SECURITY PROTOCOL...
        </p>
        <span className="text-xs text-cyan-600 dark:text-cyan-400 mt-1">Authorized Access Only</span>
      </div>
    );
  }

  const isChatActive = pathname === "/system/chat" || pathname.startsWith("/system/chat/");
  const isDashboardActive = pathname === "/system";
  const isSalesActive = pathname === "/system/sales";

  return (
    <div className="h-screen w-screen bg-slate-100/70 dark:bg-[#060810] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row overflow-hidden font-sans transition-colors duration-200 selection:bg-cyan-500 selection:text-black">
      {/* Mobile Top Header */}
      <div className="md:hidden h-14 bg-white/95 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800/80 px-4 flex items-center justify-between z-50 shrink-0 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-black text-black text-sm shadow-[0_0_10px_rgba(255,107,0,0.35)]">
            LM
          </div>
          <span className="font-extrabold text-sm tracking-wider text-slate-900 dark:text-white">
            LAPMART <span className="text-amber-500">2030</span>
          </span>
          <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30">
            SYSTEM
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Header Theme Toggle (Mobile) */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all cursor-pointer"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            aria-label="Toggle system theme"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-slate-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {chatCount > 0 && (
            <Link
              href="/system/chat"
              className="flex items-center gap-1 text-[11px] font-mono bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40 px-2 py-1 rounded-md"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{chatCount}</span>
            </Link>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            aria-label="Toggle Side Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Backdrop overlay for mobile drawer */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
        />
      )}

      {/* ================= SIDE MENU (SIDEBAR) ================= */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col bg-white/95 dark:bg-slate-950/95 border-r border-slate-200 dark:border-slate-800/80 backdrop-blur-2xl transition-all duration-300 shrink-0 shadow-sm md:shadow-none ${
          isMobileMenuOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0"
        } ${isCollapsed ? "md:w-20" : "md:w-64"}`}
      >
        {/* Sidebar Header: Brand, Theme Toggle & Collapse Toggle */}
        <div className="h-16 px-4 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between shrink-0">
          <Link
            href="/system"
            className={`flex items-center gap-3 overflow-hidden transition-all ${
              isCollapsed ? "justify-center w-full" : ""
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-black text-black text-lg shadow-[0_0_15px_rgba(255,107,0,0.35)] shrink-0">
              LM
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm tracking-wider text-slate-900 dark:text-white">
                    LAPMART <span className="text-amber-500">2030</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-cyan-600 dark:text-cyan-400 font-mono">
                  <Terminal className="w-2.5 h-2.5" />
                  <span>SYSTEM CONSOLE</span>
                </div>
              </div>
            )}
          </Link>

          {/* Header Action Tools (Theme Toggle + Collapse) */}
          {!isCollapsed && (
            <div className="hidden md:flex items-center gap-1.5">
              {/* Header Theme Toggle Icon Button */}
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all cursor-pointer"
                title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4 text-slate-700" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400" />
                )}
              </button>

              {/* Collapse Button */}
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* When collapsed on desktop: icons for theme toggle + expand button */}
        {isCollapsed && (
          <div className="hidden md:flex flex-col items-center gap-2 py-2.5 border-b border-slate-200 dark:border-slate-800/60">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            <button
              onClick={() => setIsCollapsed(false)}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
              title="Expand sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Section 1: Operations */}
          <div className="space-y-1.5">
            {!isCollapsed && (
              <span className="px-3 text-[10px] font-mono uppercase font-bold text-slate-600 dark:text-slate-300 tracking-wider block mb-2">
                Operations
              </span>
            )}

            {/* Live Customer Chats */}
            <Link
              href="/system/chat"
              title="Customer Chats"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all group ${
                isChatActive
                  ? "bg-cyan-50 dark:bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40 shadow-xs dark:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900/80 border border-transparent"
              } ${isCollapsed ? "justify-center px-2" : ""}`}
            >
              <div className="relative shrink-0">
                <MessageSquare
                  className={`w-4 h-4 ${
                    isChatActive
                      ? "text-cyan-600 dark:text-cyan-400"
                      : "text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
                  }`}
                />
                {chatCount > 0 && isCollapsed && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                )}
              </div>
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between overflow-hidden">
                  <span className="truncate">Customer Chats</span>
                  {chatCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 text-[10px] font-mono font-bold shrink-0 ml-2 shadow-xs">
                      {chatCount}
                    </span>
                  )}
                </div>
              )}
            </Link>

            {/* Branch Sales Telemetry (Live) */}
            <Link
              href="/system/sales"
              title="Branch Sales Telemetry"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all group ${
                isSalesActive
                  ? "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 shadow-xs dark:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900/80 border border-transparent"
              } ${isCollapsed ? "justify-center px-2" : ""}`}
            >
              <div className="relative shrink-0">
                <TrendingUp
                  className={`w-4 h-4 ${
                    isSalesActive
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                  }`}
                />
                {isCollapsed && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
              </div>
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between overflow-hidden">
                  <span className="truncate">Branch Sales (Live)</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 text-[9px] font-mono font-bold animate-pulse shrink-0 ml-2">
                    LIVE
                  </span>
                </div>
              )}
            </Link>

            {/* Dashboard Overview */}
            <Link
              href="/system"
              title="System Overview"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all group ${
                isDashboardActive
                  ? "bg-amber-50 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 shadow-xs dark:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900/80 border border-transparent"
              } ${isCollapsed ? "justify-center px-2" : ""}`}
            >
              <LayoutDashboard
                className={`w-4 h-4 shrink-0 ${
                  isDashboardActive
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-slate-500 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
                }`}
              />
              {!isCollapsed && <span className="truncate">System Overview</span>}
            </Link>
          </div>

          {/* Section 2: Storefront Links */}
          <div className="space-y-1.5">
            {!isCollapsed && (
              <span className="px-3 text-[10px] font-mono uppercase font-bold text-slate-600 dark:text-slate-300 tracking-wider block mb-2">
                Storefront
              </span>
            )}

            <Link
              href="/"
              target="_blank"
              title="Live Storefront"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900/80 border border-transparent transition-all group ${
                isCollapsed ? "justify-center px-2" : ""
              }`}
            >
              <ExternalLink className="w-4 h-4 shrink-0 text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="truncate">View Store</span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Live ↗</span>
                </div>
              )}
            </Link>

            <Link
              href="/shop"
              target="_blank"
              title="Hardware Catalog"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900/80 border border-transparent transition-all group ${
                isCollapsed ? "justify-center px-2" : ""
              }`}
            >
              <Laptop className="w-4 h-4 shrink-0 text-slate-500 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
              {!isCollapsed && <span className="truncate">Catalog / Shop</span>}
            </Link>
          </div>

          {/* Section 3: Telemetry Status */}
          {!isCollapsed && (
            <div className="p-3 rounded-xl bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500 dark:text-slate-400">Node Hub</span>
                <span className="text-cyan-700 dark:text-cyan-400 font-semibold">Anuradhapura</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500 dark:text-slate-400">Telemetry</span>
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500 dark:text-slate-400">Customer Files</span>
                <span className="text-amber-700 dark:text-amber-400 font-bold">{chatCount} active</span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Footer: Profile & Logout */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 space-y-2 shrink-0">
          {!isCollapsed ? (
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shadow-2xs">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-500/40 flex items-center justify-center text-cyan-700 dark:text-cyan-300 font-bold text-xs shrink-0">
                  A
                </div>
                <div className="truncate font-mono">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {adminUser?.email || "admin@admin.lk"}
                  </div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">Super Admin</div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/40 border border-transparent hover:border-red-200 dark:hover:border-red-500/30 transition-all cursor-pointer shrink-0"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full py-2.5 flex items-center justify-center rounded-xl text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/40 border border-slate-200 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-500/30 transition-all cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {children}
      </div>
    </div>
  );
}

export default function SystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <SystemThemeProvider>
      <SystemLayoutInner>{children}</SystemLayoutInner>
    </SystemThemeProvider>
  );
}
