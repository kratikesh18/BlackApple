import React from "react";

function UserHeader({ name, image }: { name: string; image: string }) {
  return (
    <div className="flex flex-col-reverse items-center bg-gray-200/10 bg-opacity-10 border border-white/20 md:justify-between md:flex-row p-5 rounded-lg">
      <div className="text-center md:text-left mt-4 md:mt-0  text-white">
        <h1 className=" text-5xl font-bold md:text-6xl">Hey,{name}</h1>
        <div className="mt-2">
          <p className="">The President at blueCocain,</p>
          <p className="">contributed 69+ Lyrics.</p>
        </div>
      </div>
      <div className="">
        <img
          src={image || "/default-profile.png"} // Fallback image if no profile image
          alt={`${name}'s Image`}
          loading="lazy"
          className="object-cover rounded-full h-48 w-48 border-4"
        />
      </div>
    </div>
  );
}

export default UserHeader;
