import React from "react";
import SignUpImg from "../assets/authAssests/signup.jpg";
import SignUpForm from "../component/authroutes/SignUpForm";

const SignUp = () => {
  return (
    <div className="relative flex items-center justify-center max-w-full overflow-x-hidden text-white ">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 max-w-full">
        <img
          src={SignUpImg}
          alt="Sign Up"
          className="object-cover w-full h-full "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-800 to-slate-900 opacity-85"></div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex justify-center w-10/12 p-8 text-center md:flex-row">
        <div className="w-full md:w-[500px]">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
