// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const pathname = req.nextUrl.pathname;

  // 1. If logged in and visiting /login or /register → redirect home
  if (token && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2. Employee-only route
  if (pathname.startsWith("/checkpoint")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (role !== "employee") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // 3. Admin-only route
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only on these routes
export const config = {
  matcher: ["/login", "/register", "/checkpoint", "/admin"],
};
