// import React, { useContext, useEffect, useState } from "react";
// import logo from "../assets/logo.png";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logOut } from "../services/servercalls/authApis";
// import { FiSun } from "react-icons/fi";
// import { FaMoon } from "react-icons/fa";
// import { ThemeContext } from "../context/ThemeContextProvider";
// import { RxDropdownMenu } from "react-icons/rx";
// import { motion } from "framer-motion";
// import { FaBars } from "react-icons/fa6";
// import { IoIosArrowDropdown } from "react-icons/io";

// const Navbar = () => {
//   const { toggleTheme } = useContext(ThemeContext);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.user);
//   const [home, setHome] = useState(true);
//   const [openDash, setOpenDash] = useState(false);
//   const [isNavbarOpen, setIsNavbarOpen] = useState(false);

//   // console.log("Opendash ", openDash);

//   const { theme } = useSelector((state) => state.theme);

//   useEffect(() => {
//     if (location.pathname === "/") {
//       setHome(true);
//     } else {
//       setHome(false);
//     }
//   }, [location.pathname, user]);

//   return (
//     <div
//       className={`fixed top-0 w-full ${
//         home
//           ? "h-[86px]"
//           : "h-16 navBar bg-opacity-80 border-b-2 border-pink-500 dark:border-slate-500"
//       } z-[100] backdrop-blur-sm`}
//     >
//       <div className="flex items-center justify-between w-11/12 h-full mx-auto">
//         <div className="relative flex md:gap-x-10 gap-x-2">
//           <button
//             onClick={() => setIsNavbarOpen(!isNavbarOpen)}
//             className="absolute text-xl text-blue-200 md:hidden left-16 top-5"
//           >
//             {!isNavbarOpen ? <FaBars /> : <IoIosArrowDropdown />}
//           </button>
//           <div className={`${home ? "md:w-20 w-14" : "md:w-14 w-12"} h-full`}>
//             <img src={logo} className={`aspect-square`} alt="WanderLust" />
//           </div>

//           <div
//             className={`flex absolute md:relative left-16 md:left-0 top-10 md:top-0 bg-slate-800 md:bg-transparent rounded-lg md:rounded-none bg-opacity-55 md:bg-opacity-100 ${
//               isNavbarOpen ? "flex-col block" : "hidden md:block"
//             } md:flex-row items-center md:text-base text-sm ${
//               home
//                 ? "text-blue-200 "
//                 : "text-blue-300 tracking-wide  font-medium"
//             } font-imprima`}
//           >
//             <Link
//               to={"/"}
//               className="md:px-4 px-2 py-2 hover:text-[#ff4784] drop-shadow-xl rounded-2xl hover:cursor-pointer"
//             >
//               Home
//             </Link>
//             <Link
//               to={"/accomodations"}
//               className="md:px-4 px-2  py-2 hover:text-[#ff4784] drop-shadow-xl rounded-2xl hover:cursor-pointer"
//             >
//               Explore
//             </Link>
//             <Link
//               to={"/about"}
//               className="md:px-4 px-2  py-2 hover:text-[#ff4784] drop-shadow-xl rounded-2xl hover:cursor-pointer"
//             >
//               About
//             </Link>
//             {/* <p className="px-4 py-2 hover:text-[#ff4784] drop-shadow-xl rounded-2xl hover:cursor-pointer">
//               Contact Us
//             </p> */}
//           </div>
//         </div>
//         <div
//           className={`text-sm flex px-1 items-center py-1 rounded-full gap-x-2 font-inter ${
//             home ? "text-[#aec7f5]" : "text-[#78a3f1]"
//           }  drop-shadow-2xl font-medium`}
//         >
//           {/* <div
//             onClick={() => toggleTheme()}
//             className="relative flex items-center p-1 rounded-full w-14 h-7 dark:bg-slate-800 bg-blue-200 text-[#878fff]"
//           >
//             <div
//               className={`w-6 h-6 dark:bg-slate-600 bg-slate-700 light:bg-white rounded-full flex items-center justify-center transform transition-all duration-500 ease-in-out ${
//                 theme === "light" ? "translate-x-0" : "translate-x-6"
//               }`}
//             >
//               <button
//                 onClick={() => {
//                   console.log("Theme button clicked.");
//                 }}
//                 className="text-xl"
//               >
//                 {theme === "light" ? <FiSun /> : <FaMoon />}
//               </button>
//             </div>
//           </div> */}

//           {!user ? (
//             <>
//               <button
//                 onClick={() => navigate("/signup")}
//                 className={`
//               ${
//                 home
//                   ? "shadow-[#6c8ece] bg-opacity-35  bg-slate-700 hover:bg-opacity-90 hover:bg-[#ee135c]"
//                   : "shadow-slate-900 bg-opacity-15 bg-slate-400 hover:bg-opacity-80 hover:bg-[#ee135c]"
//               }
//               px-3 py-2 rounded-xl tracking-wide text-nowrap text-xs md:text-sm shadow-md `}
//               >
//                 Sign Up
//               </button>

//               <button
//                 onClick={() => navigate("/login")}
//                 className={`
//               ${
//                 home
//                   ? "shadow-[#6c8ece] bg-opacity-35 bg-slate-700 hover:bg-opacity-90 hover:bg-[#ee135c]"
//                   : "shadow-slate-900 bg-opacity-15 bg-slate-400 hover:bg-opacity-80 hover:bg-[#ee135c]"
//               }
//               px-3 py-2 rounded-xl  shadow-md text-xs text-nowrap md:text-sm`}
//               >
//                 Log In
//               </button>
//             </>
//           ) : (
//             <div className="relative">
//               <button
//                 onClick={() => setOpenDash(!openDash)}
//                 className="text-xl text-blue-300"
//               >
//                 <RxDropdownMenu />
//               </button>

//               <motion.div
//                 initial={{ opacity: 0, y: "-40%", scale: 0.3 }}
//                 whileInView={{ opacity: 1, y: "0%", scale: 1 }}
//                 transition={{
//                   duration: 0.6,
//                   type: "spring",
//                   stiffness: 40,
//                 }}
//                 className={`absolute flex flex-col top-12 bg-[#94b6f5] backdrop-blur-xl bg-opacity-40 px-2 py-4 rounded-lg -right-2 gap-y-2 shadow-md shadow-slate-950
//                 ${openDash ? "block" : "hidden"}`}
//               >
//                 <button
//                   onClick={() => dispatch(logOut(navigate))}
//                   className={`
//                   shadow-[#6c8ece] bg-opacity-35 hover:bg-opacity-90 hover:bg-[#ee135c]"
//                        "shadow-blue-400  hover:bg-[#ee135c]
//                   }
//                   px-3 py-2 rounded-lg bg-slate-800 shadow-inner `}
//                 >
//                   Log Out
//                 </button>
//                 <button
//                   onClick={() => navigate("/dashboard/profile")}
//                   className={`
//                   shadow-[#6c8ece] bg-opacity-35 hover:bg-opacity-90 hover:bg-[#ee135c]"
//                        "shadow-blue-400  hover:bg-[#ee135c]
//                   }
//                   px-3 py-2 rounded-lg bg-slate-800 shadow-inner `}
//                 >
//                   Dashboard
//                 </button>
//               </motion.div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext, useEffect, useState } from "react";
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
            className="absolute text-xl text-slate-800 md:hidden left-16 top-5"
          >
            {isNavbarOpen ? <IoIosArrowDropdown /> : <FaBars />}
          </button>
          {/* Nav links */}
          <div
            className={`${
              isNavbarOpen
                ? "flex bg-slate-300 backdrop-blur-md"
                : "hidden md:flex"
            } md:flex-row flex-col md:text-base text-sm font-inter items-center gap-x-4 absolute md:relative left-16 md:left-0 top-12 md:top-0 md:bg-transparent  rounded-lg md:rounded-none bg-opacity-85 md:bg-opacity-100 ${
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
            <div className="relative">
              <button
                onClick={() => setOpenDash(!openDash)}
                className="text-xl text-slate-800"
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
                className={`absolute right-0 mt-2 bg-slate-800 text-blue-200 shadow-lg rounded-lg p-2 ${
                  openDash ? "block" : "hidden"
                }`}
              >
                <button
                  onClick={() => {
                    dispatch(logOut(navigate));
                    setOpenDash(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-[#ee135c] rounded-lg"
                >
                  Log Out
                </button>
                <button
                  onClick={() => navigate("/dashboard/profile")}
                  className="w-full px-3 py-2 text-left hover:bg-[#ee135c] rounded-lg"
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
