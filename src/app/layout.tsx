import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AuthProvider from "@/context/AuthProvider";

import SessionLayout from "@/context/SessionLayout";
import { MainLayout } from "@/components/layouts/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "blackApple : A Lyrics Libarary",
  description:
    "A free lyrics library where you can find lyrics of all songs, made by an Indian developer.",
  authors: [{ name: "Kartikesh Pachkawade" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} mx-auto antialiased min-h-screen max-h-screen
      overflow-y-auto scrollbar-none bg-gradient-to-br from-gray-900 via-purple-950 to-black text-white flex h-screen `}
      >
        <AuthProvider>
          <SessionLayout>
            <MainLayout>{children}</MainLayout>
          </SessionLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
