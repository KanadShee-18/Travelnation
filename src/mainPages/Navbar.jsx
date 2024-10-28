import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../services/servercalls/authApis";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContextProvider";

const Navbar = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [home, setHome] = useState(true);

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
      className={`fixed top-0 w-full ${
        home
          ? "h-[86px]"
          : "h-16 navBar bg-opacity-80 border-b-2 border-pink-500 dark:border-slate-500"
      } z-[100] backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between w-11/12 h-full mx-auto">
        <div className="flex gap-x-10">
          <div className={`${home ? "w-20" : "w-14"} h-full`}>
            <img src={logo} className={`aspect-square`} alt="WanderLust" />
          </div>
          <div
            className={`flex items-center md:text-base text-sm ${
              home
                ? "text-blue-200 "
                : "text-blue-300 tracking-wide  font-medium"
            } font-imprima`}
          >
            <Link
              to={"/"}
              className="px-4 py-2 hover:text-[#ff4784] drop-shadow-xl rounded-2xl hover:cursor-pointer"
            >
              Home
            </Link>
            <Link
              to={"/accomodations"}
              className="px-4 py-2 hover:text-[#ff4784] drop-shadow-xl rounded-2xl hover:cursor-pointer"
            >
              Explore
            </Link>
            <p className="px-4 py-2 hover:text-[#ff4784] drop-shadow-xl rounded-2xl hover:cursor-pointer">
              About
            </p>
            <p className="px-4 py-2 hover:text-[#ff4784] drop-shadow-xl rounded-2xl hover:cursor-pointer">
              Contact Us
            </p>
          </div>
        </div>
        <div
          className={`text-sm flex px-1 items-center py-1 rounded-full gap-x-2 font-inter ${
            home ? "text-[#aec7f5]" : "text-[#78a3f1]"
          }  drop-shadow-2xl font-medium`}
        >
          <div
            onClick={() => toggleTheme()}
            className="relative flex items-center p-1 rounded-full w-14 h-7 dark:bg-slate-800 bg-blue-200 text-[#878fff]"
          >
            <div
              className={`w-6 h-6 dark:bg-slate-600 bg-slate-700 light:bg-white rounded-full flex items-center justify-center transform transition-all duration-500 ease-in-out ${
                theme === "light" ? "translate-x-0" : "translate-x-6"
              }`}
            >
              <button
                onClick={() => {
                  console.log("Theme button clicked.");
                }}
                className="text-xl"
              >
                {theme === "light" ? <FiSun /> : <FaMoon />}
              </button>
            </div>
          </div>

          {!user ? (
            <>
              <button
                onClick={() => navigate("/signup")}
                className={`
              ${
                home
                  ? "shadow-[#6c8ece] bg-opacity-35 bg-slate-700 hover:bg-opacity-90 hover:bg-[#ee135c]"
                  : "shadow-slate-900 bg-opacity-15 bg-slate-400 hover:bg-opacity-80 hover:bg-[#ee135c]"
              }
              px-3 py-2 rounded-xl tracking-wide  shadow-md `}
              >
                Sign Up
              </button>

              <button
                onClick={() => navigate("/login")}
                className={`
              ${
                home
                  ? "shadow-[#6c8ece] bg-opacity-35 bg-slate-700 hover:bg-opacity-90 hover:bg-[#ee135c]"
                  : "shadow-slate-900 bg-opacity-15 bg-slate-400 hover:bg-opacity-80 hover:bg-[#ee135c]"
              }
              px-3 py-2 rounded-xl  shadow-md `}
              >
                Log In
              </button>
            </>
          ) : (
            <div>
              <button
                onClick={() => dispatch(logOut(navigate))}
                className={`
                shadow-[#6c8ece] bg-opacity-35 hover:bg-opacity-90 hover:bg-[#ee135c]"
                     "shadow-blue-400  hover:bg-[#ee135c]
                }
                px-3 py-2 rounded-xl bg-slate-800 shadow-inner `}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
