import React from "react";
import { TiTick } from "react-icons/ti";
const PassValidator = () => {
  return (
    <div className="flex flex-col justify-between px-2 md:text-sm text-xs text-[#8b92d1] sm:flex-row">
      <div>
        <span className="flex flex-row items-center gap-x-1">
          <TiTick className="bg-blue-300 rounded-full size-3 text-slate-700" />
          <p>one lowercase character</p>
        </span>
        <span className="flex flex-row items-center gap-x-1">
          <TiTick className="bg-blue-300 rounded-full size-3 text-slate-700" />
          <p>one uppercase character</p>
        </span>
        <span className="flex flex-row items-center gap-x-1">
          <TiTick className="bg-blue-300 rounded-full size-3 text-slate-700" />
          <p>one number</p>
        </span>
      </div>
      <div>
        <span className="flex flex-row items-center gap-x-1">
          <TiTick className="bg-blue-300 rounded-full size-3 text-slate-700" />
          <p>one special character</p>
        </span>
        <span className="flex flex-row items-center gap-x-1">
          <TiTick className="bg-blue-300 rounded-full size-3 text-slate-700" />
          <p>8 character minimum</p>
        </span>
      </div>
    </div>
  );
};

export default PassValidator;
