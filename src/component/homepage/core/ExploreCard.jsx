import React from "react";

const ExploreCard = ({ data, active }) => {
  return (
    <div className="min-w-[300px] inline-block h-[370px] relative rounded-xl shadow-xl shadow-[#455081]">
      <img
        src={data.img}
        alt="image"
        className="object-cover w-full h-full rounded-xl"
      />
      <div className="absolute inset-0 z-10 flex items-end w-full h-full p-2 bg-gradient-to-t from-[#0d1d33] to-transparent "></div>
      {/* <p className="text-center z-20 inset-0 absolute left-0 top-[60%] w-full h-full text-[14px] text-wrap text-[#bde4ff] tracking- font-imprima">
        {data.desc}
      </p> */}
    </div>
  );
};

export default ExploreCard;
