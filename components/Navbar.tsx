"use client";

import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="h-14 border-b border-gray-100 bg-white/20 backdrop-blur-xl flex items-center fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center container mx-auto px-4">
        <Link href="/" className="text-2xl font-bold">
          Bengrid
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
