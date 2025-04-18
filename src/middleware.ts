import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/profile", "/login"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // console.log(token);
  
  const { pathname } = request.nextUrl;

  // If user is NOT authenticated and trying to access a protected route
  if (!token && pathname.startsWith("/profile")) {
    console.log(
      "❌ Unauthenticated access to /profile - redirecting to /login"
    );
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user IS authenticated and trying to access the login page
  if (token && pathname.startsWith("/login")) {
    console.log("✅ Authenticated user - redirecting from /login to /profile");
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // Allow access to all other routes
  return NextResponse.next();
}
