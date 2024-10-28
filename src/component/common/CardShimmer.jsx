import React from "react";

const CardShimmer = () => {
  return (
    <div className="rounded-lg flex bg-opacity-20 bg-[#4953a5]  shadow-[#4953a5] flex-col justify-between gap-y-5 w-[440px] p-8 ">
      <div className="flex flex-col gap-y-3 bg-[#5460be] bg-opacity-25 animate-pulse">
        <div className="w-full px-2 py-3 rounded-md shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950 "></div>
        <div className="w-full px-2 py-5 rounded-md shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950"></div>
      </div>
      <div className="w-full px-2 py-5 rounded-md  shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950 animate-pulse"></div>
    </div>
  );
};

export default CardShimmer;
