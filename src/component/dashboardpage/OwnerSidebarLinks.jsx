import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CgProfile, CgListTree } from "react-icons/cg";
import { VscGitPullRequestCreate, VscFeedback } from "react-icons/vsc";
import { MdOutlineSettingsPhone } from "react-icons/md";
import { BsBalloonHeartFill } from "react-icons/bs";

const OwnerSidebarLinks = () => {
  const location = useLocation();

  const pathName = location.pathname.split("/").pop();
  return (
    <div className="relative mt-14 z-20 max-w-[350px] mx-auto  flex flex-col p-2 py-4 mb-20 rounded-md shadow-md bg-[#4954a5] bg-opacity-25  shadow-[#1f2452] hover:shadow-slate-950 transition-all duration-200 ">
      <ul className="flex flex-col w-full tracking-wider text-blue-400 gap-y-3">
        <li className="w-full ">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `px-2 py-4 rounded transition items-center gap-x-2 flex duration-200 hover:bg-[#3d3b97] ${
                isActive
                  ? "items-center justify-start  bg-[#5460be] bg-opacity-25 rounded-md shadow-md shadow-slate-950 w-full m-auto text-sm font-poppins font-medium"
                  : " items-center opacity-75 shadow-inner shadow-[#545bb9] justify-start  bg-[#3e4264] bg-opacity-25 rounded-md  w-full m-auto text-sm font-poppins font-medium"
              }`
            }
          >
            <CgProfile className="text-xl" />
            <p>Profile </p>
          </NavLink>
        </li>
        <li className="w-full ">
          <NavLink
            to="/dashboard/add-listing"
            className={({ isActive }) =>
              `px-2 py-4 rounded transition items-center gap-x-2 flex duration-200 hover:bg-[#3d3b97] ${
                isActive
                  ? "items-center justify-start  bg-[#5460be] bg-opacity-25 rounded-md shadow-md shadow-slate-950 w-full m-auto text-sm font-poppins font-medium"
                  : " items-center justify-start opacity-75 bg-[#3e4264] bg-opacity-25 rounded-md shadow-inner shadow-[#545bb9] w-full m-auto text-sm font-poppins font-medium"
              }`
            }
          >
            <VscGitPullRequestCreate className="text-xl" />
            <p>Create Listing </p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/listings"
            className={({ isActive }) =>
              `px-2 py-4 rounded transition items-center gap-x-2 flex duration-200 hover:bg-[#3d3b97] ${
                isActive
                  ? "items-center justify-start  bg-[#5460be] bg-opacity-25 rounded-md shadow-md shadow-slate-950 w-full m-auto text-sm font-poppins font-medium"
                  : " items-center justify-start shadow-inner shadow-[#545bb9] bg-[#3e4264] bg-opacity-25 rounded-md opacity-75 w-full m-auto text-sm font-poppins font-medium"
              }`
            }
          >
            <CgListTree className="text-xl" />
            Your Listings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/wishlists"
            className={({ isActive }) =>
              `px-2 py-4 rounded transition items-center gap-x-2 flex duration-200 hover:bg-[#3d3b97] ${
                isActive
                  ? "items-center justify-start  bg-[#5460be] bg-opacity-25 rounded-md shadow-md shadow-slate-950 w-full m-auto text-sm font-poppins font-medium"
                  : " items-center justify-start shadow-inner shadow-[#545bb9] bg-[#3e4264] bg-opacity-25 rounded-md opacity-75 w-full m-auto text-sm font-poppins font-medium"
              }`
            }
          >
            <BsBalloonHeartFill className="text-xl" />
            Wishlists
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/user-feedbacks"
            className={({ isActive }) =>
              `px-2 py-4 rounded transition items-center gap-x-2 flex duration-200 hover:bg-[#3d3b97] ${
                isActive
                  ? "items-center justify-start  bg-[#5460be] bg-opacity-25 rounded-md shadow-md shadow-slate-950 w-full m-auto text-sm font-poppins font-medium"
                  : " items-center justify-start shadow-inner shadow-[#545bb9] bg-[#3e4264] bg-opacity-25 rounded-md opacity-75 w-full m-auto text-sm font-poppins font-medium"
              }`
            }
          >
            <MdOutlineSettingsPhone className="text-xl" />
            Requests
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/user-feedbacks"
            className={({ isActive }) =>
              `px-2 py-4 rounded transition items-center gap-x-2 flex duration-200 hover:bg-[#3d3b97] ${
                isActive
                  ? "items-center justify-start  bg-[#5460be] bg-opacity-25 rounded-md shadow-md shadow-slate-950 w-full m-auto text-sm font-poppins font-medium"
                  : " items-center justify-start shadow-inner shadow-[#545bb9] bg-[#3e4264] bg-opacity-25 rounded-md opacity-75 w-full m-auto text-sm font-poppins font-medium"
              }`
            }
          >
            <VscFeedback className="text-xl" />
            Feedbacks
          </NavLink>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default OwnerSidebarLinks;
