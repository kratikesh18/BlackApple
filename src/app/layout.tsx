import type { Metadata } from "next";
import "./globals.css";

import AuthProvider from "@/context/AuthProvider";
import SessionLayout from "@/context/SessionLayout";
import { MainLayout } from "@/components/layouts/MainLayout";

export const metadata: Metadata = {
  title: "blackApple : A Lyrics Library",
  description: "A free lyrics library where you can find lyrics of all songs.",
  authors: [{ name: "Kartikesh Pachkawade" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className=" min-h-screen max-h-screen h-screen
         bg-gradient-to-br from-gray-900 via-blue-950 to-black
        text-white
        overflow-hidden
        flex flex-col space-y-2
        container
        "
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
