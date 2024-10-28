// import React from "react";

// const Tab = ({ tabData, field, setField }) => {
//   console.log("Field: ", field);
//   console.log("Set field: ", setField);

//   return (
//     <div className="flex w-full my-3 rounded-lg h-fit bg-slate-200">
//       {tabData.map((eachTab, index) => (
//         <button
//           key={index}
//           onClick={() => setField(eachTab.type)}
//           className={`
//                 w-1/2 py-2
//                 ${index === 1 ? "rounded-r-md" : "rounded-l-md"}
//                  ${
//                    field === eachTab.type
//                      ? "bg-gradient-to-r from-[#e41ba1] via-[#cf225b] to-[#6644ff] text-slate-100"
//                      : "bg-gradient-to-r from-[#2d3a72] via-[#2b4b53] to-[#322c4b] text-slate-300"
//                  }
//                 transition-all duration-200
//                 font-poppins hover:bg-gradient-to-br  from-blue-500 via-pink-500 to-[#cf58ec]
//                     `}
//         >
//           {eachTab?.tabName}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Tab;

import React from "react";

const Tab = ({ tabData, field, setField }) => {
  return (
    <div className="flex w-full mt-5 rounded-md bg-slate-600">
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
