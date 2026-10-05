import { NextRequest, NextResponse } from "next/server";
import { ADMIN_CREDENTIALS, AUTH_COOKIE_NAME, AUTH_TOKEN_VALUE } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (token === AUTH_TOKEN_VALUE) {
    return NextResponse.json({
      authenticated: true,
      user: {
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name,
        role: ADMIN_CREDENTIALS.role
      }
    });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
