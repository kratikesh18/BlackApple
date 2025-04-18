"use client";

import { createContext, useContext } from "react";
import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

type MySessionContextType = {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  signIn: typeof signIn;
  signOut: typeof signOut;
};

export const MySessionContext = createContext<MySessionContextType | null>(
  null
);

//exporting the hook to use this context
export const useMySession = () => {
  const context = useContext(MySessionContext);

  if (!context) {
    throw new Error("useMySession must be used within <SessionLayout>");
  }

  return context;
};
