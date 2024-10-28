import React from "react";
import logo from "../../assets/logo.png";
import ImageSlider from "./core/ImageSlider";
import { TfiWorld } from "react-icons/tfi";
import { RiHotelLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const HomeVideoSlider = () => {
  const navigate = useNavigate();
  return (
    <div className="relative z-50 flex flex-col items-center justify-center w-11/12 h-full mx-auto mt-28">
      <div className="flex justify-center p-1 text-[#aec7f5] font-medium tracking-wide mx-auto text-sm rounded-full bg-[#798db9] bg-opacity-40 font-poppins w-fit ">
        <button
          onClick={() => navigate("/signup")}
          className="py-3 px-4 shadow-inner hover:text-[#ff3477] shadow-slate-800 flex items-center gap-x-2 transform transition-all duration-200 hover:scale-95 bg-opacity-40 hover:bg-opacity-85 rounded-full bg-[#1e2444]"
        >
          <p className="drop-shadow-xl">Explore More</p>{" "}
          <TfiWorld className="text-xl" />
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="py-3 px-4 transform transition-all duration-200 hover:scale-95 flex items-center hover:text-[#ff3477] gap-x-2 shadow-inner shadow-slate-800 rounded-full bg-[#1e2444] bg-opacity-40 hover:bg-opacity-85"
        >
          <p className="drop-shadow-xl"> Book a Stay</p>{" "}
          <RiHotelLine className="text-xl" />
        </button>
      </div>
      <div className="flex flex-col w-full mt-14">
        <h1 className=" mx-auto lg:text-6xl md:text-5xl font-bold text-[#ceebff] font-inter drop-shadow-2xl">
          Welcome to Your Next Adventure
        </h1>
        <p className="mx-auto text-xl font-medium text-[#aec7f5] md:w-3/4 lg:w-3/5 font-imprima mt-11 drop-shadow-xl">
          "Discover unique stays and unforgettable experiences, handpicked for
          your perfect getaway. Whether you're looking for a cozy cabin in the
          woods, a luxurious beachfront villa, or a chic city apartment, we have
          something for every traveler."
        </p>
      </div>
      {/* Image Slider */}
      {/* <ImageSlider /> */}
      <h1 className="mb-8 text-3xl pt-24 font-semibold text-center font-edu text-[#94bbba]">
        "From Beachfront Bliss to Mountain Hideaways, Find Your Escape"
      </h1>
    </div>
  );
};

export default HomeVideoSlider;
