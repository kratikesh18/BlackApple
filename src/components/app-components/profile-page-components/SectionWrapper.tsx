"use client";
import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

function SectionWrapper({ children, title, className }: SectionWrapperProps) {
  return (
    <section
      className={`bg-gray-200/10 backdrop-blur-2xl bg-opacity-10 border border-white/20 px-3 md:px-5 rounded-lg py-3 md:py-5 w-full ${className}`}
    >
      {title && (
        <h1 className="text-lg md:text-xl text-white font-bold mb-2 md:mb-3">
          {title}
        </h1>
      )}
      <div className="my-1 md:my-2">{children}</div>
    </section>
    // <section>
    //   {children}
    // </section>
  );
}

export default SectionWrapper;
