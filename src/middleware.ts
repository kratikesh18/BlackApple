import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  console.log("\n========== 🔐 MIDDLEWARE START ==========");

  console.log("➡️ URL:", request.url);

  console.log("➡️ Pathname:", request.nextUrl.pathname);

  console.log("➡️ NEXTAUTH_SECRET exists:", !!process.env.NEXTAUTH_SECRET);

  console.log(
    "➡️ NEXTAUTH_SECRET length:",
    process.env.NEXTAUTH_SECRET?.length || 0,
  );

  // Try getting token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("➡️ Token exists:", !!token);

  console.log("➡️ Full Token:", token);

  const { pathname } = request.nextUrl;

  // 🚫 NOT AUTHENTICATED
  if (!token && pathname.startsWith("/profile")) {
    console.log("❌ User NOT authenticated");

    console.log("🔁 Redirecting to /login");

    console.log("========== 🔐 MIDDLEWARE END ==========\n");

    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ AUTHENTICATED but accessing login
  if (token && pathname.startsWith("/login")) {
    console.log("✅ User authenticated");

    console.log("🔁 Redirecting to /profile");

    console.log("========== 🔐 MIDDLEWARE END ==========\n");

    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // ✅ Allow
  console.log("✅ Access allowed");

  console.log("========== 🔐 MIDDLEWARE END ==========\n");

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/login"],
};
