import React from "react";
import logo from "../../assets/logo.png";
import ImageSlider from "./core/ImageSlider";
import { TfiWorld } from "react-icons/tfi";
import { RiHotelLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomeVideoSlider = () => {
  const navigate = useNavigate();
  return (
    <div className="relative z-50 flex flex-col items-center justify-center w-11/12 h-full mx-auto mt-28">
      <motion.div
        initial={{ sacle: 0.2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          type: "tween",
          duration: 1.5,
          delay: 1,
          ease: [0.25, 0.25, 0.25, 0.75],
        }}
        viewport={{
          once: true,
        }}
        className="flex justify-center items-center p-1 text-[#aec7f5] font-medium tracking-wide mx-auto text-sm rounded-full bg-[#798db9] bg-opacity-40 font-poppins w-fit "
      >
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
      </motion.div>
      <div className="flex flex-col w-full mt-14">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1.2,
            delay: 1,
            ease: [0.25, 0.25, 0.25, 0.75],
          }}
          viewport={{
            once: true,
          }}
          className=" mx-auto text-xl lg:text-6xl md:text-5xl font-bold text-[#ceebff] font-inter drop-shadow-2xl"
        >
          Welcome to Your Next Adventure
        </motion.h1>
        <motion.p
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1.2,
            delay: 2.2,
            ease: "easeIn",
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto md:text-xl text-base text-center font-medium text-[#aec7f5] md:w-3/4 lg:w-3/5 font-imprima mt-11 drop-shadow-xl"
        >
          "Discover unique stays and unforgettable experiences, handpicked for
          your perfect getaway. Whether you're looking for a cozy cabin in the
          woods, a luxurious beachfront villa, or a chic city apartment, we have
          something for every traveler."
        </motion.p>
      </div>
      {/* Image Slider */}
      {/* <ImageSlider /> */}
      <motion.h1
        initial={{ scale: 0.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          type: "tween",
          duration: 1.2,
          delay: 3.4,
          ease: "easeIn",
        }}
        viewport={{
          once: true,
        }}
        className="mb-8 md:text-3xl text-xl pt-24 font-semibold text-center font-edu text-[#94bbba]"
      >
        "From Beachfront Bliss to Mountain Hideaways, Find Your Escape"
      </motion.h1>
    </div>
  );
};

export default HomeVideoSlider;
