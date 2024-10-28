import React, { useState } from "react";
import { LuTimerReset } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../component/common/Spinner";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { logIn } from "../services/servercalls/authApis";
import { motion } from "framer-motion";
import CardShimmer from "../component/common/CardShimmer";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [showPwd, setShowPwd] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(formData.email, formData.password, navigate));
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="w-screen h-screen mt-6">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10 h-[70vh]"></div>
      <div className="fixed top-0 w-full h-full">
        <div className="absolute top-0 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
      {loading ? (
        <div className="flex flex-col gap-y-3 w-full h-[90vh] justify-center items-center">
          <Spinner />
          <CardShimmer />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: "90%", y: "60%", scale: 0.3 }}
          whileInView={{ opacity: 1, x: "0%", y: "0%", scale: 1 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 40,
            // damping: 20,
          }}
          className="relative z-20 max-w-[500px] mx-auto mt-32 flex flex-col p-8 mb-20 rounded-xl shadow-md bg-opacity-15  bg-[#4953a5]  shadow-[#4953a5]"
        >
          <div className="absolute -z-10 w-3/4 h-4/5 bg-gradient-to-br from-[#6644ff] via-[#615fff] to-[#ff1f88]  rounded-t-2xl rounded-br-3xl blur-[90px] opacity-15 bottom-0 right-0 translate-x-[50%] translate-y-[50%]"></div>
          <p className="text-4xl font-semibold text-center text-transparent font-poppins bg-gradient-to-r from-[#6644ff] via-[#615fff] to-[#6644ff] drop-shadow-2xl bg-clip-text">
            Ready to Discover More
          </p>
          <p className="my-6 text-base font-medium tracking-wide text-transparent bg-gradient-to-br from-slate-400 to-slate-300 drop-shadow-2xl bg-clip-text text-start">
            <span className="text-pink-500">Sign in</span> to explore unique
            stays, exclusive deals, and make your next trip unforgettable.
          </p>

          <form onSubmit={handleOnSubmit} className="px-1 my-5">
            <div className="flex flex-col pb-10 gap-y-5 place-items-center items-center justify-around py-5 bg-[#5460be] bg-opacity-25 rounded-xl shadow-md shadow-slate-950 w-full m-auto text-[#937aff]">
              <div className="w-full px-5">
                <label className="space-y-1">
                  <p className="text-base tracking-wide text-slate-300 text-start">
                    Email <sup className="text-lg text-pink-500">*</sup>{" "}
                  </p>
                  <div className="rounded-md shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
                    <input
                      type={"email"}
                      required
                      name="email"
                      value={email}
                      onChange={handleOnChange}
                      placeholder="Provide Your Email"
                      className="w-full p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
                    />
                  </div>
                </label>
              </div>
              <div className="w-full px-5">
                <label className="space-y-1">
                  <p className="text-base tracking-wider text-slate-300 text-start">
                    Password <sup className="text-lg text-pink-500">*</sup>{" "}
                  </p>
                  <div className="rounded-md flex items-center relative shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
                    <input
                      type={showPwd ? "text" : "password"}
                      required
                      name="password"
                      value={password}
                      autoComplete="off"
                      onChange={handleOnChange}
                      placeholder="Enter Password"
                      className="w-full p-3 pr-12 rounded-md tracking-wider text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
                    />
                    <span
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 text-xl text-[#7a77ff] hover:cursor-pointer"
                    >
                      {showPwd ? <IoEyeSharp /> : <IoEyeOffSharp />}
                    </span>
                  </div>
                </label>
              </div>
            </div>
            <button
              className="w-full py-3 mt-10 bg-gradient-to-r from-[#3d3b97] via-[#615fff] to-[#3d3b97] rounded-lg text-slate-200 tracking-wider drop-shadow-xl transition-all duration-200 hover:scale-95 hover:bg-gradient-to-br hover:from-[#3d3b97] hover:via-[#615fff] hover:to-[#3d3b97] active:bg-gradient-to-bl active:from-[#3d3b97] active:via-[#615fff] active:to-[#3d3b97]"
              type="submit"
            >
              SIGN IN
            </button>
          </form>

          <div className="flex flex-row justify-between px-2 mt-5">
            <Link
              to={"/signup"}
              className="font-semibold text-center text-transparent font-poppins bg-gradient-to-r from-[#757ca1] to-[#878fb8] bg-clip-text hover:-translate-x-2 transition-all duration-200 ease-in-out"
            >
              &larr; No Account ?
            </Link>
            <button
              onClick={() => navigate("/reset-password")}
              className="flex flex-row items-center transition-all duration-200 ease-in-out gap-x-2 hover:translate-x-2"
            >
              <p className="font-semibold text-center text-transparent font-poppins bg-gradient-to-r from-[#878fb8] to-[#757ca1] bg-clip-text ">
                {" "}
                Forget Password &rarr;
              </p>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LogIn;
