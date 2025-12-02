import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AuthProvider from "@/context/AuthProvider";

import SessionLayout from "@/context/SessionLayout";
import { MainLayout } from "@/components/layouts/MainLayout";



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
        className={` mx-auto antialiased min-h-screen max-h-screen
      overflow-y-auto scrollbar-none bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white flex flex-col h-screen `}
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
