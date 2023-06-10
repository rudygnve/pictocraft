import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between py-5 border-[1px] border-solid border-gray-200 px-4 sm:px-[7%] bg-white">
      <Link className="text-2xl font-bold text-[#222222]" href="/">
        PictoCraft<span className="text-primary">.</span>
      </Link>
      <Link
        className="py-2 px-5 bg-primary text-white text-base font-semibold rounded-lg"
        href="/create"
      >
        Create
      </Link>
    </div>
  );
};

export default Navbar;
