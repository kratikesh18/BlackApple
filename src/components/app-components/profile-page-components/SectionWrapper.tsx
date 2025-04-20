import React from "react";

function SectionWrapper({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={` ${
        className
          ? className
          : "bg-gray-200/10  backdrop-blur-2xl bg-opacity-10 border border-white/20 px-5 rounded-lg py-3"
      }`}
    >
      {title && (
        <h1 className="text-xl text-white font-bold mb-3 md:mb-0">{title}</h1>
      )}
      <div className="my-2">{children}</div>
    </div>
  );
}

export default SectionWrapper;
