import React from "react";
import hotelImg from "../../../assets/hotel.jpg";

const BannerVideo = () => {
  return (
    <div className="relative w-full h-screen">
      <img
        src={hotelImg}
        alt=""
        className="absolute top-0 left-0 object-cover w-full h-full"
      />

      <div className="absolute top-0 left-0 w-full h-full opacity-65 bg-[#14192e]"></div>

      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
};

export default BannerVideo;
