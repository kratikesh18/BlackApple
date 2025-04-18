import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="hover:text-gray-300 transition-colors  text-3xl font-extrabold tracking-wider"
    >
      <h1 className="theme-text-style text-2xl">blueCocain</h1>
    </Link>
  );
};

export default Logo;
