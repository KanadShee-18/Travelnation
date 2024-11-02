import React from "react";

const Tab = ({ tabData, field, setField }) => {
  return (
    <div className="flex w-full mt-5 text-sm rounded-md md:text-base bg-slate-600">
      {tabData.map((tab, index) => (
        <button
          key={index}
          className={`py-2 w-1/2 flex-grow px-5 rounded-md transition-all duration-200 ${
            field === tab.type
              ? "bg-gradient-to-r from-[#6644ff] via-[#615fff] to-[#6644ff] text-slate-200 tracking-wider"
              : "bg-gradient-to-r from-[#2d3a72] via-[#32353a] to-[#2d3a72] text-slate-400"
          } font-poppins hover:bg-slate-700  active:bg-slate-800`}
          onClick={() => setField(tab.type)}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
};

export default Tab;
