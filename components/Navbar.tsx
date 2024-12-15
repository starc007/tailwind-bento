/* eslint-disable @next/next/no-img-element */
"use client";

import { GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="h-14 border-b border-gray-100 bg-white/20 backdrop-blur-xl flex items-center fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center container mx-auto px-4">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <img src="/icon.png" alt="benGrid" className="w-6 h-6" />
          benGrid
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/starc007/tailwind-bento"
            target="_blank"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300 flex items-center gap-1"
          >
            <GithubIcon className="w-4 h-4" />
            Github
          </Link>
          <Link
            href="https://x.com/saurra3h"
            target="_blank"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300 flex items-center gap-1"
          >
            <TwitterIcon className="w-4 h-4" />
            Twitter
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
