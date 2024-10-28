import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const OwnerSidebarLinks = () => {
  const location = useLocation();

  const pathName = location.pathname.split("/").pop();
  return (
    <div className="relative mt-14 z-20 max-w-[350px] mx-auto  flex flex-col p-2 py-4 mb-20 rounded-xl shadow-md bg-opacity-20 bg-[#40498b]  shadow-[#1f2452] hover:shadow-slate-950 transition-all duration-200 ">
      <ul className="flex flex-col w-full tracking-wider text-blue-400 gap-y-3">
        <li className="w-full ">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `p-2 rounded transition-all duration-300 hover:bg-[#3d3b97] ${
                isActive
                  ? "flex flex-col py-4  place-items-center items-center justify-center  bg-[#5460be] bg-opacity-25 rounded-xl shadow-md shadow-slate-950 w-full m-auto text-base font-poppins font-medium"
                  : "flex flex-col px-5 place-items-center items-start justify-center  bg-[#5460be] bg-opacity-25 rounded-xl  w-full m-auto text-base font-poppins font-medium"
              }`
            }
          >
            Profile
          </NavLink>
        </li>
        <li className="w-full ">
          <NavLink
            to="/dashboard/wishlist"
            className={({ isActive }) =>
              `p-2 rounded transition-all duration-300 hover:bg-[#3d3b97] ${
                isActive
                  ? "flex flex-col px-5 py-4 place-items-center items-center justify-center  bg-[#5460be] bg-opacity-25 rounded-xl shadow-md shadow-slate-950 w-full m-auto text-base font-poppins font-medium"
                  : "flex flex-col px-5 place-items-center items-start justify-center  bg-[#5460be] bg-opacity-25 rounded-xl  w-full m-auto text-base font-poppins font-medium"
              }`
            }
          >
            Wishlist
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/stay"
            className={({ isActive }) =>
              `p-2 rounded transition-all duration-300 hover:bg-[#3d3b97] ${
                isActive
                  ? "flex flex-col px-5 py-4 place-items-center items-center justify-center  bg-[#5460be] bg-opacity-25 rounded-xl shadow-md shadow-slate-950 w-full m-auto text-base font-poppins font-medium"
                  : "flex flex-col px-5 place-items-center items-start justify-center  bg-[#5460be] bg-opacity-25 rounded-xl  w-full m-auto text-base font-poppins font-medium"
              }`
            }
          >
            Current Stay
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/contact"
            className={({ isActive }) =>
              `p-2 rounded transition-all duration-300 hover:bg-[#3d3b97] ${
                isActive
                  ? "flex flex-col px-5 py-4 place-items-center items-center justify-center  bg-[#5460be] bg-opacity-25 rounded-xl shadow-md shadow-slate-950 w-full m-auto text-base font-poppins font-medium"
                  : "flex flex-col px-5 place-items-center items-start justify-center  bg-[#5460be] bg-opacity-25 rounded-xl  w-full m-auto text-base font-poppins font-medium"
              }`
            }
          >
            Contact Us
          </NavLink>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default OwnerSidebarLinks;
