import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getResetPasswordToken } from "../../services/servercalls/authApis";
import Spinner from "../common/Spinner";

const LogIn = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const location = useLocation();

  const [email, setEmail] = useState("");

  const [emailSent, setEmailSent] = useState(false);

  // console.log("Email coming as: ", email);

  useEffect(() => {}, [location.pathname]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // console.log("Call coming in fom submit event.");

    dispatch(getResetPasswordToken(email, setEmailSent));
  };

  return (
    <div className="w-screen h-screen mt-6">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10 h-[70vh]"></div>
      <div className="fixed top-0 w-full h-full">
        <div className="absolute top-0 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
      {loading ? (
        <div className="grid w-full h-[30vh] place-items-center">
          <Spinner />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: "-90%", y: "-60%", scale: 0.3 }}
          whileInView={{ opacity: 1, x: "0%", y: "0%", scale: 1 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 40,
            // damping: 20,
          }}
          className="relative z-20 max-w-[450px] mx-auto mt-32 flex flex-col p-8 mb-20 rounded-xl shadow-md bg-opacity-20 bg-[#4953a5]  shadow-[#4953a5]"
        >
          <div className="absolute -z-10 w-3/4 h-4/5 bg-gradient-to-br from-[#6644ff] via-[#615fff] to-[#ff1f88]  rounded-t-2xl rounded-br-3xl blur-[90px] opacity-15 bottom-0 right-0 translate-x-[50%] translate-y-[50%]"></div>
          <p className="text-4xl font-semibold text-center text-transparent font-poppins bg-gradient-to-r from-[#6644ff] via-[#615fff] to-[#6644ff] drop-shadow-2xl bg-clip-text">
            {emailSent ? "Check Your Email" : "Reset Your Password"}
          </p>
          <p className="my-6 text-base font-medium tracking-wide text-transparent bg-gradient-to-br from-purple-400 to-blue-500 drop-shadow-2xl bg-clip-text text-start">
            {emailSent
              ? "Password Reset link has been sent to your gmail. Kindly check your Inbox."
              : "Don't panic. We'll sent a reset password link to your email."}
          </p>

          <form onSubmit={handleOnSubmit} className="px-1 my-5">
            <div className="flex flex-col pb-10 gap-y-5 place-items-center items-center justify-around py-5 bg-[#5460be] bg-opacity-25 rounded-xl shadow-md shadow-slate-950 w-full m-auto text-[#937aff]">
              <div className="w-full px-5">
                <label className="space-y-1">
                  <p className="text-base tracking-wide text-blue-400 text-start">
                    Email <sup className="text-lg text-pink-500">*</sup>{" "}
                  </p>
                  <div className="rounded-md shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
                    <input
                      type={"email"}
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Provide Your Email"
                      className="w-full p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
                    />
                  </div>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 text-sm mt-10 bg-gradient-to-r from-[#3d3b97] via-[#615fff] to-[#3d3b97] rounded-lg text-slate-200 tracking-wider drop-shadow-xl transition-all duration-200 hover:scale-95 hover:bg-gradient-to-br hover:from-[#3d3b97] hover:via-[#615fff] hover:to-[#3d3b97] active:bg-gradient-to-bl active:from-[#3d3b97] active:via-[#615fff] active:to-[#3d3b97]"
            >
              GET PASSWORD RESET LINK
            </button>
          </form>

          <div className="flex flex-row justify-between px-2 mt-5">
            <Link
              to={"/login"}
              className="font-semibold text-center text-transparent font-poppins bg-gradient-to-r from-[#7455ff] to-[#0bb6c2] bg-clip-text hover:-translate-x-2 transition-all duration-200 ease-in-out"
            >
              &larr; Back to Login
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LogIn;
