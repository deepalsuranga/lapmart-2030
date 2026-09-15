import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { normalizePhone } from "../customer/route";

const MEMORY_DIR = path.join(process.cwd(), "secure_memory", "customers");

// LapMart Knowledge Base for Prompt Context
const LAPMART_SYSTEM_PROMPT = `You are LapMart AI, the official intelligent hardware advisor and customer assistant for LapMart 2030 — Sri Lanka's leading computer & laptop distribution network.

CRITICAL IDENTITY DIRECTIVE:
If anyone asks "Who are you?", "What is your name?", or anything similar in any language, ALWAYS clearly state:
"I am LapMart AI, your personal hardware advisor at LapMart 2030."

STORE DETAILS & POLICIES:
- Branches: 7 physical showrooms across Sri Lanka:
  1. Anuradhapura (Main Hub): 488/11, Maithripala Senanayake Mawatha, New Bus Stand.
  2. Kandy Flagship (CyberHub): Peradeniya Road, Kandy.
  3. Colombo (Bambalapitiya): Unity Plaza Commercial Complex, Galle Road.
  4. Kurunegala: No. 42, Colombo Road.
  5. Colombo (Borella): No. 18, D.S. Senanayake Mawatha.
  6. Kandy (City Center): No. 65, Dalada Veediya.
  7. Polonnaruwa: Main Street, Kaduruwela.
- Hotline: 071 059 5548 / 076 140 7320
- WhatsApp: +94 71 059 5548
- Products: Factory sealed Brand New laptops (Acer Nitro, ASUS ROG, HP, Dell XPS, MacBook) and Certified Used Grade A+ Business Workstations (Lenovo ThinkPad T490, HP ZBook).
- Warranty: 2 Years on Brand New; 6-12 Months on Certified Used + 2 Years free service.
- 45-Point Hardware Diagnostics Lab: Barcode certificate verifying thermals, battery health (85%+), SSD health, display uniformity.
- Delivery: Islandwide express courier within 24-48 hours.
- Currency: Always quote prices in Sri Lankan Rupees (Rs. / LKR).

LANGUAGE BEHAVIOR:
- If the customer's selected language is English: Respond in fluent, polite, consultative English.
- If the customer's selected language is Sinhala (si): Respond naturally in fluent Sinhala (සිංහල).
- If the customer's selected language is Tamil (ta): Respond naturally in fluent Tamil (தமிழ்).
- Keep responses concise, friendly, and formatted with bullet points for easy reading on mobile devices. Always offer to connect with showroom technicians on WhatsApp when they want to reserve a machine.`;

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
      return `මම **LapMart AI**, ලැප්මාර්ට් ආයතනයේ (LapMart 2030) නිල AI සහායකයා! ${customerName ? customerName + " මහත්මයා/මහත්මිය," : ""} ඔබට අවශ්‍ය ලැප්ටොප් පරිගණක, මිල ගණන්, වගකීම් සහ අලුත්වැඩියා විස්තර ලබාදීමට මම සූදානම්. අද මට ඔබට උදවු කළ හැක්කේ කෙසේද?`;
    }
    if (lang === "ta") {
      return `நான் **LapMart AI**, LapMart 2030 இன் அதிகாரப்பூர்வ AI உதவியாளர்! ${customerName ? customerName + " அவர்களே," : ""} சிறந்த மடிக்கணினிகள் (Laptops), விலைகள் மற்றும் உத்தரவாத விவரங்களை அறிய நான் உதவ முடியும். உங்களுக்கு எவ்வாறு உதவலாம்?`;
    }
    return `I am **LapMart AI**, your personal hardware advisor at LapMart 2030! ${customerName ? customerName + ", " : ""}I can assist you with laptop recommendations, custom RAM/NVMe upgrades, branch locations, and pricing in Sri Lankan Rupees. How can I help you today?`;
  }

  // Gaming
  if (q.includes("gaming") || q.includes("rtx") || q.includes("graphic")) {
    if (lang === "si") {
      return `🎮 **LapMart Gaming Rigs:**\n\n1. **Acer Nitro 16 AI** - AMD Ryzen 7 8845HS, 16GB DDR5, 1TB NVMe, RTX 4060 8GB (Rs. 385,000)\n2. **MSI Thin A15** - Ryzen 5 7535HS, 16GB DDR5, RTX 3050 (Rs. 248,000)\n3. **ASUS ROG Strix G16** - i7 14th Gen, RTX 4070 (Rs. 465,000)\n\nසියලුම Gaming පරිගණක සඳහා වසර 2 ක නිල වගකීමක් හිමිවේ. ඔබට කැමති මොඩලය කුමක්ද?`;
    }
    if (lang === "ta") {
      return `🎮 **LapMart கேமிங் லேப்டாப்கள்:**\n\n1. **Acer Nitro 16 AI** - Ryzen 7, RTX 4060 8GB (ரூ. 385,000)\n2. **MSI Thin A15** - RTX 3050 (ரூ. 248,000)\n3. **ASUS ROG Strix G16** - RTX 4070 (ரூ. 465,000)\n\n2 வருட உத்தியோகபூர்வ உத்தரவாதம் உண்டு. நீங்கள் எதனைப் பற்றி மேலும் அறிய விரும்புகிறீர்கள்?`;
    }
    return `🎮 **Top Gaming Rigs at LapMart:**\n\n1. **Acer Nitro 16 AI Gaming Rig** — AMD Ryzen 7 8845HS, 16GB DDR5, 1TB NVMe, RTX 4060 8GB (Rs. 385,000)\n2. **MSI Thin A15** — Ryzen 5 7535HS, 16GB DDR5, RTX 3050 6GB (Rs. 248,000)\n3. **ASUS ROG Strix G16** — i7 14th Gen, RTX 4070 (Rs. 465,000)\n\nAll units come factory sealed with 2 Years LapMart Comprehensive Warranty. Would you like to reserve one at your nearest showroom?`;
  }

  // Budget / Used
  if (q.includes("used") || q.includes("budget") || q.includes("cheap") || q.includes("thinkpad") || q.includes("aduma")) {
    if (lang === "si") {
      return `💼 **Certified Used & Budget Workstations (Grade A+):**\n\n1. **Lenovo ThinkPad T490** - i5 8th Gen, 8GB RAM, 256GB SSD, 14\" Touch (Rs. 97,000)\n2. **HP ZBook 14 G8 Workstation** - i5 10th Gen, 8GB RAM, 256GB Turbo SSD (Rs. 121,000)\n\n45-Point Hardware පරීක්ෂාව සම්පූර්ණ කර ඇත. මාස 6ක දෘඩාංග වගකීම සහ වසර 2ක නොමිලේ සේවා වගකීමක් හිමිවේ!`;
    }
    if (lang === "ta") {
      return `💼 **சான்றளிக்கப்பட்ட பயன்படுத்தப்பட்ட லேப்டாப்கள் (Grade A+):**\n\n1. **Lenovo ThinkPad T490** - i5 8th Gen, 8GB RAM, 256GB SSD, Touch (ரூ. 97,000)\n2. **HP ZBook 14 G8** - i5 10th Gen, 256GB SSD (ரூ. 121,000)\n\n45-Point பரிசோதிக்கப்பட்டவை. 6 மாத வன்பொருள் உத்தரவாதம் & 2 வருட இலவச சேவை வழங்கப்படுகிறது!`;
    }
    return `💼 **Certified Used Workstations (Grade A+ Tested):**\n\n1. **Lenovo ThinkPad T490** — Intel Core i5 8th Gen, 8GB RAM, 256GB SSD, 14\" Touch (Rs. 97,000)\n2. **HP ZBook 14 G8 Workstation** — Core i5 10th Gen, 8GB RAM, 256GB SSD (Rs. 121,000)\n\nBoth models have passed our 45-Point Hardware Diagnostics Lab and include 6 Months Hardware Warranty + 2 Years Free Service.`;
  }

  // Branches
  if (q.includes("branch") || q.includes("location") || q.includes("where") || q.includes("showrooms") || q.includes("kandy") || q.includes("colombo")) {
    if (lang === "si") {
      return `📍 **LapMart ශාඛා ජාලය (Islandwide):**\n\n• **අනුරාධපුරය (ප්‍රධාන මධ්‍යස්ථානය):** නව බස් නැවතුම්පළ ඉදිරිපිට\n• **මහනුවර (CyberHub):** පේරාදෙණිය පාර\n• **කොළඹ 04:** යුනිටි ප්ලාසා (Unity Plaza), බම්බලපිටිය\n• **කුරුණෑගල:** කොළඹ පාර\n• **බොරැල්ල:** ඩී.එස්. සේනානායක මාවත\n• **පොළොන්නරුව:** ප්‍රධාන වීදිය, කදුරුවෙල\n\nක්ෂණික ඇමතුම්: **071 059 5548**`;
    }
    if (lang === "ta") {
      return `📍 **LapMart கிளைகள் (Islandwide):**\n\n• **அனுராதபுரம்:** புதிய பஸ் நிலையம் அருகில்\n• **கண்டி (CyberHub):** பேராதனை வீதி\n• **கொழும்பு 04:** Unity Plaza, பம்பலப்பிட்டி\n• **குருணாகல்:** கொழும்பு வீதி\n• **பொரளை:** டி.எஸ். சேனாநாயக்க வீதி\n\nஉடனடி தொடர்பு: **071 059 5548**`;
    }
    return `📍 **LapMart 7 Physical Showrooms:**\n\n• **Anuradhapura (Main Hub):** 488/11, Maithripala Senanayake Mw, New Bus Stand\n• **Kandy Flagship CyberHub:** Peradeniya Road\n• **Colombo (Bambalapitiya):** Unity Plaza 4th Floor\n• **Kurunegala:** No. 42, Colombo Road\n• **Borella (Colombo 08):** No. 18, D.S. Senanayake Mw\n• **Kandy City:** No. 65, Dalada Veediya\n• **Polonnaruwa:** Main Street, Kaduruwela\n\nOfficial Hotline: **071 059 5548**`;
  }

  // General default
  if (lang === "si") {
    return `ස්තූතියි ${customerName ? customerName + " " : ""}ඔබගේ පණිවිඩයට! LapMart AI ලෙස මට ඔබට Gaming පරිගණක, Business Ultrabooks, RAM/SSD Upgrades හෝ ශාඛා විස්තර ලබාදිය හැක. ඔබට අවශ්‍ය නිශ්චිත විස්තරය කුමක්ද? (හෝ WhatsApp මගින් 071 059 5548 අමතන්න)`;
  }
  if (lang === "ta") {
    return `நன்றி ${customerName ? customerName + " " : ""}உங்கள் செய்திக்கு! LapMart AI உங்களுக்கான சிறந்த லேப்டாப்கள், விலைகள் அல்லது கிளை வழிகாட்டல்களை வழங்க தயாராக உள்ளது. நீங்கள் என்ன தேடுகிறீர்கள்?`;
  }
  return `Thank you ${customerName ? customerName + "! " : "for messaging! "}As LapMart AI, I can help you choose the ideal laptop based on your budget, check warranty status, or arrange showroom pickup. What are you looking to accomplish today?`;
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

        const systemInstruction = `${LAPMART_SYSTEM_PROMPT}\n\n${langInstruction}\n\nCustomer Profile: ${customerContext}`;

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
