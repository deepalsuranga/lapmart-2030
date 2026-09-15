"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { soundFX } from "@/utils/sound";
import { WHATSAPP_NUMBER, MASTER_HOTLINE } from "@/data/lapmart-data";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Check,
  ChevronRight,
  ShieldCheck,
  Phone,
  User,
  Globe,
  Zap,
  ArrowRight,
  MapPin,
  Bot,
  Laptop,
  Wrench
} from "lucide-react";

type Language = "en" | "si" | "ta";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: string;
}

interface CustomerProfile {
  name: string;
  phone: string;
  language: Language;
  uuid?: string;
  interests?: string[];
  memoryNotes?: string;
}

export default function LapMartChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"LANG" | "HUB" | "PHONE" | "NEW_USER" | "CHAT">("LANG");
  const [hubAction, setHubAction] = useState<string>("");
  
  // Language
  const [language, setLanguage] = useState<Language>("en");
  
  // Customer Data
  const [phoneInput, setPhoneInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [isCheckingCustomer, setIsCheckingCustomer] = useState(false);
  const [checkError, setCheckError] = useState("");

  // Chat conversation
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (step === "CHAT") {
      scrollToBottom();
    }
  }, [messages, isTyping, step]);

  // Load cached customer from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lapmart_customer_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.phone && parsed.name) {
          setCustomer(parsed);
          setLanguage(parsed.language || "en");
          setStep("CHAT");
          initializeWelcomeChat(parsed.name, parsed.language || "en", true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const initializeWelcomeChat = (name: string, lang: Language, isReturning = false) => {
    let welcome = "";
    if (lang === "si") {
      welcome = isReturning
        ? `නැවත සාදරයෙන් පිළිගනිමු ${name}! මම **LapMart AI**. ඔබගේ පෙර විස්තර මා සතුව ඇත. අද ඔබට අලුතින් උදවු කළ හැක්කේ කුමන ලැප්ටොප් හෝ සේවාව සඳහාද?`
        : `ආයුබෝවන් ${name}! මම **LapMart AI**, ලැප්මාර්ට් ආයතනයේ (LapMart 2030) නිල AI සහායකයා. අපගේ දිවයින පුරා පිහිටි ශාඛා 7, Gaming Laptops සහ සහතික කළ Used Workstations ගැන ඕනෑම දෙයක් මාගෙන් විමසන්න!`;
    } else if (lang === "ta") {
      welcome = isReturning
        ? `மீண்டும் நல்வரவு ${name}! நான் **LapMart AI**. உங்கள் முந்தைய விருப்பங்களை நான் நினைவில் கொண்டுள்ளேன். இன்று உங்களுக்கு எவ்வாறு உதவலாம்?`
        : `வணக்கம் ${name}! நான் **LapMart AI**, LapMart 2030 இன் அதிகாரப்பூர்வ AI உதவியாளர். சிறந்த மடிக்கணினிகள் (Laptops), விலைகள் மற்றும் உத்தரவாத விவரங்களை அறிய நான் உதவ முடியும். உங்களுக்கு எவ்வாறு உதவலாம்?`;
    } else {
      welcome = isReturning
        ? `Welcome back, ${name}! I am **LapMart AI**. I have your preferences in our memory system. What can I help you explore today?`
        : `Hello ${name}! I am **LapMart AI**, your personal hardware advisor at LapMart 2030. I'm here to help you find the perfect laptop, check specs, compare prices in LKR, or locate our 7 islandwide showrooms. How can I assist you today?`;
    }

    setMessages([
      {
        id: "msg-welcome",
        role: "assistant",
        text: welcome,
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  // Step 1 -> Language Selection -> Transitions to Quick Hub
  const handleSelectLanguage = (lang: Language) => {
    soundFX.click();
    setLanguage(lang);
    setStep("HUB");
  };

  const triggerPendingHubQuery = (actionKey: string, lang: Language) => {
    let q = "";
    if (actionKey === "STOCK") {
      q = lang === "si" ? "දැනට තොගයේ ඇති හොඳම ලැප්ටොප් මොනවාද?" : lang === "ta" ? "தற்போது கையிருப்பில் உள்ள சிறந்த லேப்டாப்கள் எவை?" : "Can you show me the live laptop stock and current best deals?";
    } else if (actionKey === "UPGRADE") {
      q = lang === "si" ? "RAM / NVMe SSD / Battery upgrade මිල සහ විස්තර ලබා දෙන්න" : lang === "ta" ? "RAM / SSD / பேட்டரி மேம்படுத்தல் (Upgrade) விவரங்கள் வேண்டும்" : "I need information and prices for RAM, NVMe SSD, and battery upgrades";
    } else if (actionKey === "BRANCHES") {
      q = lang === "si" ? "දිවයින පුරා පිහිටි LapMart ශාඛා සහ ලිපිනයන් මොනවාද?" : lang === "ta" ? "LapMart இன் கிளைகள் மற்றும் தொடர்பு எண்கள் எவை?" : "What are your 7 islandwide showroom locations and pickup hours?";
    }
    if (q) {
      setTimeout(() => {
        handleSendMessage(q);
      }, 500);
    }
  };

  // Step 1.5 -> Select LapMart Quick Hub Option
  const handleSelectHubOption = (actionKey: string) => {
    soundFX.click();
    setHubAction(actionKey);

    // If customer session already exists, jump directly to chat with this query
    if (customer && customer.phone) {
      setStep("CHAT");
      triggerPendingHubQuery(actionKey, language);
      return;
    }

    // Otherwise proceed to phone verification to check customer memory
    setStep("PHONE");
  };

  // Step 2 -> Check Customer Phone
  const handleCheckPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckError("");
    const cleanDigits = phoneInput.replace(/\D/g, "");
    if (cleanDigits.length < 9) {
      setCheckError(
        language === "si"
          ? "කරුණාකර නිවැරදි දුරකථන අංකයක් ඇතුළත් කරන්න (උදා: 071 059 5548)"
          : language === "ta"
          ? "සரியான தொலைபேசி எண்ணை உள்ளிடவும் (எ.கா: 071 059 5548)"
          : "Please enter a valid mobile number (e.g. 071 059 5548)"
      );
      return;
    }

    setIsCheckingCustomer(true);
    soundFX.pop();

    try {
      const res = await fetch(`/api/customer?phone=${encodeURIComponent(phoneInput)}`);
      const data = await res.json();

      if (data.exists && data.customer) {
        // Customer exists! Welcome back
        const c: CustomerProfile = {
          name: data.customer.name,
          phone: data.customer.phone,
          language: data.customer.language || language,
          uuid: data.customer.uuid,
          interests: data.customer.interests,
          memoryNotes: data.customer.memoryNotes
        };
        setCustomer(c);
        localStorage.setItem("lapmart_customer_session", JSON.stringify(c));
        setStep("CHAT");
        initializeWelcomeChat(c.name, c.language, true);
        if (hubAction) {
          triggerPendingHubQuery(hubAction, c.language);
        }
      } else {
        // New customer! Collect Name
        setStep("NEW_USER");
      }
    } catch (err) {
      console.error("Check customer error:", err);
      // Fallback directly to New User
      setStep("NEW_USER");
    } finally {
      setIsCheckingCustomer(false);
    }
  };

  // Step 3 -> Create New Customer Profile
  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    soundFX.pop();
    const newCustomer: CustomerProfile = {
      name: nameInput.trim(),
      phone: phoneInput.trim(),
      language,
      interests: selectedInterests.length > 0 ? selectedInterests : ["General Laptops"]
    };

    try {
      const res = await fetch("/api/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer)
      });
      const data = await res.json();
      if (data.success && data.customer) {
        newCustomer.uuid = data.customer.uuid;
      }
    } catch (err) {
      console.error("Create customer error:", err);
    }

    setCustomer(newCustomer);
    localStorage.setItem("lapmart_customer_session", JSON.stringify(newCustomer));
    setStep("CHAT");
    initializeWelcomeChat(newCustomer.name, language, false);
    if (hubAction) {
      triggerPendingHubQuery(hubAction, language);
    }
  };

  // Send Message in Chat
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    soundFX.click();
    setInputValue("");

    const userMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      role: "user",
      text: query,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          phone: customer?.phone || phoneInput,
          name: customer?.name || nameInput,
          language,
          interests: customer?.interests || selectedInterests,
          memoryNotes: customer?.memoryNotes || "",
          history: messages.map((m) => ({ role: m.role, text: m.text }))
        })
      });

      const data = await res.json();
      soundFX.pop();

      const aiMsg: ChatMessage = {
        id: "msg-ai-" + Date.now(),
        role: "assistant",
        text: data.reply || "I am LapMart AI. How can I help you today?",
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat API error:", error);
      const errorMsg: ChatMessage = {
        id: "msg-err-" + Date.now(),
        role: "assistant",
        text:
          language === "si"
            ? "සමාවන්න, සම්බන්ධතාවය අසාර්ථක විය. කරුණාකර නැවත උත්සාහ කරන්න හෝ අපගේ WhatsApp අංකය (071 059 5548) අමතන්න."
            : language === "ta"
            ? "மன்னிக்கவும், பிணையப் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும் அல்லது WhatsApp (071 059 5548) இல் தொடர்பு கொள்ளவும்."
            : "I apologize, a network issue occurred. Please try again or reach our hardware team directly on WhatsApp (+94 71 059 5548).",
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Reset chat session
  const handleResetSession = () => {
    soundFX.click();
    localStorage.removeItem("lapmart_customer_session");
    setCustomer(null);
    setPhoneInput("");
    setNameInput("");
    setSelectedInterests([]);
    setMessages([]);
    setStep("LANG");
  };

  const quickPrompts = [
    { en: "Who are you?", si: "ඔබ කවුද?", ta: "நீங்கள் யார்?" },
    { en: "🔥 Today's Best Deals", si: "🔥 අද හොඳම මිල අඩුකිරීම්", ta: "🔥 இன்றைய சிறந்த சலுகைகள்" },
    { en: "🎮 RTX Gaming Laptops", si: "🎮 RTX Gaming පරිගණක", ta: "🎮 RTX கேமிங் லேப்டாப்கள்" },
    { en: "💼 Certified Used ThinkPads", si: "💼 Used ThinkPad මිල", ta: "💼 சான்றளிக்கப்பட்ட ThinkPad" },
    { en: "📍 Showroom Locations", si: "📍 ශාඛා පිහිටීම", ta: "📍 கிளைகள் உள்ள இடங்கள்" },
    { en: "🛡️ Warranty & Diagnostics", si: "🛡️ වගකීම් සහතික", ta: "🛡️ உத்தரவாதம்" }
  ];

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 select-none">
      {/* 1. FLOATING CHAT TRIGGER BUTTON (Matches uploaded screenshot media_1789506919683.png) */}
      {!isOpen && (
        <div className="relative group">
          <button
            onClick={() => {
              soundFX.pop();
              setIsOpen(true);
            }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-[22px] bg-gradient-to-tr from-[#00C26E] via-[#05A05B] to-[#00D67A] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(0,194,110,0.4)] hover:shadow-[0_12px_40px_rgba(0,194,110,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 relative border-2 border-white/40 cursor-pointer"
            title="Chat with LapMart AI"
          >
            {/* White speech bubble icon */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2] text-white fill-white/10" />
            </div>

            {/* Glowing Amber / Yellow Notification Dot on Top Right */}
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFB020] border-2 border-slate-950 shadow-md flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            </span>
          </button>

          {/* Hover Tooltip Pill */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md text-white text-xs font-bold whitespace-nowrap shadow-xl border border-white/10 animate-in fade-in slide-in-from-right-2 duration-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Chat with LapMart AI</span>
          </div>
        </div>
      )}

      {/* 2. CHAT MODAL WINDOW */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[410px] h-[600px] max-h-[85vh] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-[#080B16] text-white p-4 sm:p-4.5 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-500 p-[1.5px] shadow-md shadow-emerald-500/20">
                <div className="w-full h-full bg-[#0E1528] rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm tracking-tight text-white">LapMart AI</h3>
                  <span className="text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/20">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate max-w-[170px]">
                  {customer ? customer.name : "Hardware Specialist"}
                </p>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-1.5">
              {/* Language Selector in Header */}
              {step === "CHAT" && (
                <div className="flex items-center gap-1 bg-white/10 rounded-lg p-0.5 text-[10px] font-bold">
                  {(["en", "si", "ta"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        soundFX.click();
                        setLanguage(l);
                      }}
                      className={`px-1.5 py-0.5 rounded uppercase transition-colors ${
                        language === l ? "bg-emerald-500 text-white" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}

              {/* Reset Session */}
              <button
                onClick={handleResetSession}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                title="Reset Session / Change User"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  soundFX.click();
                  setIsOpen(false);
                }}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content by Step */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50 flex flex-col justify-between">
            
            {/* STEP 1: SELECT LANGUAGE */}
            {step === "LANG" && (
              <div className="flex-1 flex flex-col justify-center text-center space-y-5 animate-in fade-in duration-200">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <Globe className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">Welcome to LapMart 2030</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Select your preferred language / භාෂාව තෝරන්න / மொழியைத் தேர்ந்தெடுக்கவும்
                  </p>
                </div>

                <div className="space-y-2.5 max-w-xs mx-auto w-full pt-2">
                  <button
                    onClick={() => handleSelectLanguage("en")}
                    className="w-full p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-md text-left flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🇬🇧</span>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-600">English</div>
                        <div className="text-[11px] text-slate-400">Continue in English</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => handleSelectLanguage("si")}
                    className="w-full p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-md text-left flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🇱🇰</span>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-600">සිංහල (Sinhala)</div>
                        <div className="text-[11px] text-slate-400">සිංහලෙන් කතා කරන්න</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => handleSelectLanguage("ta")}
                    className="w-full p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-md text-left flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🇱🇰</span>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-600">தமிழ் (Tamil)</div>
                        <div className="text-[11px] text-slate-400">தமிழில் தொடரவும்</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1.5: LAPMART QUICK HUB (Matches uploaded media_1789510059929.png) */}
            {step === "HUB" && (
              <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-200">
                {/* Hub Header Card */}
                <div className="pb-3 border-b border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#00C26E] text-white flex items-center justify-center shadow-md shadow-emerald-500/25 shrink-0">
                      <MessageSquare className="w-5 h-5 fill-white/20 stroke-[2.3]" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                        <span>LapMart Quick Hub</span>
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>
                          {language === "si"
                            ? "විශේෂඥයින් සබැඳිව ඇත (සාමාන්‍ය පිළිතුරු: විනාඩි 2)"
                            : language === "ta"
                            ? "நிபுணர்கள் ஆன்லைனில் (பதில் நேரம்: 2 நிமி)"
                            : "Specialists Online (Avg reply: 2m)"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hub Action List (Pixel-matched with media_1789510059929.png) */}
                <div className="py-4 space-y-2.5 flex-1 flex flex-col justify-center">
                  {/* Option 1: Check Live Laptop Stock */}
                  <button
                    onClick={() => handleSelectHubOption("STOCK")}
                    className="w-full p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] text-left flex items-center justify-between group transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                        <Laptop className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                          {language === "si"
                            ? "ලැප්ටොප් තොග පරීක්ෂා කරන්න"
                            : language === "ta"
                            ? "நேரலை லேப்டாப் கையிருப்பு"
                            : "Check Live Laptop Stock"}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {language === "si"
                            ? "RTX Gaming & ThinkPads"
                            : language === "ta"
                            ? "விலைகள் மற்றும் சலுகைகள்"
                            : "Brand New & Certified Used"}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Option 2: RAM / SSD / Battery Upgrade */}
                  <button
                    onClick={() => handleSelectHubOption("UPGRADE")}
                    className="w-full p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-cyan-500 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] text-left flex items-center justify-between group transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                        <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                          {language === "si"
                            ? "RAM / SSD / Battery Upgrade"
                            : language === "ta"
                            ? "RAM / SSD / பேட்டரி மேம்படுத்தல்"
                            : "RAM / SSD / Battery Upgrade"}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {language === "si"
                            ? "පැය 2 ක් ඇතුළත ස්ථාපනය"
                            : language === "ta"
                            ? "உத்தரவாதத்துடன் கூடிய சேவை"
                            : "Diagnostics Lab & Genuine Parts"}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Option 3: Branch Location & Pickup */}
                  <button
                    onClick={() => handleSelectHubOption("BRANCHES")}
                    className="w-full p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] text-left flex items-center justify-between group transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Phone className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {language === "si"
                            ? "ශාඛා පිහිටීම සහ පැමිණ රැගෙන යාම"
                            : language === "ta"
                            ? "கிளை இடங்கள் & பிக்கப்"
                            : "Branch Location & Pickup"}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {language === "si"
                            ? "දිවයින පුරා ශාඛා 7"
                            : language === "ta"
                            ? "7 நேரடி காட்சியறைகள்"
                            : "7 Islandwide Showrooms"}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Hub Bottom Sub-bar */}
                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <a
                    href={`tel:${MASTER_HOTLINE.replace(/\s+/g, "")}`}
                    className="hover:text-emerald-600 hover:underline flex items-center gap-1"
                  >
                    <span>Direct Call:</span>
                    <span className="font-bold text-slate-600">{MASTER_HOTLINE}</span>
                  </a>
                  <span>Sri Lanka GMT+5:30</span>
                </div>
              </div>
            )}

            {/* STEP 2: PHONE NUMBER CHECK */}
            {step === "PHONE" && (
              <form
                onSubmit={handleCheckPhone}
                className="flex-1 flex flex-col justify-center text-center space-y-5 animate-in fade-in duration-200 max-w-sm mx-auto w-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    {language === "si"
                      ? "ඔබගේ දුරකථන අංකය ඇතුළත් කරන්න"
                      : language === "ta"
                      ? "உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்"
                      : "Enter Your Mobile Number"}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === "si"
                      ? "ඔබගේ පෙර ලැප්ටොප් විමසුම් සහ වගකීම් මතකය පරීක්ෂා කිරීමට"
                      : language === "ta"
                      ? "உங்கள் முந்தைய விவரங்கள் மற்றும் நினைவகத்தை சரிபார்க்க"
                      : "To check if you are an existing customer & load your hardware memory"}
                  </p>
                </div>

                <div className="space-y-3">
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="e.g. 071 059 5548"
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-center font-mono font-bold text-base text-slate-900 placeholder:text-slate-400 shadow-sm"
                    autoFocus
                  />
                  {checkError && <p className="text-xs text-rose-500 font-semibold">{checkError}</p>}

                  <button
                    type="submit"
                    disabled={isCheckingCustomer}
                    className="w-full py-3 rounded-2xl bg-[#00C26E] hover:bg-[#00ab61] text-white font-bold text-sm shadow-md shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isCheckingCustomer ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Checking Memory...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundFX.click();
                      setStep("HUB");
                    }}
                    className="w-full py-1 text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    ← {language === "si" ? "ආපසු Quick Hub වෙත" : language === "ta" ? "Quick Hub க்கு திரும்பு" : "Back to Quick Hub"}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: NEW CUSTOMER NAME & INTERESTS */}
            {step === "NEW_USER" && (
              <form
                onSubmit={handleCreateCustomer}
                className="flex-1 flex flex-col justify-center space-y-4 animate-in fade-in duration-200 max-w-sm mx-auto w-full"
              >
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-2">
                    <User className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-black text-slate-900">
                    {language === "si" ? "ඔබව හමුවීම සතුටක්!" : language === "ta" ? "உங்களை வரவேற்பதில் மகிழ்ச்சி!" : "Welcome to LapMart!"}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {language === "si" ? "කරුණාකර ඔබගේ නම සටහන් කරන්න" : language === "ta" ? "தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்" : "What is your name?"}
                  </p>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Your Name (e.g. Deepal / Nimal)"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm font-semibold text-slate-900 placeholder:text-slate-400"
                    required
                    autoFocus
                  />

                  {/* Interest Chips */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Interested In:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {["Gaming RTX", "Business ThinkPad", "Workstation / 3D", "Budget Student", "Accessories"].map(
                        (tag) => {
                          const isSel = selectedInterests.includes(tag);
                          return (
                            <button
                              type="button"
                              key={tag}
                              onClick={() => {
                                soundFX.click();
                                setSelectedInterests((prev) =>
                                  isSel ? prev.filter((t) => t !== tag) : [...prev, tag]
                                );
                              }}
                              className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                                isSel
                                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#00C26E] hover:bg-[#00ab61] text-white font-bold text-sm shadow-md shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Start Chatting with LapMart AI</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: ACTIVE AI CONVERSATION */}
            {step === "CHAT" && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                {/* Message Stream */}
                <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 py-1">
                  {messages.map((m) => {
                    const isAi = m.role === "assistant";
                    return (
                      <div
                        key={m.id}
                        className={`flex items-start gap-2 ${isAi ? "justify-start" : "justify-end"}`}
                      >
                        {isAi && (
                          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                            AI
                          </div>
                        )}
                        <div
                          className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed ${
                            isAi
                              ? "bg-white border border-slate-200/80 text-slate-800 shadow-sm whitespace-pre-wrap"
                              : "bg-[#0A1026] text-white shadow-md"
                          }`}
                        >
                          <div dangerouslySetInnerHTML={{ __html: formatMessageText(m.text) }} />
                          <div
                            className={`text-[9px] mt-1 text-right ${
                              isAi ? "text-slate-400" : "text-slate-300/70"
                            }`}
                          >
                            {m.time}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                        AI
                      </div>
                      <div className="bg-white border border-slate-200/80 rounded-2xl px-4 py-2 flex items-center gap-1 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts Carousel */}
                <div className="pt-2 pb-1 overflow-x-auto no-scrollbar flex items-center gap-1.5">
                  {quickPrompts.map((p, idx) => {
                    const text = p[language] || p.en;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(text)}
                        className="text-[11px] font-semibold whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs transition-colors shrink-0"
                      >
                        {text}
                      </button>
                    );
                  })}
                </div>

                {/* Chat Input Bar */}
                <div className="pt-2">
                  <div className="relative flex items-center bg-white rounded-2xl border border-slate-300 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 shadow-sm">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder={
                        language === "si"
                          ? "පණිවිඩයක් ලියන්න..."
                          : language === "ta"
                          ? "ஒரு செய்தியை எழுதுங்கள்..."
                          : "Type a message..."
                      }
                      className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                    />

                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isTyping}
                      className="absolute right-1.5 w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Footer Sub-Bar (Hidden in HUB mode since HUB has its own pixel-matched footer) */}
          {step !== "HUB" && (
            <div className="bg-slate-100/90 px-4 py-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500 shrink-0">
              <span className="flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Verified LapMart Memory</span>
              </span>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline font-bold"
              >
                Direct WhatsApp Support
              </a>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

// Lightweight formatter for markdown-style **bold** and newlines
function formatMessageText(text: string): string {
  if (!text) return "";
  const escapeHtml = (str: string) =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  let formatted = escapeHtml(text);
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");
  formatted = formatted.replace(/\n/g, "<br />");
  return formatted;
}
