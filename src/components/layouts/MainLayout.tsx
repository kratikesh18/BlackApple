"use client";
import React from "react";
import Navbar from "../app-components/Navbar";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import SpotifyCurrentState from "../app-components/profile-page-components/SpotifyCurrentState";
import HotKeyLayout from "./HotKeyLayout";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      <header className="h-[80px] bg-blue-500 text-white flex items-center justify-center ">
        <Navbar />
      </header>
      {/* <main className="flex-1 px-3 md:p-0 md:container overflow-y-auto scrollbar-none"> */}
      <main className="flex-1  flex items-center justify-center">
        {children}
      </main>

      <footer>
        {!(pathname === "/profile") && <SpotifyCurrentState />}

        <HotKeyLayout />
        <Toaster />
      </footer>
    </>
  );
};

export { MainLayout };
