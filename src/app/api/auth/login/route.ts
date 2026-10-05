import { NextRequest, NextResponse } from "next/server";
import { ADMIN_CREDENTIALS, AUTH_COOKIE_NAME, AUTH_TOKEN_VALUE } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const trimmedEmail = (email || "").trim().toLowerCase();
    const trimmedPassword = (password || "").trim();

    if (
      trimmedEmail === ADMIN_CREDENTIALS.email.toLowerCase() &&
      trimmedPassword === ADMIN_CREDENTIALS.password
    ) {
      const response = NextResponse.json({
        success: true,
        user: {
          email: ADMIN_CREDENTIALS.email,
          name: ADMIN_CREDENTIALS.name,
          role: ADMIN_CREDENTIALS.role
        }
      });

      // Set auth cookie valid for 7 days
      response.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: AUTH_TOKEN_VALUE,
        httpOnly: false, // allow client-side sync as well
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { error: "Invalid email or password. Please use authorized admin credentials." },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to process login request", details: error.message },
      { status: 500 }
    );
  }
}
