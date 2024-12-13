import React from "react";
import BentoGrid from "./BentoGrid";
import BentoCss from "./BentoCss";

const BentoBuilder = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5 mt-5">
      <div className="md:w-2/3 w-full">
        <BentoGrid />
      </div>
      <div className="md:w-1/3 w-full">
        <BentoCss />
      </div>
    </div>
  );
};

export default BentoBuilder;
