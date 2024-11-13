// ShimmerCard.js
import React from "react";

const ShimmerCard = () => {
  return (
    <div className="flex flex-col mt-8 rounded-md lg:w-[320px] md:w-[240px] w-[300px] h-fit animate-pulse">
      <div className="w-full h-[300px] md:h-[240px] lg:h-[320px] bg-gray-300 rounded-md"></div>
      <div className="flex flex-col p-3 h-[210px] space-y-2">
        <div className="h-6 bg-gray-300 rounded-md"></div>
        <div className="h-4 bg-gray-300 rounded-md"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
        <div className="flex items-center justify-between mt-4">
          <div className="w-1/3 h-4 bg-gray-300 rounded-md"></div>
          <div className="w-1/4 h-8 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;
