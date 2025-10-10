"use client";
import LoadingSpinner from "@/components/extra-components/LoadingSpinner";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { MySessionContext } from "./MySessionContext";
import { Provider } from "react-redux";
import { store } from "@/store/store";


function SessionLayout({ children }: { children: React.ReactNode }) {
  //calling only once in the session layout
  const { data: session, status } = useSession();


  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <MySessionContext.Provider value={{ session, status, signIn, signOut }}>
      <Provider store={store}>{children}</Provider>
    </MySessionContext.Provider>
  );
}
export default SessionLayout;
