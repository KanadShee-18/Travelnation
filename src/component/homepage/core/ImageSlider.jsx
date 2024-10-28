import React, { useState } from "react";
import { hotelImages } from "../../../utils/constants";
import ImageCard from "./ImageCard";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

const ImageSlider = () => {
  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft -= 250;
  };
  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft += 250;
  };

  return (
    <div className="container relative pt-24 mx-auto lg:w-3/4">
      <h1 className="mb-8 text-3xl font-semibold text-center font-edu text-[#94bbba]">
        "From Beachfront Bliss to Mountain Hideaways, Find Your Escape"
      </h1>

      <div className="relative">
        <div className="absolute z-30 flex gap-2 md:right-0 sm:right-4 right-6 -top-10">
          <button
            onClick={slideLeft}
            className="p-1 text-2xl text-teal-800 rounded-full bg-[#1e2736]  hover:text-teal-500 hover:bg-opacity-80"
          >
            <MdArrowLeft />
          </button>
          <button
            onClick={slideRight}
            className="p-1 text-2xl text-teal-800 rounded-full bg-[#1e2736] hover:text-teal-500 hover:bg-opacity-80"
          >
            <MdArrowRight />
          </button>
        </div>

        <div
          id={"slider"}
          className="flex h-full px-4 mt-12 overflow-x-scroll md:px-0 whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {hotelImages?.map((image, i) => (
            <ImageCard key={i} img={image.img} />
          ))}
        </div>
        <div className="absolute rounded-l-xl top-0 left-0 z-30 h-full w-[30%] bg-gradient-to-r from-[#0b1528] to-transparent"></div>
        <div className="absolute rounded-r-xl top-0 right-0 z-30 h-full w-[30%] bg-gradient-to-l from-[#0b1528] to-transparent"></div>
      </div>
    </div>
  );
};

export default ImageSlider;
