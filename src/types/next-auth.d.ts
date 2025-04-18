// next-auth.d.ts (or inside your types directory)

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    error?: string;
  }

  interface User {
    name: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    isVerified?: boolean;
    userType?: string;
    image?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }
}
