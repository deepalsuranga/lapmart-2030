import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, AUTH_TOKEN_VALUE } from "./lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = sessionToken === AUTH_TOKEN_VALUE;

  // Protect /system and all sub-routes (e.g. /system/chat)
  if (pathname === "/system" || pathname.startsWith("/system/")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already logged in and visiting /login, redirect directly to /system/chat
  if (pathname === "/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/system/chat", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/system/:path*", "/system", "/login"]
};
