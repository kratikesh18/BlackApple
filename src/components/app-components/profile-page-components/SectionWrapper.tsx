"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

function SectionWrapper({ children, title, className }: SectionWrapperProps) {
  return (
    <section
      className={cn(
        "w-full rounded-lg border border-white/20 bg-gray-200/10 px-4 md:px-5 py-3 md:py-5",
        className,
      )}
    >
      {title && (
        <h1 className="text-lg md:text-xl font-bold text-white mb-3">
          {title}
        </h1>
      )}

      <div>{children}</div>
    </section>
    // <div>{children}</div>
  );
}

export default SectionWrapper;
