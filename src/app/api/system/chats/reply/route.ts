import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { AUTH_COOKIE_NAME, AUTH_TOKEN_VALUE } from "@/lib/auth";
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("94") && digits.length === 11) {
    return "0" + digits.slice(2);
  }
  return digits;
}

const MEMORY_DIR = path.join(process.cwd(), "secure_memory", "customers");

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (token !== AUTH_TOKEN_VALUE) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const { phone, text } = body;

    if (!phone || !text?.trim()) {
      return NextResponse.json(
        { error: "Phone number and message text are required" },
        { status: 400 }
      );
    }

    const cleanPhone = normalizePhone(phone);
    if (!fs.existsSync(MEMORY_DIR)) {
      return NextResponse.json({ error: "Memory directory not found" }, { status: 404 });
    }

    const files = fs.readdirSync(MEMORY_DIR);
    const match = files.find((f) => f.startsWith(cleanPhone + "_") && f.endsWith(".md"));

    if (!match) {
      return NextResponse.json(
        { error: `No customer record found for phone: ${cleanPhone}` },
        { status: 404 }
      );
    }

    const filepath = path.join(MEMORY_DIR, match);
    let content = fs.readFileSync(filepath, "utf8");

    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const nowIso = new Date().toISOString();

    // Update Last Interaction timestamp
    if (content.includes("- **Last Interaction**:")) {
      content = content.replace(
        /- \*\*Last Interaction\*\*:[^\r\n]*/,
        `- **Last Interaction**: ${nowIso}`
      );
    }

    // Append staff reply
    const replyEntry = `\n- **[${time}] Staff**: ${text.trim()}`;
    content = content.trimEnd() + replyEntry + "\n";

    fs.writeFileSync(filepath, content, "utf8");

    return NextResponse.json({
      success: true,
      message: {
        id: `msg-staff-${Date.now()}`,
        time,
        sender: "Staff",
        text: text.trim()
      }
    });
  } catch (error: any) {
    console.error("Error sending staff reply:", error);
    return NextResponse.json(
      { error: "Failed to send staff reply", details: error.message },
      { status: 500 }
    );
  }
}
