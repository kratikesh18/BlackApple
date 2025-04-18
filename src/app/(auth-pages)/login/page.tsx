"use client";

import React from "react";
import LeftArrow from "@/components/icons/LeftArrow";
import { useMySession } from "@/context/MySessionContext";

const LoginPage: React.FC = () => {
  const { session, status, signIn } = useMySession();

  const handleSpotifyLogin = async () => {
    try {
      await signIn("spotify");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-40">
      {/* Header Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-purple-500">
          Welcome to <span className="text-white">blueCocain</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-lg mx-auto">
          Discover, Contribute, and Enjoy Music Lyrics. Join us to elevate your
          music experience—it’s completely free!
        </p>
      </div>

      {/* Spotify Login Button */}
      <div className="mt-12">
        <button
          onClick={handleSpotifyLogin}
          disabled={status === "loading"}
          className={`flex items-center gap-4 px-8 py-4 text-lg font-medium text-white rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 ${
            status === "loading"
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500 focus:ring-green-400"
          }`}
        >
          {status === "loading" ? (
            <>
              <LeftArrow />
              Logging in...
            </>
          ) : (
            <>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Continue with Spotify
            </>
          )}
        </button>
      </div>

      {/* Footer */}
      <div className="mt-12 text-sm text-gray-500">
        By signing in, you agree to our{" "}
        <a href="#" className="text-purple-500 hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-purple-500 hover:underline">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};

export default LoginPage;
