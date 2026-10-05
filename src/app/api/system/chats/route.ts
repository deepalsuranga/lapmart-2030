import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { AUTH_COOKIE_NAME, AUTH_TOKEN_VALUE } from "@/lib/auth";

const MEMORY_DIR = path.join(process.cwd(), "secure_memory", "customers");

export interface SystemChatMessage {
  id: string;
  time: string;
  sender: "Customer" | "LapMart AI" | "Staff" | "System";
  text: string;
}

export interface CustomerChatProfile {
  filename: string;
  name: string;
  phone: string;
  uuid: string;
  language: string;
  lastInteraction: string;
  interests: string[];
  memoryNotes: string[];
  messages: SystemChatMessage[];
  messageCount: number;
  latestMessage?: SystemChatMessage;
}

function parseCustomerChatMarkdown(filename: string, content: string): CustomerChatProfile {
  const nameMatch = content.match(/\*\*Customer Name\*\*:\s*([^\n\r]+)/i);
  const phoneMatch = content.match(/\*\*Mobile Number\*\*:\s*([^\n\r]+)/i);
  const uuidMatch = content.match(/\*\*UUID\*\*:\s*([^\n\r]+)/i);
  const langMatch = content.match(/\*\*Preferred Language\*\*:\s*([^\n\r]+)/i);
  const lastInteractionMatch = content.match(/\*\*Last Interaction\*\*:\s*([^\n\r]+)/i);
  const interestsMatch = content.match(/\*\*Interests\*\*:\s*([^\n\r]+)/i);

  // Extract memory notes
  const notes: string[] = [];
  const notesIndex = content.indexOf("## Memory & Preferences Notes");
  const logIndex = content.indexOf("## Chat Interaction Log");
  if (notesIndex !== -1) {
    const end = logIndex !== -1 ? logIndex : content.length;
    const rawNotes = content.substring(notesIndex + 29, end).trim();
    rawNotes.split("\n").forEach((line) => {
      const cleaned = line.replace(/^-\s*/, "").trim();
      if (cleaned && !cleaned.toLowerCase().includes("no notes")) {
        notes.push(cleaned);
      }
    });
  }

  // Extract chat interaction log
  const messages: SystemChatMessage[] = [];
  if (logIndex !== -1) {
    const logSection = content.substring(logIndex + 24).trim();
    const lines = logSection.split(/\r?\n/);

    let currentMsg: SystemChatMessage | null = null;
    let msgIdx = 0;

    for (const line of lines) {
      // Match "- **[01:21 PM] Customer**: message content"
      const match = line.match(/^-\s*\*\*\[([^\]]+)\]\s*([^*:]+)\*\*:\s*(.*)$/);
      if (match) {
        if (currentMsg) {
          messages.push(currentMsg);
        }

        const time = match[1].trim();
        const rawSender = match[2].trim().toLowerCase();
        const initialText = match[3];

        let sender: SystemChatMessage["sender"] = "Customer";
        if (rawSender.includes("ai") || rawSender.includes("lapmart")) {
          sender = "LapMart AI";
        } else if (rawSender.includes("staff") || rawSender.includes("admin")) {
          sender = "Staff";
        } else if (rawSender.includes("system")) {
          sender = "System";
        }

        currentMsg = {
          id: `msg-${filename}-${msgIdx++}`,
          time,
          sender,
          text: initialText
        };
      } else if (currentMsg) {
        // Multi-line continuation
        currentMsg.text += "\n" + line;
      }
    }

    if (currentMsg) {
      messages.push(currentMsg);
    }
  }

  // Clean up message text
  messages.forEach((m) => {
    m.text = m.text.trim();
  });

  const name = nameMatch ? nameMatch[1].trim() : "Valued Customer";
  const phone = phoneMatch ? phoneMatch[1].trim() : filename.split("_")[0];
  const uuid = uuidMatch ? uuidMatch[1].trim() : "";
  const language = langMatch ? langMatch[1].trim().toLowerCase() : "en";
  const lastInteraction = lastInteractionMatch ? lastInteractionMatch[1].trim() : "";
  const interests = interestsMatch
    ? interestsMatch[1].split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return {
    filename,
    name,
    phone,
    uuid,
    language,
    lastInteraction,
    interests,
    memoryNotes: notes,
    messages,
    messageCount: messages.length,
    latestMessage: messages.length > 0 ? messages[messages.length - 1] : undefined
  };
}

export async function GET(request: NextRequest) {
  try {
    // Verify session
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (token !== AUTH_TOKEN_VALUE) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    if (!fs.existsSync(MEMORY_DIR)) {
      return NextResponse.json({ customers: [], stats: { totalCustomers: 0, totalMessages: 0 } });
    }

    const files = fs.readdirSync(MEMORY_DIR).filter((f) => f.endsWith(".md"));
    const customers: CustomerChatProfile[] = [];

    let totalMessages = 0;
    const languages: Record<string, number> = { en: 0, si: 0, ta: 0 };

    for (const file of files) {
      try {
        const fullPath = path.join(MEMORY_DIR, file);
        const content = fs.readFileSync(fullPath, "utf8");
        const profile = parseCustomerChatMarkdown(file, content);
        customers.push(profile);

        totalMessages += profile.messageCount;
        languages[profile.language] = (languages[profile.language] || 0) + 1;
      } catch (err) {
        console.error(`Error parsing customer file ${file}:`, err);
      }
    }

    // Sort customers by last interaction or file mtime descending
    customers.sort((a, b) => {
      const timeA = a.lastInteraction ? new Date(a.lastInteraction).getTime() : 0;
      const timeB = b.lastInteraction ? new Date(b.lastInteraction).getTime() : 0;
      return timeB - timeA;
    });

    return NextResponse.json({
      customers,
      stats: {
        totalCustomers: customers.length,
        totalMessages,
        languages
      }
    });
  } catch (error: any) {
    console.error("System chats API error:", error);
    return NextResponse.json(
      { error: "Failed to load customer chats", details: error.message },
      { status: 500 }
    );
  }
}
