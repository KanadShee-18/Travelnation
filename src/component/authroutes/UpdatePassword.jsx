import React, { useState } from "react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { validate, validatePassword } from "../../utils/validate";
import Spinner from "../common/Spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../services/servercalls/authApis";
import PassValidator from "../common/ValidatePassword";

const UpdatePassword = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [showCnfmPwd, setShowCnfmPwd] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const { newPassword, confirmNewPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((previousData) => ({
      ...previousData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast("Both passwords have to be matched.");
      return;
    }
    const msg1 = validatePassword(newPassword);
    const msg2 = validatePassword(confirmNewPassword);
    if (msg1) {
      setErrMsg(msg1);
      return;
    }
    if (msg2) {
      setErrMsg(msg2);
      return;
    }

    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(newPassword, confirmNewPassword, token, navigate));
  };

  return (
    // <form onSubmit={handleOnSubmit} className="flex flex-col mt-5 gap-y-3">
    //   <div>
    //     <label className="space-y-1">
    //       <p className="text-base tracking-wide text-blue-400 text-start">
    //         Password <sup className="text-lg text-pink-500">*</sup>{" "}
    //       </p>
    //       <div className="rounded-md flex flex-row items-center relative shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
    //         <input
    //           type={showPwd ? "text" : "password"}
    //           required
    //           name="newPassword"
    //           value={newPassword}
    //           onChange={handleOnChange}
    //           placeholder="Enter Password"
    //           className="w-full p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
    //         />
    //         <span
    //           onClick={() => setShowPwd(!showPwd)}
    //           className="mr-3 text-xl text-[#ff387a] hover:cursor-pointer"
    //         >
    //           {showPwd ? <IoEyeSharp /> : <IoEyeOffSharp />}
    //         </span>
    //       </div>
    //     </label>
    //   </div>
    //   <div>
    //     <label className="space-y-1">
    //       <p className="text-base tracking-wide text-blue-400 text-start">
    //         Confirm Password <sup className="text-lg text-pink-500">*</sup>{" "}
    //       </p>
    //       <div className="rounded-md flex flex-row items-center shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
    //         <input
    //           type={showCnfmPwd ? "text" : "password"}
    //           required
    //           name="confirmNewPassword"
    //           value={confirmNewPassword}
    //           onChange={handleOnChange}
    //           placeholder="Confirm Password"
    //           className="w-full p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
    //         />
    //         <span
    //           onClick={() => setShowCnfmPwd(!showCnfmPwd)}
    //           className="mr-3 text-xl text-[#ff387a] hover:cursor-pointer"
    //         >
    //           {showCnfmPwd ? <IoEyeSharp /> : <IoEyeOffSharp />}
    //         </span>
    //       </div>
    //     </label>
    //   </div>
    //   {errMsg ? (
    //     <p className="text-xs text-pink-500 text-start">{errMsg}</p>
    //   ) : (
    //     <PassValidator />
    //   )}
    //   {loading && (
    //     <div className="flex justify-center w-full mt-3">
    //       <Spinner />
    //     </div>
    //   )}
    //   <button
    //     type="submit"
    //     className="w-full text-sm tracking-wide font-medium hover:bg-gradient-to-r hover:from-[#6644ff] hover:via-[#cf225b] hover:to-[#e41ba1] mt-8 py-3 text-blue-100 bg-gradient-to-r from-[#e41ba1] via-[#cf225b] to-[#6644ff] rounded-md active:bg-gradient-to-bl active:from-[#cf225b] active:via-[#e41ba1] active:to-[#6644ff]"
    //   >
    //     SUBMIT NEW PASSWORD
    //   </button>
    // </form>
    <div className="w-screen h-screen mt-6">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10 h-[70vh]"></div>
      <div className="fixed top-0 w-full h-full">
        <div className="absolute top-0 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
      {loading ? (
        <Spinner />
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
          className="relative z-20 max-w-[500px] mx-auto mt-32 flex flex-col p-8 mb-20 rounded-xl shadow-md bg-opacity-20 bg-[#4953a5]  shadow-[#4953a5]"
        >
          <div className="absolute -z-10 w-3/4 h-4/5 bg-gradient-to-br from-[#6644ff] via-[#615fff] to-[#ff1f88]  rounded-t-2xl rounded-br-3xl blur-[90px] opacity-15 bottom-0 right-0 translate-x-[50%] translate-y-[50%]"></div>
          <p className="text-4xl font-semibold text-center text-transparent font-poppins bg-gradient-to-r from-[#6644ff] via-[#615fff] to-[#ff1f88] drop-shadow-2xl bg-clip-text">
            Update Your Password
          </p>
          <p className="my-6 text-base font-medium tracking-wide text-transparent bg-gradient-to-br from-purple-400 to-blue-500 drop-shadow-2xl bg-clip-text text-start">
            Make sure both of the passwords must be same
          </p>

          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col mt-5 gap-y-3"
          >
            <div className="flex flex-col pb-10 gap-y-5 place-items-center items-center justify-around py-5 bg-[#5460be] bg-opacity-25 rounded-xl shadow-md shadow-slate-950 w-full m-auto text-[#937aff]">
              <div className="w-full px-5">
                <label className="space-y-1">
                  <p className="text-base tracking-wide text-blue-400 text-start">
                    New Password <sup className="text-lg text-pink-500">*</sup>{" "}
                  </p>
                  <div className="rounded-md flex flex-row items-center relative shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
                    <input
                      type={showPwd ? "text" : "password"}
                      required
                      name="newPassword"
                      value={newPassword}
                      onChange={handleOnChange}
                      placeholder="Enter Password"
                      className="w-full p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
                    />
                    <span
                      onClick={() => setShowPwd(!showPwd)}
                      className="mr-5 right-0 absolute text-xl text-[#7a77ff] hover:cursor-pointer"
                    >
                      {showPwd ? <IoEyeSharp /> : <IoEyeOffSharp />}
                    </span>
                  </div>
                </label>
              </div>
              <div className="w-full px-5">
                <label className="space-y-1">
                  <p className="text-base tracking-wide text-blue-400 text-start">
                    Confirm New Password{" "}
                    <sup className="text-lg text-pink-500">*</sup>{" "}
                  </p>
                  <div className="rounded-md relative flex flex-row items-center shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
                    <input
                      type={showCnfmPwd ? "text" : "password"}
                      required
                      name="confirmNewPassword"
                      value={confirmNewPassword}
                      onChange={handleOnChange}
                      placeholder="Confirm Password"
                      className="w-full p-3 pr-12 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
                    />
                    <span
                      onClick={() => setShowCnfmPwd(!showCnfmPwd)}
                      className="right-0 mr-4 absolute text-xl text-[#7a77ff] hover:cursor-pointer"
                    >
                      {showCnfmPwd ? <IoEyeSharp /> : <IoEyeOffSharp />}
                    </span>
                  </div>
                </label>
              </div>
            </div>
            {errMsg ? (
              <p className="text-xs text-pink-500 text-start">{errMsg}</p>
            ) : (
              <PassValidator />
            )}
            {loading && (
              <div className="flex justify-center w-full mt-3">
                <Spinner />
              </div>
            )}
            <button
              type="submit"
              className="w-full text-sm tracking-wide font-medium hover:bg-gradient-to-r hover:from-[#6644ff] hover:via-[#cf225b] hover:to-[#e41ba1] mt-8 py-3 text-blue-100 bg-gradient-to-r from-[#e41ba1] via-[#cf225b] to-[#6644ff] rounded-md active:bg-gradient-to-bl active:from-[#cf225b] active:via-[#e41ba1] active:to-[#6644ff]"
            >
              SUBMIT NEW PASSWORD
            </button>
            <div className="flex flex-row justify-between px-2 mt-5">
              <Link
                to={"/login"}
                className="font-semibold text-center text-transparent font-poppins bg-gradient-to-r from-[#7455ff] to-[#0bb6c2] bg-clip-text hover:-translate-x-2 transition-all duration-200 ease-in-out"
              >
                &larr; Back to Login
              </Link>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default UpdatePassword;
