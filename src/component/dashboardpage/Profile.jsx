import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const { name, email, accountType } = user;

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
      className="relative pt-16 text-blue-500"
    >
      <div className="relative z-20 gap-y-7 max-w-[500px] mx-auto mt-32 flex flex-col p-8 mb-20 rounded-xl shadow-md bg-opacity-30 bg-[#3f467a]  shadow-[#4953a5] hover:shadow-slate-950 transition-all duration-200 hover:scale-95">
        <div className="absolute w-3/4 h-4/5 bg-gradient-to-br from-[#6644ff] via-[#615fff] to-[#ff1f88]  rounded-t-2xl rounded-br-3xl blur-[90px] opacity-25 bottom-0 right-0 translate-x-[50%] translate-y-[50%]"></div>
        <h1 className="text-4xl font-semibold text-start text-transparent font-poppins bg-gradient-to-r from-[#6644ff] via-[#615fff] to-[#ff1f88] drop-shadow-2xl bg-clip-text">
          Hi, {name}! Welcome Back
        </h1>
        <p className="text-3xl font-medium tracking-wide text-transparent bg-gradient-to-br from-purple-400 to-blue-500 drop-shadow-2xl bg-clip-text text-start">
          YOUR PROFILE
        </p>

        <div className="flex flex-col px-5 pb-10 gap-y-5 place-items-center items-start justify-center py-5 bg-[#5460be] bg-opacity-25 rounded-xl shadow-md shadow-slate-950 w-full m-auto text-xl font-poppins font-medium text-[#aa96ff]">
          <p>
            Name: <span className="font-inter text-slate-400">{name}</span>
          </p>
          <p>
            Email Id: <span className="font-inter text-slate-400">{email}</span>
          </p>
          <p>
            Account Type:{" "}
            <span className="font-inter text-slate-400">{accountType}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
