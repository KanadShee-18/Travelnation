import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../services/servercalls/authApis";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContextProvider";
import { RxDropdownMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa6";
import { IoIosArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const navLinksRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const [home, setHome] = useState(true);
  const [openDash, setOpenDash] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    if (location.pathname === "/") {
      setHome(true);
    } else {
      setHome(false);
    }
  }, [location.pathname, user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDash(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutsideNav = (event) => {
      if (navLinksRef.current && !navLinksRef.current.contains(event.target)) {
        setIsNavbarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideNav);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideNav);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 min-w-[100vw] max-w-[100vw] z-[100] backdrop-blur-sm ${
        home
          ? "h-[86px]"
          : "h-16 navBar bg-opacity-80  shadow-md shadow-slate-300"
      }`}
    >
      <div className="flex items-center justify-between w-11/12 h-full mx-auto">
        <div className="relative flex items-center">
          {/* Logo */}
          <div className={`${home ? "md:w-20 w-14" : "md:w-14 w-12"} h-full`}>
            <img src={logo} className="aspect-square" alt="WanderLust" />
          </div>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
            className={`absolute text-xl ${
              home ? "text-slate-300" : "text-slate-800"
            } md:hidden left-16 top-5`}
          >
            {isNavbarOpen ? <IoIosArrowDropdown /> : <FaBars />}
          </button>
          {/* Nav links */}
          <div
            ref={navLinksRef}
            className={`${
              isNavbarOpen
                ? `flex ${
                    home ? "bg-slate-600" : "bg-slate-300"
                  } backdrop-blur-md`
                : "hidden md:flex"
            } md:flex-row flex-col md:text-base text-sm font-inter items-center gap-x-4 absolute md:relative left-16 shadow-md shadow-slate-900 md:left-0 top-12 md:top-0 md:bg-transparent  rounded-lg md:rounded-none bg-opacity-85 md:bg-opacity-100 ${
              home
                ? "text-blue-200"
                : "text-slate-800 tracking-wide font-medium"
            }`}
          >
            <Link to="/" className="px-4 py-2 hover:text-[#ff4784] rounded-2xl">
              Home
            </Link>
            <Link
              to="/accomodations"
              className="px-4 py-2 hover:text-[#ff4784] rounded-2xl"
            >
              Explore
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 hover:text-[#ff4784] rounded-2xl"
            >
              About
            </Link>
          </div>
        </div>

        {/* Theme and User Controls */}
        <div className="flex items-center gap-x-2">
          {/* Toggle Theme Button */}
          {/* <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === "light" ? "bg-blue-200" : "bg-slate-800"
            }`}
          >
            {theme === "light" ? <FiSun /> : <FaMoon />}
          </button> */}

          {/* Auth Buttons or User Dropdown */}
          {!user ? (
            <div className="flex gap-x-2">
              <button
                onClick={() => navigate("/signup")}
                className={`px-3 py-2 rounded-xl hover:text-blue-100 shadow-md shadow-slate-900 text-sm  ${
                  home
                    ? "bg-slate-700 text-blue-200 hover:bg-[#ee135c]"
                    : "bg-slate-400 hover:bg-[#ee135c]"
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/login")}
                className={`px-3 py-2 rounded-xl shadow-md hover:text-blue-100 shadow-slate-900 text-sm  ${
                  home
                    ? "bg-slate-700 text-blue-200 hover:bg-[#ee135c]"
                    : "bg-slate-400 hover:bg-[#ee135c]"
                }`}
              >
                Log In
              </button>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenDash(!openDash)}
                className={`text-xl ${
                  home ? "text-blue-200" : "text-slate-800"
                }`}
              >
                <RxDropdownMenu />
              </button>
              <motion.div
                initial={{ opacity: 0, y: "-20%", scale: 0.9 }}
                animate={{
                  opacity: openDash ? 1 : 0,
                  y: openDash ? "0%" : "-20%",
                  scale: openDash ? 1 : 0.9,
                }}
                transition={{ duration: 0.4 }}
                className={`absolute right-0 mt-2 bg-slate-400 text-blue-200 shadow-lg rounded-lg p-2 ${
                  openDash ? "block" : "hidden"
                }`}
              >
                <button
                  onClick={() => {
                    dispatch(logOut(navigate));
                    setOpenDash(false);
                  }}
                  className="w-full md:text-base text-xs bg-slate-700 shadow-md shadow-slate-950 md:px-3 px-2 py-2 md:text-left text-center hover:bg-[#ee135c] rounded-lg mb-2"
                >
                  Log Out
                </button>
                <button
                  onClick={() => navigate("/dashboard/profile")}
                  className="w-full px-2 md:px-3 py-2 bg-slate-700 md:text-left text-center md:text-base text-xs shadow-md shadow-slate-950 hover:bg-[#ee135c] rounded-lg"
                >
                  Dashboard
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
