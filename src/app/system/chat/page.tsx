"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Search,
  RefreshCw,
  Send,
  Phone,
  MessageCircle,
  ExternalLink,
  Clock,
  User,
  Bot,
  ShieldCheck,
  Globe,
  SlidersHorizontal,
  CheckCheck,
  ChevronRight,
  Info,
  Sparkles,
  FileText,
  Copy,
  Check
} from "lucide-react";
import { CustomerChatProfile, SystemChatMessage } from "@/app/api/system/chats/route";

const QUICK_REPLIES = [
  "Hello! This laptop is in stock at our Kandy and Colombo showrooms.",
  "We have reserved this unit for you. Please confirm your delivery address.",
  "All our laptops include a 45-Point Diagnostic Certificate and Warranty.",
  "You can also speak with our hardware technicians directly on WhatsApp (+94 71 059 5548).",
  "Islandwide express delivery is available within 24 to 48 hours."
];

export default function SystemChatPage() {
  const [customers, setCustomers] = useState<CustomerChatProfile[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerChatProfile[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [activeCustomer, setActiveCustomer] = useState<CustomerChatProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState<"ALL" | "si" | "en" | "ta">("ALL");
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(true);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Fetch all customer chats
  const fetchChats = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const res = await fetch("/api/system/chats");
      if (res.ok) {
        const data = await res.json();
        const list: CustomerChatProfile[] = data.customers || [];
        setCustomers(list);

        // Keep or select active customer
        if (list.length > 0) {
          if (selectedPhone) {
            const updated = list.find((c) => c.phone === selectedPhone);
            if (updated) {
              setActiveCustomer(updated);
            }
          } else {
            setSelectedPhone(list[0].phone);
            setActiveCustomer(list[0]);
          }
        }
      }
    } catch (err) {
      console.error("Failed to load customer chats:", err);
    } finally {
      setIsLoading(false);
      if (isManual) setIsRefreshing(false);
    }
  };

  // Initial load + live polling every 4 seconds
  useEffect(() => {
    fetchChats();
    const interval = setInterval(() => {
      fetchChats();
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedPhone]);

  // Filter customers by search and language
  useEffect(() => {
    let result = customers;

    if (languageFilter !== "ALL") {
      result = result.filter((c) => c.language === languageFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          c.interests.some((i) => i.toLowerCase().includes(q)) ||
          c.messages.some((m) => m.text.toLowerCase().includes(q))
      );
    }

    setFilteredCustomers(result);

    // If active customer was filtered out, select the first matching
    if (result.length > 0 && (!activeCustomer || !result.find((c) => c.phone === activeCustomer.phone))) {
      setSelectedPhone(result[0].phone);
      setActiveCustomer(result[0]);
    }
  }, [customers, searchQuery, languageFilter]);

  // Auto-scroll on new message or customer change
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeCustomer?.messages?.length, selectedPhone]);

  // Select customer
  const handleSelectCustomer = (c: CustomerChatProfile) => {
    setSelectedPhone(c.phone);
    setActiveCustomer(c);
  };

  // Copy phone number
  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  // Send staff reply
  const handleSendReply = async () => {
    if (!replyText.trim() || !activeCustomer || isSending) return;

    const messageContent = replyText.trim();
    setIsSending(true);

    try {
      const res = await fetch("/api/system/chats/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: activeCustomer.phone,
          text: messageContent
        })
      });

      if (res.ok) {
        const data = await res.json();
        setReplyText("");

        // Optimistically add to messages
        if (data.message) {
          const updatedMessages = [...activeCustomer.messages, data.message];
          const updatedCustomer = {
            ...activeCustomer,
            messages: updatedMessages,
            messageCount: updatedMessages.length,
            latestMessage: data.message
          };
          setActiveCustomer(updatedCustomer);
          setCustomers((prev) =>
            prev.map((c) => (c.phone === activeCustomer.phone ? updatedCustomer : c))
          );
        }
      }
    } catch (err) {
      console.error("Failed to send staff reply:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-100/60 dark:bg-[#070913] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Sub-header / Filter Toolbar */}
      <div className="h-14 px-4 sm:px-6 bg-white/95 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-wider text-slate-900 dark:text-slate-100 uppercase font-mono">
              Live Customer Conversations
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 ml-2">
              ({customers.length} customer records)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <span>Auto-refreshing</span>
          </div>

          <button
            onClick={() => fetchChats(true)}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 text-xs font-mono text-cyan-700 dark:text-cyan-300 hover:text-cyan-800 dark:hover:text-cyan-200 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/40 transition-all cursor-pointer disabled:opacity-50"
            title="Refresh conversations"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-cyan-600 dark:text-cyan-400" : ""}`} />
            <span className="hidden sm:inline">Sync</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Work Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* ================= COLUMN 1: CUSTOMER LIST ================= */}
        <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-950/40 shrink-0">
          {/* Search bar & filters */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-800/80 space-y-2 bg-white/80 dark:bg-transparent">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, phone, msg..."
                className="w-full pl-9 pr-3 py-1.5 text-xs font-mono bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Language filter pills */}
            <div className="flex items-center gap-1 text-[11px] font-mono">
              {(
                [
                  { id: "ALL", label: "All" },
                  { id: "si", label: "🇱🇰 සිංහල" },
                  { id: "en", label: "🌐 English" },
                  { id: "ta", label: "🇱🇰 தமிழ்" }
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setLanguageFilter(tab.id)}
                  className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                    languageFilter === tab.id
                      ? "bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-900 border border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Customer list scroll area */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/40">
            {isLoading ? (
              <div className="p-8 text-center text-xs text-slate-500 font-mono">
                <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                Loading customer chats...
              </div>
            ) : filteredCustomers.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 font-mono">
                No customer chats matching query.
              </div>
            ) : (
              filteredCustomers.map((c) => {
                const isSelected = activeCustomer?.phone === c.phone;
                return (
                  <div
                    key={c.phone}
                    onClick={() => handleSelectCustomer(c)}
                    className={`p-3.5 cursor-pointer transition-all flex flex-col gap-1.5 ${
                      isSelected
                        ? "bg-cyan-50 dark:bg-cyan-950/40 border-l-4 border-cyan-600 dark:border-cyan-500 shadow-xs"
                        : "hover:bg-slate-100/80 dark:hover:bg-slate-900/60 border-l-4 border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                            isSelected
                              ? "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950"
                              : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                        >
                          {c.name.charAt(0).toUpperCase() || "C"}
                        </div>
                        <div className="truncate">
                          <span className="text-xs font-bold text-slate-900 dark:text-slate-200 truncate block">
                            {c.name}
                          </span>
                          <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400/90 font-medium">
                            {c.phone}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end shrink-0 gap-1">
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                          {c.language}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {c.messages.length} msgs
                        </span>
                      </div>
                    </div>

                    {/* Latest message snippet */}
                    {c.latestMessage && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 pl-10 font-sans leading-relaxed">
                        <span className="text-cyan-700 dark:text-cyan-400 font-semibold">
                          {c.latestMessage.sender === "Customer"
                            ? "Cust"
                            : c.latestMessage.sender === "Staff"
                            ? "Staff"
                            : "AI"}
                          :{" "}
                        </span>
                        {c.latestMessage.text}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ================= COLUMN 2: ACTIVE CHAT CONVERSATION ================= */}
        {activeCustomer ? (
          <div className="flex-1 flex flex-col bg-slate-50/50 dark:bg-slate-950/20 overflow-hidden relative">
            {/* Top Customer Header Bar */}
            <div className="h-16 px-6 bg-white/95 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-4 shrink-0 shadow-2xs backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-100 to-slate-100 dark:from-cyan-900 dark:to-slate-800 border border-cyan-300 dark:border-cyan-500/40 flex items-center justify-center font-bold text-cyan-800 dark:text-cyan-300 text-sm">
                  {activeCustomer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">
                      {activeCustomer.name}
                    </h2>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 font-semibold">
                      {activeCustomer.language.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-400">
                    <button
                      onClick={() => handleCopyPhone(activeCustomer.phone)}
                      className="hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                      title="Copy phone"
                    >
                      <span>{activeCustomer.phone}</span>
                      {copiedPhone ? (
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                      )}
                    </button>
                    {activeCustomer.lastInteraction && (
                      <span className="text-[11px] text-slate-500 hidden sm:inline">
                        &bull; Active: {new Date(activeCustomer.lastInteraction).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/94${activeCustomer.phone.replace(/^0/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-500/30 hover:border-emerald-500 transition-all font-semibold"
                  title="Open WhatsApp chat with customer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>

                <a
                  href={`tel:${activeCustomer.phone}`}
                  className="flex items-center gap-1.5 text-xs font-mono text-cyan-700 dark:text-cyan-300 hover:text-cyan-800 dark:hover:text-cyan-200 px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-300 dark:border-cyan-500/30 hover:border-cyan-500 transition-all font-semibold"
                  title="Call customer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Call</span>
                </a>

                <button
                  onClick={() => setShowProfileDrawer(!showProfileDrawer)}
                  className={`p-2 rounded-lg border transition-all cursor-pointer ${
                    showProfileDrawer
                      ? "bg-cyan-100 dark:bg-cyan-500/20 border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300"
                      : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                  title="Toggle customer details panel"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {activeCustomer.messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 font-mono text-xs">
                  <MessageSquare className="w-8 h-8 text-slate-400 dark:text-slate-600 mb-2" />
                  <p>Customer memory record initialized.</p>
                  <p className="text-slate-400 dark:text-slate-600 mt-1">No messages recorded in interaction log yet.</p>
                </div>
              ) : (
                activeCustomer.messages.map((m, index) => {
                  const isCustomer = m.sender === "Customer";
                  const isStaff = m.sender === "Staff";
                  const isAI = m.sender === "LapMart AI";

                  return (
                    <div
                      key={m.id || index}
                      className={`flex flex-col ${
                        isStaff
                          ? "items-end"
                          : isCustomer
                          ? "items-start"
                          : "items-start"
                      }`}
                    >
                      {/* Sender metadata label */}
                      <div className="flex items-center gap-2 mb-1 px-1 text-[11px] font-mono">
                        {isCustomer && (
                          <>
                            <User className="w-3 h-3 text-cyan-700 dark:text-cyan-400" />
                            <span className="text-cyan-700 dark:text-cyan-400 font-semibold">{activeCustomer.name}</span>
                          </>
                        )}
                        {isAI && (
                          <>
                            <Bot className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                            <span className="text-purple-600 dark:text-purple-400 font-semibold">LapMart AI Advisor</span>
                          </>
                        )}
                        {isStaff && (
                          <>
                            <ShieldCheck className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                            <span className="text-amber-600 dark:text-amber-400 font-semibold">Staff (You)</span>
                          </>
                        )}
                        <span className="text-slate-500">&bull; {m.time}</span>
                      </div>

                      {/* Bubble */}
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-xs ${
                          isStaff
                            ? "bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/40 text-amber-950 dark:text-amber-100 rounded-tr-sm"
                            : isCustomer
                            ? "bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-cyan-500/30 text-slate-900 dark:text-slate-100 rounded-tl-sm"
                            : "bg-blue-50/80 dark:bg-indigo-950/30 border border-blue-200 dark:border-indigo-500/30 text-slate-800 dark:text-slate-200 rounded-tl-sm"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Templates Row */}
            <div className="px-4 sm:px-6 py-2 bg-white/90 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono uppercase text-slate-500 shrink-0 flex items-center gap-1 font-bold">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Templates:
              </span>
              {QUICK_REPLIES.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => setReplyText(reply)}
                  className="shrink-0 text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-cyan-800 dark:hover:text-cyan-300 transition-all cursor-pointer"
                >
                  {reply.substring(0, 32)}...
                </button>
              ))}
            </div>

            {/* Admin Live Reply Input Bar */}
            <div className="p-4 sm:p-6 bg-white/95 dark:bg-slate-950/90 border-t border-slate-200 dark:border-slate-800/80 shadow-2xs">
              <div className="flex items-end gap-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 focus-within:border-cyan-500 p-2.5 transition-all shadow-inner">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Reply as Staff to ${activeCustomer.name} (Press Enter to send, Shift+Enter for new line)...`}
                  rows={2}
                  className="flex-1 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm font-sans focus:outline-none resize-none leading-relaxed"
                />
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim() || isSending}
                  className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs font-mono shadow-[0_0_15px_rgba(255,107,0,0.3)] flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 active:scale-95"
                >
                  {isSending ? (
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Reply</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2">
                <span>Staff responses are logged directly to the customer&apos;s hardware memory profile.</span>
                <span>LapMart Sri Lanka Operations</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 font-mono text-xs">
            <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
            <p>Select a customer conversation from the directory on the left.</p>
          </div>
        )}

        {/* ================= COLUMN 3: CUSTOMER MEMORY & PROFILE DRAWER ================= */}
        {activeCustomer && showProfileDrawer && (
          <div className="hidden xl:flex w-80 lg:w-88 flex-col border-l border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/60 shrink-0 p-5 overflow-y-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Customer Memory File</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30 font-bold">
                ACTIVE
              </span>
            </div>

            {/* Profile Overview */}
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase text-slate-500 block">Customer Name</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold text-sm block">{activeCustomer.name}</span>
                <span className="text-cyan-700 dark:text-cyan-400 text-xs block font-semibold">{activeCustomer.phone}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-500 block">Customer UUID</span>
                <span className="text-slate-600 dark:text-slate-300 text-[11px] break-all block font-mono">
                  {activeCustomer.uuid || "System Generated"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-500 block">Preferred Language</span>
                <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-medium">
                  <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>
                    {activeCustomer.language === "si"
                      ? "Sinhala (සිංහල)"
                      : activeCustomer.language === "ta"
                      ? "Tamil (தமிழ்)"
                      : "English (UK/Global)"}
                  </span>
                </div>
              </div>
            </div>

            {/* Hardware Interests */}
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2 font-mono uppercase">
                Hardware Interests
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeCustomer.interests && activeCustomer.interests.length > 0 ? (
                  activeCustomer.interests.map((interest, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-cyan-50 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 font-mono">General Laptops</span>
                )}
              </div>
            </div>

            {/* Memory & Preferences Notes */}
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2 font-mono uppercase">
                Memory & Notes
              </span>
              <div className="space-y-2">
                {activeCustomer.memoryNotes && activeCustomer.memoryNotes.length > 0 ? (
                  activeCustomer.memoryNotes.map((note, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 font-sans leading-relaxed"
                    >
                      {note}
                    </div>
                  ))
                ) : (
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 font-mono">
                    No custom memory notes recorded.
                  </div>
                )}
              </div>
            </div>

            {/* Storage file indicator */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 text-[10px] font-mono text-slate-500">
              <span>Markdown file:</span>
              <span className="block text-slate-600 dark:text-slate-400 truncate mt-0.5">
                secure_memory/customers/{activeCustomer.filename}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
