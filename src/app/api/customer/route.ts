import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { normalizePhone } from "@/lib/customer-utils";

const MEMORY_DIR = path.join(process.cwd(), "secure_memory", "customers");

// Helper to ensure memory directory exists
function ensureMemoryDir() {
  if (!fs.existsSync(MEMORY_DIR)) {
    fs.mkdirSync(MEMORY_DIR, { recursive: true });
  }
}

// Search for customer file matching `${phone}_*.md`
function findCustomerFile(phone: string): { filename: string; filepath: string } | null {
  ensureMemoryDir();
  const cleanPhone = normalizePhone(phone);
  if (!cleanPhone || cleanPhone.length < 9) return null;

  const files = fs.readdirSync(MEMORY_DIR);
  const match = files.find((f) => f.startsWith(cleanPhone + "_") && f.endsWith(".md"));
  if (match) {
    return { filename: match, filepath: path.join(MEMORY_DIR, match) };
  }
  return null;
}

// Simple parser for customer markdown file
function parseCustomerMarkdown(content: string) {
  const nameMatch = content.match(/\*\*Customer Name\*\*:\s*([^\n\r]+)/i);
  const phoneMatch = content.match(/\*\*Mobile Number\*\*:\s*([^\n\r]+)/i);
  const uuidMatch = content.match(/\*\*UUID\*\*:\s*([^\n\r]+)/i);
  const langMatch = content.match(/\*\*Preferred Language\*\*:\s*([^\n\r]+)/i);
  const interestsMatch = content.match(/\*\*Interests\*\*:\s*([^\n\r]+)/i);

  // Extract memory notes section
  let notes = "";
  const notesIndex = content.indexOf("## Memory & Preferences Notes");
  const logIndex = content.indexOf("## Chat Interaction Log");
  if (notesIndex !== -1) {
    const end = logIndex !== -1 ? logIndex : content.length;
    notes = content.substring(notesIndex + 29, end).trim();
  }

  // Extract chat interaction log
  const messages: { id: string; role: "user" | "assistant" | "staff"; sender: string; text: string; time: string }[] = [];
  if (logIndex !== -1) {
    const logSection = content.substring(logIndex + 24).trim();
    const lines = logSection.split(/\r?\n/);

    let currentMsg: { id: string; role: "user" | "assistant" | "staff"; sender: string; text: string; time: string } | null = null;
    let msgIdx = 0;

    for (const line of lines) {
      const match = line.match(/^-\s*\*\*\[([^\]]+)\]\s*([^*:]+)\*\*:\s*(.*)$/);
      if (match) {
        if (currentMsg) {
          messages.push(currentMsg);
        }

        const time = match[1].trim();
        const rawSender = match[2].trim().toLowerCase();
        const initialText = match[3];

        let role: "user" | "assistant" | "staff" = "user";
        let sender = "Customer";
        if (rawSender.includes("ai") || rawSender.includes("lapmart")) {
          role = "assistant";
          sender = "LapMart AI";
        } else if (rawSender.includes("staff") || rawSender.includes("admin")) {
          role = "staff";
          sender = "LapMart Staff";
        }

        currentMsg = {
          id: `msg-${msgIdx++}`,
          role,
          sender,
          text: initialText,
          time
        };
      } else if (currentMsg) {
        currentMsg.text += "\n" + line;
      }
    }

    if (currentMsg) {
      messages.push(currentMsg);
    }
  }

  messages.forEach((m) => {
    m.text = m.text.trim();
  });

  return {
    name: nameMatch ? nameMatch[1].trim() : "Valued Customer",
    phone: phoneMatch ? phoneMatch[1].trim() : "",
    uuid: uuidMatch ? uuidMatch[1].trim() : "",
    language: langMatch ? langMatch[1].trim().toLowerCase() : "en",
    interests: interestsMatch
      ? interestsMatch[1].split(",").map((s) => s.trim()).filter(Boolean)
      : [],
    memoryNotes: notes,
    messages
  };
}

// GET: Check customer existence and load profile
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    const found = findCustomerFile(phone);
    if (!found) {
      return NextResponse.json({
        exists: false,
        normalizedPhone: normalizePhone(phone)
      });
    }

    const content = fs.readFileSync(/*turbopackIgnore: true*/ found.filepath, "utf8");
    const parsed = parseCustomerMarkdown(content);

    return NextResponse.json({
      exists: true,
      customer: {
        ...parsed,
        filename: found.filename
      }
    });
  } catch (error: any) {
    console.error("Error checking customer:", error);
    return NextResponse.json(
      { error: "Failed to read customer record", details: error.message },
      { status: 500 }
    );
  }
}

// POST: Create or update customer markdown memory
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      phone,
      name,
      language = "en",
      interests = [],
      memoryNote,
      chatMessage
    } = body;

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    ensureMemoryDir();
    const cleanPhone = normalizePhone(phone);
    const existing = findCustomerFile(cleanPhone);

    const now = new Date().toISOString();
    let uuid = "";
    let finalName = name?.trim() || "Valued Customer";
    let finalLang = language;
    let finalInterests = Array.isArray(interests) ? interests : [];
    let existingNotes = "";
    let chatLog = "";
    let filepath = "";

    if (existing) {
      const content = fs.readFileSync(/*turbopackIgnore: true*/ existing.filepath, "utf8");
      const parsed = parseCustomerMarkdown(content);
      uuid = parsed.uuid;
      if (!name && parsed.name) finalName = parsed.name;
      if (!language && parsed.language) finalLang = parsed.language;
      if (finalInterests.length === 0 && parsed.interests.length > 0) {
        finalInterests = parsed.interests;
      }
      existingNotes = parsed.memoryNotes;
      filepath = existing.filepath;

      // Extract existing chat log
      const logIdx = content.indexOf("## Chat Interaction Log");
      if (logIdx !== -1) {
        chatLog = content.substring(logIdx + 24).trim();
      }
    } else {
      uuid = crypto.randomUUID();
      const shortUuid = uuid.split("-")[0];
      const filename = `${cleanPhone}_${shortUuid}.md`;
      filepath = path.join(MEMORY_DIR, filename);
    }

    // Append new note if provided
    if (memoryNote) {
      const timestamp = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      existingNotes += `\n- [${timestamp}]: ${memoryNote}`;
    }

    // Append chat message if provided
    if (chatMessage && chatMessage.text) {
      const roleLabel = chatMessage.role === "user" ? "Customer" : "LapMart AI";
      const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      chatLog += `\n- **[${time}] ${roleLabel}**: ${chatMessage.text.trim()}`;
    }

    const markdownOutput = `# LapMart Customer Memory Profile

- **Customer Name**: ${finalName}
- **Mobile Number**: ${cleanPhone}
- **UUID**: ${uuid}
- **Preferred Language**: ${finalLang}
- **Last Interaction**: ${now}
- **Interests**: ${finalInterests.length > 0 ? finalInterests.join(", ") : "General Hardware, Laptops"}

## Memory & Preferences Notes
${existingNotes.trim() || "- New customer inquiry initiated."}

## Chat Interaction Log
${chatLog.trim() || "- Session started."}
`;

    fs.writeFileSync(filepath, markdownOutput, "utf8");

    return NextResponse.json({
      success: true,
      customer: {
        name: finalName,
        phone: cleanPhone,
        uuid,
        language: finalLang,
        interests: finalInterests,
        filename: path.basename(filepath)
      }
    });
  } catch (error: any) {
    console.error("Error saving customer memory:", error);
    return NextResponse.json(
      { error: "Failed to save customer memory", details: error.message },
      { status: 500 }
    );
  }
}
