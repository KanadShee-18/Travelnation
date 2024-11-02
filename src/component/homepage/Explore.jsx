import React, { useState } from "react";
import coupleImg from "../../assets/explorePics/coupleInBeach.jpg";
import { exploreCards } from "../../utils/constants";
import ExploreCard from "./core/ExploreCard";
import mainBg from "../../assets/explorePics/mainBg.jpg";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { motion } from "framer-motion";

const Explore = () => {
  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft -= 300;
  };
  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft += 300;
  };
  return (
    <div className="relative max-w-screen min-h-[100vh] py-32">
      {/* Background Image */}
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <img
          src={mainBg}
          alt="background"
          className="object-cover w-full h-full"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 z-0 w-full h-full bg-[#0b1222] bg-opacity-80"></div>
      </div>

      {/* Content */}
      <motion.h2
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          type: "tween",
          duration: 1.2,
          ease: [0.25, 0.25, 0.25, 0.75],
        }}
        viewport={{
          once: true,
        }}
        className="md:text-5xl text-2xl pt-12 text-[#bde4ff] font-semibold text-center drop-shadow-lg font-imprima"
      >
        Explore Your Next Getaway
      </motion.h2>

      <div className="flex flex-col w-10/12 mx-auto">
        <div className="flex flex-col-reverse justify-between w-full mx-auto mt-20 gap-y-6 md:flex-row">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              type: "tween",
              duration: 1.2,
              delay: 1.2,
              ease: [0.25, 0.25, 0.25, 0.75],
            }}
            viewport={{
              once: true,
            }}
            className="relative flex items-center justify-center w-full md:w-1/2"
          >
            <img
              src={coupleImg}
              className="coupleImg object-cover max-w-[320px] rounded-md aspect-square"
              alt="Image"
            />
          </motion.div>
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              type: "tween",
              duration: 1.2,
              delay: 1.2,
              ease: [0.25, 0.25, 0.25, 0.75],
            }}
            viewport={{
              once: true,
            }}
            className="flex items-start justify-center w-full md:w-1/2"
          >
            <p className="w-full mx-auto text-sm font-medium text-blue-200 md:text-lg backdrop-blur-sm md:w-4/5 text-start text-balance font-imprima drop-shadow-xl">
              "At WanderLust, we believe that every journey is an opportunity
              for discovery and connection. Whether you’re planning a relaxing
              retreat or an exhilarating adventure, our platform is designed to
              help you find the perfect place to stay. With a wide range of
              unique accommodations and curated experiences, we invite you to
              explore the world like never before. Let us guide you through an
              unforgettable travel experience, filled with comfort, culture, and
              adventure."
            </p>
          </motion.div>
        </div>

        {/* Swiper Section */}
        <div className="flex flex-col items-center justify-between w-10/12 pb-32 mx-auto mt-10 scroll-smooth md:flex-row gap-y-6">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              type: "tween",
              duration: 1.2,
              delay: 2.2,
              ease: [0.25, 0.25, 0.25, 0.75],
            }}
            viewport={{
              once: true,
            }}
            className="flex items-center w-full mx-auto md:w-1/2 "
          >
            <p className="text-[#d8e9ff] w-full backdrop-blur-sm md:w-4/5 text-start md:text-lg text-sm font-imprima drop-shadow-2xl">
              Dive deep into local culture as you immerse yourself in the unique
              essence of each destination. Experience the charm of vibrant
              neighborhoods, savor authentic cuisines, and connect with the
              community to create unforgettable memories. For the
              thrill-seekers, adventure awaits just beyond your doorstep!
              Whether you're hiking through majestic mountains, surfing the
              waves, or simply enjoying the beauty of nature, our selection of
              adventurous stays will guide you to your next great escape.
            </p>
          </motion.div>
          <motion.div className="flex flex-row items-center justify-center w-full md:w-1/2 bg-slate-400">
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                type: "tween",
                duration: 1.2,
                delay: 2.2,
                ease: [0.25, 0.25, 0.25, 0.75],
              }}
              viewport={{
                once: true,
              }}
              className="relative w-[300px] "
            >
              <div className="absolute z-[70] flex justify-between w-full top-[150px] gap-2 md:right-0 sm:right-4 right-6">
                <button
                  onClick={slideLeft}
                  className="p-1 text-2xl text-blue-300 shadow-md shadow-slate-950 rounded-full bg-[#2b3b57]  hover:text-teal-500 hover:bg-opacity-80"
                >
                  <MdArrowLeft />
                </button>
                <button
                  onClick={slideRight}
                  className="p-1 text-2xl text-blue-300 rounded-full bg-[#2f3c53] shadow-md shadow-slate-950 hover:text-teal-500 hover:bg-opacity-80"
                >
                  <MdArrowRight />
                </button>
              </div>

              <div
                id={"slider"}
                className="flex h-full overflow-x-scroll rounded-2xl md:px-0 whitespace-nowrap scroll-smooth scrollbar-hide"
              >
                {exploreCards?.map((card, i) => (
                  <ExploreCard key={i} data={card} />
                ))}
              </div>
              <div className="absolute rounded-l-xl top-0 left-0 z-30 h-full w-[30%] bg-gradient-to-r from-[#0b1528] to-transparent"></div>
              <div className="absolute rounded-r-xl top-0 right-0 z-30 h-full w-[30%] bg-gradient-to-l from-[#0b1528] to-transparent"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
