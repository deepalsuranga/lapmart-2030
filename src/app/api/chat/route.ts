import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { normalizePhone } from "@/lib/customer-utils";
import {
  LAPTOP_PRODUCTS,
  ACCESSORY_PRODUCTS,
  LAPMART_BRANCHES,
  MASTER_HOTLINE,
  WHATSAPP_NUMBER
} from "@/data/lapmart-data";
import { FREE_GIFT_ITEMS } from "@/data/product-offers";

const MEMORY_DIR = path.join(process.cwd(), "secure_memory", "customers");

// Build structured, live product inventory text for Gemini AI reasoning
function buildLiveCatalogContext(): string {
  const laptopList = LAPTOP_PRODUCTS.map((lap) => {
    const branches = lap.availableBranches.join(", ");
    const discount = lap.originalPrice
      ? ` (Regular: Rs. ${lap.originalPrice.toLocaleString()}, Save: Rs. ${(lap.originalPrice - lap.price).toLocaleString()})`
      : "";
    const conditionDetail =
      lap.condition === "Brand New"
        ? "Brand New Factory Sealed (2 Years Official Warranty)"
        : `Certified Used Grade A+ (45-Point Lab Certified, ${lap.specs.warranty || "6-12 Months Warranty + 2 Yrs Free Service"})`;

    return `• [SKU: ${lap.sku}] ${lap.name}
  - Brand: ${lap.brand} | Category: ${lap.category} | Condition: ${conditionDetail}
  - Price: Rs. ${lap.price.toLocaleString()} LKR${discount}
  - Core Specs: CPU: ${lap.processor} | RAM: ${lap.ram} | Storage: ${lap.storage} | GPU: ${lap.graphics} | Display: ${lap.display}
  - Battery / Weight: ${lap.specs.battery || "Long-life battery"} | ${lap.specs.weight || "Lightweight"}
  - Operating System: ${lap.specs.os || "Windows 11 Genuine"}
  - Stock: ${lap.inStock ? `In Stock (${lap.stockCount} units available)` : "Out of stock / Pre-order"} | Showrooms: ${branches}
  - Product URL: https://lapmart-v1.epixerp.com/product/${lap.slug}`;
  }).join("\n\n");

  const accessoryList = ACCESSORY_PRODUCTS.map((acc) => {
    return `• [SKU: ${acc.sku}] ${acc.name} - Rs. ${acc.price.toLocaleString()} LKR (${acc.specs}) - Stock: ${acc.inStock ? "In Stock" : "Out of stock"}`;
  }).join("\n");

  const giftList = FREE_GIFT_ITEMS.map((g) => {
    return `• ${g.title} (Retail Value: Rs. ${g.retailValue.toLocaleString()}) - ${g.subtitle}`;
  }).join("\n");

  const branchList = LAPMART_BRANCHES.map((b) => {
    return `• ${b.city}${b.isFlagship ? " (Flagship CyberHub)" : ""}: ${b.address} | Phone: ${b.displayPhone} | Hours: ${b.hours}`;
  }).join("\n");

  return `=== LAPMART 2030 LIVE PRODUCT INVENTORY (${LAPTOP_PRODUCTS.length} LAPTOPS IN STOCK) ===
${laptopList}

=== ACCESSORIES & PERIPHERALS ===
${accessoryList}

=== COMPLIMENTARY 6-PIECE VIP GIFT PACK (FREE WITH EVERY LAPTOP PURCHASE - VALUE RS. 35,000) ===
${giftList}

=== 7 PHYSICAL SHOWROOMS IN SRI LANKA ===
${branchList}
Hotline: ${MASTER_HOTLINE} | WhatsApp: +${WHATSAPP_NUMBER}`;
}

// Base system prompt instructions
const LAPMART_SYSTEM_PROMPT = `You are LapMart AI, the official intelligent hardware advisor and sales specialist for LapMart 2030 — Sri Lanka's premier authorized laptop & computer distribution network.

CRITICAL IDENTITY DIRECTIVE:
If anyone asks "Who are you?", "What is your name?", or similar in any language, ALWAYS clearly state:
"I am LapMart AI, your personal hardware advisor at LapMart 2030."

PRODUCT KNOWLEDGE & ACCURACY DIRECTIVES:
1. ALWAYS reference and quote the EXACT real laptops, SKUs, specifications, and prices from the LIVE PRODUCT INVENTORY below.
2. Prices must ALWAYS be quoted in Sri Lankan Rupees (Rs. / LKR).
3. Distinguish clearly between "Brand New Factory Sealed" (2 Years Official Warranty) and "Certified Used Grade A+" (45-Point Hardware Diagnostics Lab certified, 85%+ battery health, 6-12 Months Hardware Warranty + 2 Years Free Service).
4. Always inform customers about the FREE 6-Piece VIP Gift Pack (Retail Value Rs. 35,000) included with every laptop (CyberArmor Backpack, Silent Mouse, Silicone Shield, Screen Care, etc.).
5. Provide direct clickable product page links (e.g. https://lapmart-v1.epixerp.com/product/[slug]) whenever discussing specific laptops.
6. When recommending for specific budgets (e.g. under 150k, under 250k, 300k+) or use-cases (Gaming, Engineering/CAD, Software Dev, Graphic Design, Daily Study), select the best exact models from our inventory.
7. Mention branch availability (7 showrooms: Anuradhapura, Kandy CyberHub, Colombo Unity Plaza, Kurunegala, Borella, Polonnaruwa, Kandy City) and Islandwide 24-48h courier delivery.
8. If a requested model is not in stock, suggest the closest matching model from our inventory or offer to connect with our procurement team on WhatsApp (+94 71 059 5548).

LANGUAGE BEHAVIOR:
- English: Professional, consultative, tech-savvy, helpful.
- Sinhala (si): Natural, polite, fluent Sinhala (සිංහල). Translate explanations while preserving exact technical specs and prices (e.g., "රු. 385,000").
- Tamil (ta): Natural, polite, fluent Tamil (தமிழ்). Translate explanations while preserving exact technical specs and prices.
- Format with clean markdown bullet points for easy mobile reading. Always offer WhatsApp reservation (+94 71 059 5548).`;

// Fallback response engine if Gemini API Key is missing or offline
function generateFallbackResponse(
  userMsg: string,
  lang: string,
  customerName: string
): string {
  const q = userMsg.toLowerCase().trim();

  // Identity
  if (
    q.includes("who are you") ||
    q.includes("who r u") ||
    q.includes("your name") ||
    q.includes("oya kauruda") ||
    q.includes("kauda") ||
    q.includes("neenga yaar")
  ) {
    if (lang === "si") {
      return `මම **LapMart AI**, ලැප්මාර්ට් ආයතනයේ (LapMart 2030) නිල AI සහායකයා! ${customerName ? customerName + " මහත්මයා/මහත්මිය," : ""} ඔබට අප සතු සියලුම Brand New සහ Certified Used ලැප්ටොප් පරිගණක, මිල ගණන්, පිරිවිතර (Specs), වගකීම් සහ ශාඛා විස්තර ලබාදීමට මම සූදානම්. අද ඔබට අවශ්‍ය තොරතුර කුමක්ද?`;
    }
    if (lang === "ta") {
      return `நான் **LapMart AI**, LapMart 2030 இன் அதிகாரப்பூர்வ AI உதவியாளர்! ${customerName ? customerName + " அவர்களே," : ""} மடிக்கணினிகள் (Laptops), விலைகள் மற்றும் உத்தரவாத விவரங்களை அறிய நான் உதவ முடியும். உங்களுக்கு எவ்வாறு உதவலாம்?`;
    }
    return `I am **LapMart AI**, your personal hardware advisor at LapMart 2030! ${customerName ? customerName + ", " : ""}I have complete access to our catalog of ${LAPTOP_PRODUCTS.length} laptops, custom RAM/NVMe upgrades, branch inventories, and Sri Lankan Rupee pricing. How can I assist you today?`;
  }

  // Search real catalog by keyword
  const matched = LAPTOP_PRODUCTS.filter((lap) => {
    const brandMatch = q.includes(lap.brand.toLowerCase());
    const skuMatch = q.includes(lap.sku.toLowerCase());
    const nameMatch = lap.name.toLowerCase().split(" ").some((w) => w.length > 3 && q.includes(w));
    const catMatch = q.includes("gaming") && lap.category === "Gaming";
    const usedMatch = (q.includes("used") || q.includes("budget") || q.includes("cheap")) && lap.condition === "Used";
    return brandMatch || skuMatch || nameMatch || catMatch || usedMatch;
  });

  if (matched.length > 0) {
    const topMatches = matched.slice(0, 3);
    const list = topMatches.map((lap) => 
      `• **${lap.name}** [SKU: ${lap.sku}]\n  - **Price:** Rs. ${lap.price.toLocaleString()} LKR (${lap.condition})\n  - **Specs:** ${lap.processor} | ${lap.ram} | ${lap.storage} | ${lap.graphics}\n  - **Link:** https://lapmart-v1.epixerp.com/product/${lap.slug}`
    ).join("\n\n");

    if (lang === "si") {
      return `💻 **LapMart සතුව ඇති ගැලපෙන මාදිලි:**\n\n${list}\n\n🎁 **නොමිලේ:** රු. 35,000ක් වටිනා 6-Piece VIP Gift Pack එකක් හිමිවේ!\n📍 දිවයින පුරා ශාඛා 7 කින් ලබාගත හැක. වැඩිදුර තොරතුරු සඳහා WhatsApp අමතන්න: **071 059 5548**`;
    }
    return `💻 **Matching Models from our Live Inventory:**\n\n${list}\n\n🎁 **Bonus:** Includes Free 6-Piece VIP Gift Pack (Value: Rs. 35,000)!\n📍 Available across our 7 physical showrooms or via Islandwide Express Delivery (24-48 hrs). WhatsApp: **071 059 5548**`;
  }

  // Branches
  if (q.includes("branch") || q.includes("location") || q.includes("where") || q.includes("showrooms") || q.includes("kandy") || q.includes("colombo")) {
    if (lang === "si") {
      return `📍 **LapMart ශාඛා ජාලය (දිවයින පුරා 7ක්):**\n\n• **අනුරාධපුරය (ප්‍රධාන මධ්‍යස්ථානය):** නව බස් නැවතුම්පළ\n• **මහනුවර (CyberHub Flagship):** පේරාදෙණිය පාර\n• **කොළඹ 04:** Unity Plaza, බම්බලපිටිය\n• **කුරුණෑගල:** කොළඹ පාර\n• **බොරැල්ල:** ඩී.එස්. සේනානායක මාවත\n• **මහනුවර (City Center):** දළදා වීදිය\n• **පොළොන්නරුව:** කදුරුවෙල\n\nක්ෂණික ඇමතුම්: **071 059 5548**`;
    }
    return `📍 **LapMart 7 Physical Showrooms:**\n\n• **Anuradhapura (Main Hub):** 488/11, Maithripala Senanayake Mw, New Bus Stand\n• **Kandy Flagship CyberHub:** Peradeniya Road\n• **Colombo (Bambalapitiya):** Unity Plaza Commercial Complex\n• **Kurunegala:** No. 42, Colombo Road\n• **Borella (Colombo 08):** No. 18, D.S. Senanayake Mw\n• **Kandy City:** No. 65, Dalada Veediya\n• **Polonnaruwa:** Main Street, Kaduruwela\n\nOfficial Hotline: **071 059 5548** | WhatsApp: **+94 71 059 5548**`;
  }

  // General default
  if (lang === "si") {
    return `ස්තූතියි ${customerName ? customerName + " " : ""}ඔබගේ පණිවිඩයට! LapMart AI ලෙස අප සතු ලැප්ටොප් ${LAPTOP_PRODUCTS.length} මාදිලි අතරින් Gaming, Graphic Design, Business හෝ Study සඳහා වඩාත්ම ගැළපෙන ලැප්ටොප් එක තෝරා ගැනීමට මම උදවු කරන්නම්. ඔබට අවශ්‍ය මිල පරාසය (Budget) හෝ Brand එක කුමක්ද? (WhatsApp: 071 059 5548)`;
  }
  return `Thank you ${customerName ? customerName + "! " : "for messaging! "}As LapMart AI, I can help you find the exact laptop matching your needs from our live stock of ${LAPTOP_PRODUCTS.length} models (Brand New & Certified Used Grade A+). What is your budget or target use-case?`;
}

// Helper to log interaction to customer markdown file
function appendToCustomerMemory(phone: string, userText: string, aiText: string) {
  try {
    const cleanPhone = normalizePhone(phone);
    if (!cleanPhone || cleanPhone.length < 9) return;

    if (!fs.existsSync(MEMORY_DIR)) return;
    const files = fs.readdirSync(MEMORY_DIR);
    const match = files.find((f) => f.startsWith(cleanPhone + "_") && f.endsWith(".md"));

    if (match) {
      const filepath = path.join(MEMORY_DIR, match);
      const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      const entry = `\n- **[${time}] Customer**: ${userText.trim()}\n- **[${time}] LapMart AI**: ${aiText.trim()}`;
      fs.appendFileSync(filepath, entry, "utf8");
    }
  } catch (err) {
    console.error("Failed to append to customer memory file:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      message,
      phone = "",
      name = "",
      language = "en",
      history = [],
      memoryNotes = ""
    } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message text is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Check if API key is provided and valid
    if (apiKey && apiKey !== "your_gemini_api_key_here" && apiKey.trim().length > 10) {
      try {
        // Construct Gemini messages payload
        const langInstruction =
          language === "si"
            ? "IMPORTANT: Respond ONLY in natural, fluent Sinhala (සිංහල)."
            : language === "ta"
            ? "IMPORTANT: Respond ONLY in natural, fluent Tamil (தமிழ்)."
            : "Respond in clear, professional English.";

        const customerContext = name
          ? `Customer Name: ${name}. Mobile: ${phone}. Previous memory: ${memoryNotes || "None"}.`
          : `Mobile: ${phone || "Not provided"}.`;

        const liveCatalog = buildLiveCatalogContext();
        const systemInstruction = `${LAPMART_SYSTEM_PROMPT}\n\n${liveCatalog}\n\n${langInstruction}\n\nCustomer Profile: ${customerContext}`;

        // Format history for Gemini API (contents array)
        const contents = [];

        // Append conversation history
        if (Array.isArray(history)) {
          for (const item of history.slice(-8)) {
            contents.push({
              role: item.role === "user" ? "user" : "model",
              parts: [{ text: item.text }]
            });
          }
        }

        // Add current user message
        contents.push({
          role: "user",
          parts: [{ text: message }]
        });

        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

        const geminiRes = await fetch(geminiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            systemInstruction: {
              parts: [{ text: systemInstruction }]
            },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
              thinkingConfig: {
                thinkingBudget: 0
              }
            }
          })
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const replyText =
            geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
            generateFallbackResponse(message, language, name);

          // Save to markdown memory
          if (phone) {
            appendToCustomerMemory(phone, message, replyText);
          }

          return NextResponse.json({
            reply: replyText,
            source: "gemini-3.6-flash",
            language
          });
        } else {
          const errText = await geminiRes.text();
          console.warn("Gemini API call returned non-200:", geminiRes.status, errText);
        }
      } catch (geminiError) {
        console.error("Gemini API request failed:", geminiError);
      }
    }

    // Fallback response if API key is not present or failed
    const fallbackReply = generateFallbackResponse(message, language, name);

    if (phone) {
      appendToCustomerMemory(phone, message, fallbackReply);
    }

    return NextResponse.json({
      reply: fallbackReply,
      source: "lapmart-rule-engine",
      language,
      note: apiKey ? "Gemini request fallback" : "Using LapMart engine (set GEMINI_API_KEY in .env.local for full LLM reasoning)"
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal chat processing error", details: error.message },
      { status: 500 }
    );
  }
}
