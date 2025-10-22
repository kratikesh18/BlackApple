"use client";
import { toggleSearch } from "@/store/searchBarSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const ClientHotkey = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDowns = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        dispatch(toggleSearch());
      }
    };

    window.addEventListener("keydown", handleKeyDowns);
    return () => window.removeEventListener("keydown", handleKeyDowns);
  }, [dispatch]);
  return null;
};



export default ClientHotkey;
