import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../common/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../../services/servercalls/authApis";
import OTPInput from "react-otp-input";
import { LuTimerReset } from "react-icons/lu";

const OtpVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { signUpDetails, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signUpDetails) {
      navigate("/signup");
    }
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { accountType, name, email, password, confirmPassword } =
      signUpDetails;

    dispatch(
      signUp(accountType, name, email, password, confirmPassword, otp, navigate)
    );
  };

  return (
    <div className="w-screen h-screen mt-16 ">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10 h-[70vh]"></div>
      <div className="fixed top-0 w-full h-full">
        <div className="absolute top-0 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="relative z-20 max-w-[500px] mx-auto mt-36 flex flex-col p-8 mb-20 rounded-xl shadow-md bg-opacity-20 bg-[#4953a5] backdrop-blur-sm shadow-[#4953a5]">
          <p className="text-4xl font-semibold text-center text-transparent font-poppins bg-gradient-to-r from-[#6644ff] via-[#615fff] to-[#ff1f88] drop-shadow-2xl bg-clip-text">
            Verify Your Email
          </p>
          <p className="mt-2 mb-4 text-lg font-medium tracking-wide text-transparent bg-gradient-to-br from-purple-400 to-blue-500 drop-shadow-2xl bg-clip-text text-start">
            A Verification Code has been sent to our Email.
          </p>
          <p className="text-transparent bg-gradient-to-r from-[#ff3493] via-[#817fff] to-[#b861ff] drop-shadow-2xl bg-clip-text font-medium font-poppins tracking-wide text-center">
            Enter the 6 digit CODE below.
          </p>

          <form onSubmit={handleOnSubmit} className="px-1 my-10">
            <div className="flex flex-row place-items-center items-center justify-around py-5 bg-[#5460be] bg-opacity-25 rounded-xl shadow-md shadow-slate-950 w-full m-auto text-[#937aff]">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="mx-1">-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="!w-10 !h-12 text-lg font-semibold text-center bg-[#393f66] bg-opacity-25 shadow-md shadow-slate-950 rounded-md outline-none mx-1 transition-[border] duration-300"
                  />
                )}
              />
            </div>
            <button
              className="w-full py-3 mt-10 bg-gradient-to-r from-[#3d3b97] via-[#615fff] to-[#3d3b97] rounded-lg text-slate-200 tracking-wider drop-shadow-xl transition-all duration-200 hover:scale-95 hover:bg-gradient-to-br hover:from-[#3d3b97] hover:via-[#615fff] hover:to-[#3d3b97] active:bg-gradient-to-bl active:from-[#3d3b97] active:via-[#615fff] active:to-[#3d3b97]"
              type="submit"
            >
              VERIFY OTP
            </button>
          </form>
          <div className="flex flex-row justify-between px-2 mt-5">
            <Link
              to={"/login"}
              className="font-semibold text-center text-transparent font-poppins bg-gradient-to-r from-[#7455ff] to-[#0bb6c2] bg-clip-text hover:-translate-x-2 transition-all duration-200 ease-in-out"
            >
              &larr; Back to Login
            </Link>
            <button
              onClick={() => dispatch(sendOtp(signupDetails.email))}
              className="flex flex-row items-center transition-all duration-200 gap-x-2 hover:scale-95"
            >
              <LuTimerReset className="text-[#7455ff] text-lg" />
              <p className="font-semibold text-center text-transparent font-poppins bg-gradient-to-r from-[#349aa1] to-[#7455ff] bg-clip-text ">
                {" "}
                Resend It
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtpVerification;
