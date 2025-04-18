"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { MySessionContext } from "./MySessionContext";

function SessionLayout({ children }: { children: React.ReactNode }) {
  //calling only once in the session layout
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <MySessionContext.Provider value={{ session, status, signIn, signOut }}>
      {children}
    </MySessionContext.Provider>
  );
}
export default SessionLayout;
