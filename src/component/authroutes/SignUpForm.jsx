import React, { useState } from "react";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import PassValidator from "../common/ValidatePassword";
import { toast } from "react-toastify";
import { validate } from "../../utils/validate";
import Tab from "../common/Tab";
import { useDispatch, useSelector } from "react-redux";
import { setSignUpDetails } from "../../slices/authSlice";
import { sendOtp } from "../../services/servercalls/authApis";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.VISITOR);
  const [showPwd, setShowPwd] = useState(false);
  const [showCnfmPwd, setShowCnfmPwd] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast("Both passwords have to be matched.");
      return;
    }
    const validateErr = validate(email, password);
    if (validateErr) {
      toast("Please fill all the fields!");
      setErrMsg(validateErr);
      return;
    }
    const signUpData = {
      ...formData,
      accountType,
    };

    dispatch(setSignUpDetails(signUpData));
    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.VISITOR);
  };

  const tabData = [
    {
      id: 1,
      tabName: "Visitor",
      type: ACCOUNT_TYPE.VISITOR,
    },
    {
      id: 2,
      tabName: "Owner",
      type: ACCOUNT_TYPE.OWNER,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        type: "spring",
        stiffness: 40,
        // damping: 20,
      }}
      className="relative flex flex-col p-3 mt-10 mb-20 bg-opacity-50 rounded-lg shadow-md md:p-8 bg-slate-900 backdrop-blur-sm shadow-slate-950"
    >
      {/* <div className="absolute top-14 -z-10 -right-20 h-[30%] w-[50%] bg-gradient-to-br  from-pink-500 via-blue-500 to-[#cf58ec] rounded-tl-lg rounded-br-md blur-[60px] opacity-25 rounded-bl-xl"></div> */}
      <div>
        <h1 className="md:text-4xl text-xl font-semibold text-center text-transparent md:text-start font-poppins bg-gradient-to-r from-[#6644ff] via-[#615fff] to-[#6644ff] drop-shadow-2xl bg-clip-text">
          Discover Your Next Stay
        </h1>
        <p className="mt-2 mb-4 text-sm font-medium tracking-wide text-transparent md:text-lg bg-gradient-to-br from-slate-400 to-blue-100 drop-shadow-2xl bg-clip-text text-start">
          <span className=" text-transparent md:text-start font-poppins bg-gradient-to-br from-[#ff1f88] via-[#ff3e98] to-[#ff0766] bg-clip-text">
            Sign up
          </span>{" "}
          to unlock exclusive offers and unique stays tailored for you.
        </p>
      </div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col mt-5 md:gap-y-3 gap-y-2"
      >
        <div>
          <label className="space-y-1">
            <p className="text-sm tracking-wide md:text-base text-slate-300 text-start">
              Name <sup className="text-lg text-pink-500">*</sup>{" "}
            </p>
            <div className="rounded-md shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
              <input
                type="text"
                required
                name="name"
                value={name}
                onChange={handleOnChange}
                placeholder="Enter Your Name"
                className="w-full rounded-md p-3 tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
              />
            </div>
          </label>
        </div>
        <div>
          <label className="space-y-1">
            <p className="text-sm tracking-wide md:text-base text-slate-300 text-start">
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
        <div>
          <label className="space-y-1">
            <p className="text-sm tracking-wide md:text-base text-slate-300 text-start">
              Password <sup className="text-lg text-pink-500">*</sup>{" "}
            </p>
            <div className="rounded-md flex flex-row items-center relative shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
              <input
                type={showPwd ? "text" : "password"}
                required
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="w-full p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
              />
              <span
                onClick={() => setShowPwd(!showPwd)}
                className="mr-3 absolute right-0 text-xl text-[#7f81ff] hover:cursor-pointer"
              >
                {showPwd ? <IoEyeSharp /> : <IoEyeOffSharp />}
              </span>
            </div>
          </label>
        </div>
        <div>
          <label className="space-y-1">
            <p className="text-sm tracking-wide md:text-base text-slate-300 text-start">
              Confirm Password <sup className="text-lg text-pink-500">*</sup>{" "}
            </p>
            <div className="rounded-md relative  flex flex-row items-center shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
              <input
                type={showCnfmPwd ? "text" : "password"}
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="w-full p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
              />
              <span
                onClick={() => setShowCnfmPwd(!showCnfmPwd)}
                className="mr-3 right-0 absolute text-xl text-[#7f81ff] hover:cursor-pointer"
              >
                {showCnfmPwd ? <IoEyeSharp /> : <IoEyeOffSharp />}
              </span>
            </div>
          </label>
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
          className="w-full text-sm tracking-wider font-medium hover:bg-gradient-to-br hover:from-[#6644ff] hover:via-[#7573f3] hover:to-[#6644ff] mt-8 py-3 text-blue-100 bg-gradient-to-r from-[#6644ff] via-[#615fff] to-[#6644ff] rounded-md active:bg-gradient-to-bl active:from-[#6644ff] active:via-[#7573f3] active:to-[#6644ff]"
        >
          SIGN UP
        </button>
      </form>
      <div className="flex flex-row justify-between px-2 mt-5">
        <Link
          to={"/login"}
          className="font-semibold text-xs text-center text-transparent font-poppins bg-gradient-to-r from-[#eeeaff] to-[#bbbbec] bg-clip-text hover:translate-x-2 transition-all duration-200 ease-in-out"
        >
          Already have an Account ? &rarr;
        </Link>
      </div>
    </motion.div>
  );
};

export default SignUpForm;
