import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../utils/constants";
import OwnerSidebarLinks from "./OwnerSidebarLinks";
import VisitorSidebarLinks from "./VisitorSidebarLinks";
import { RiExpandRightLine, RiExpandLeftLine } from "react-icons/ri";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`md:sticky fixed top-0 left-0 z-30 pt-16 min-h-screen transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      w-[270px] p-4 text-white backdrop-blur-sm bg-[#313a57] dark:bg-opacity-75`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute top-20 md:top-4 ${
          isOpen ? "right-4" : "-right-7"
        } p-1 bg-slate-500 text-black rounded-full hover:text-slate-100
        active:bg-slate-400 active:text-black shadow-md shadow-slate-900 transition-transform`}
      >
        {isOpen ? <RiExpandLeftLine /> : <RiExpandRightLine />}
      </button>

      {/* Sidebar Content */}
      {user?.accountType === ACCOUNT_TYPE.OWNER && <OwnerSidebarLinks />}
      {user?.accountType === ACCOUNT_TYPE.VISITOR && <VisitorSidebarLinks />}
    </div>
  );
};

export default Sidebar;
