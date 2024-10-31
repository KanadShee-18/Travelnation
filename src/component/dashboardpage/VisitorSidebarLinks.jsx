import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaHeart, FaComments, FaInfoCircle } from "react-icons/fa"; // Import any icons suitable for visitor navigation
import { FaShieldHeart } from "react-icons/fa6";

const VisitorSidebarLinks = () => {
  const location = useLocation();

  return (
    <div className="relative mt-14 z-20 max-w-[350px] mx-auto flex flex-col p-2 py-4 mb-20 rounded-md shadow-md bg-[#4954a5] bg-opacity-25 shadow-[#1f2452] hover:shadow-slate-950 transition-all duration-200">
      <ul className="flex flex-col w-full tracking-wider text-blue-400 gap-y-3">
        <li className="w-full">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `px-2 py-4 rounded transition items-center gap-x-2 flex duration-200 hover:bg-[#3d3b97] ${
                isActive
                  ? "items-center justify-start bg-[#5460be] bg-opacity-25 rounded-md shadow-md shadow-slate-950 w-full m-auto text-sm font-poppins font-medium"
                  : "items-center justify-start opacity-75 shadow-inner shadow-[#545bb9] bg-[#3e4264] bg-opacity-25 rounded-md w-full m-auto text-sm font-poppins font-medium"
              }`
            }
          >
            <FaHome className="text-xl" />
            <p>Home</p>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `px-2 py-4 rounded transition items-center gap-x-2 flex duration-200 hover:bg-[#3d3b97] ${
                isActive
                  ? "items-center justify-start bg-[#5460be] bg-opacity-25 rounded-md shadow-md shadow-slate-950 w-full m-auto text-sm font-poppins font-medium"
                  : "items-center justify-start opacity-75 shadow-inner shadow-[#545bb9] bg-[#3e4264] bg-opacity-25 rounded-md w-full m-auto text-sm font-poppins font-medium"
              }`
            }
          >
            <FaShieldHeart className="text-xl" />
            <p>Favorites</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-2 py-4 rounded transition items-center gap-x-2 flex duration-200 hover:bg-[#3d3b97] ${
                isActive
                  ? "items-center justify-start bg-[#5460be] bg-opacity-25 rounded-md shadow-md shadow-slate-950 w-full m-auto text-sm font-poppins font-medium"
                  : "items-center justify-start shadow-inner shadow-[#545bb9] bg-[#3e4264] bg-opacity-25 rounded-md opacity-75 w-full m-auto text-sm font-poppins font-medium"
              }`
            }
          >
            <FaComments className="text-xl" />
            <p>Contact Us</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-2 py-4 rounded transition items-center gap-x-2 flex duration-200 hover:bg-[#3d3b97] ${
                isActive
                  ? "items-center justify-start bg-[#5460be] bg-opacity-25 rounded-md shadow-md shadow-slate-950 w-full m-auto text-sm font-poppins font-medium"
                  : "items-center justify-start shadow-inner shadow-[#545bb9] bg-[#3e4264] bg-opacity-25 rounded-md opacity-75 w-full m-auto text-sm font-poppins font-medium"
              }`
            }
          >
            <FaInfoCircle className="text-xl" />
            <p>About Us</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default VisitorSidebarLinks;
