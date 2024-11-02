import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="py-16 text-white bg-gray-900 ">
      <div className="w-11/12 mx-auto space-y-4 text-center lg:w-10/12">
        <h2 className="md:text-3xl text-xl font-bold text-center text-transparent font-poppins bg-gradient-to-r from-[#a99ddf] via-[#66659e] to-[#9d96be] drop-shadow-2xl bg-clip-text">
          Join Our Community
        </h2>
        <p className="md:text-lg text-sm font-semibold text-center text-transparent font-poppins bg-gradient-to-r from-[#6644ff] via-[#615fff] to-[#6644ff] drop-shadow-2xl bg-clip-text">
          Stay connected with WanderLust for the latest updates, travel tips,
          and special offers.
        </p>
        <p className="text-sm tracking-wide font-imprima text-slate-400">
          Whether you’re planning your next trip or just dreaming of far-off
          destinations, we’re here to inspire your adventures.
        </p>
      </div>
      <footer className="py-8 mt-8 text-white bg-gray-800">
        <div className="w-11/12 mx-auto space-y-4 text-center lg:w-10/12">
          <h3 className="text-2xl font-semibold tracking-wider text-pink-600 font-imprima">
            WanderLust
          </h3>
          <p className="text-sm tracking-wide text-gray-400">
            Discover your perfect stay and embark on unforgettable journeys with
            WanderLust.
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <Link to="#" className="hover:text-blue-400">
              <FaFacebookF />
            </Link>
            <Link to="#" className="hover:text-blue-400">
              <FaTwitter />
            </Link>
            <Link to="#" className="hover:text-blue-400">
              <FaInstagram />
            </Link>
          </div>
          <div className="mt-4 text-xs text-gray-400">
            &copy; {new Date().getFullYear()} WanderLust. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
