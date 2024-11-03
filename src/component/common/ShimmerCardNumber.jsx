import React from "react";

const ShimmerCardNumber = ({ num }) => {
  return (
    <div className="flex flex-wrap items-center justify-center">
      {Array(num)
        .fill("")
        .map((_, index) => (
          <div className="md:w-[300px] max-w-[270px] min-h-[350px] p-3 flex flex-col justify-between mx-3 mb-5 md:h-[190px] rounded-lg bg-blue-600 bg-opacity-40 animate-pulse">
            <div className="p-2 m-2 mt-1 rounded-lg w-full h-[60%] animate-pulse bg-[#2e3657]"></div>
            <div className="p-2 mx-auto mt-2 ml-2 w-[80%] h-[20px] bg-slate-700 rounded-md"></div>
            <div className="pl-2 mx-auto rounded-lg mt-1 ml-2 w-[80%] h-[15px] bg-[#2b355f]"></div>
            <div className="pl-2 mx-auto rounded-xl mt-1 ml-2 w-4/5 h-[12px] bg-[#3b435f]"></div>
          </div>
        ))}
    </div>
  );
};

export default ShimmerCardNumber;
