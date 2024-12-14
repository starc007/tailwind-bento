"use client";

import BentoGridBuilder from "@/components/BentoBuilder";
import React from "react";

function Home() {
  return (
    <div className="pt-8 pb-20">
      <div className="space-y-3 max-w-xl mb-8">
        <h1 className="text-4xl font-bold">Generate bento grid in seconds</h1>
        <p className="text-gray-500 text-sm">
          Create beautiful, responsive bento grids without writing code. Design,
          customize, and export your grid with just a few clicks. Perfect for
          modern web layouts and portfolios.
        </p>
      </div>
      <BentoGridBuilder />
    </div>
  );
}

export default Home;
