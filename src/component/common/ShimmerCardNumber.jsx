import React from "react";

const ShimmerCardNumber = ({ num }) => {
  return (
    <div className="flex flex-wrap items-center justify-center">
      {Array(num)
        .fill("")
        .map((_, index) => (
          <div className="md:w-[300px] w-[140px] h-[150px] mx-3 mb-5 md:h-[190px] rounded-lg bg-slate-200 animate-pulse">
            <div className="p-2 ml-2 mt-3 w-[60%] h-[60%] animate-pulse bg-slate-600"></div>
            <div className="pl-2 mt-2 ml-2 w-[80%] h-[20px] bg-slate-400 rounded-md"></div>
            <div className="pl-2 rounded-lg mt-1 ml-2 w-[60%] h-[10px] bg-slate-500"></div>
            <div className="pl-2 rounded-xl mt-1 ml-2 w-[40%] h-[7px] bg-slate-500"></div>
          </div>
        ))}
    </div>
  );
};

export default ShimmerCardNumber;
