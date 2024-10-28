import { toast } from "react-toastify";
import { setLoading, setName, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/userSlice";
import { authEndPoints } from "../serverApis";
import { apiConnect } from "../apiConnect";

const {
  OTPSENDING_API,
  SIGNUP_API,
  LOGIN_API,
  CHANGE_PASSWORD_API,
  RESET_PASSWORD_TOKEN_API,
  RESET_PASSWORD_API,
} = authEndPoints;

export function sendOtp(email, navigate) {
  console.log("Req coming to authapi ....");

  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await apiConnect("POST", OTPSENDING_API, {
        email,
        checkUserPresent: true,
      });
      console.log("Sendotp api response: ", response);
      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast("OTP sent successfully to your gmail.");
      navigate("/verify-otp");
    } catch (error) {
      console.log("SENDOTP API error: ", error);
      toast("Could not send OTP.");
    }
    dispatch(setLoading(false));
  };
}

export function signUp(
  accountType,
  name,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await apiConnect("POST", SIGNUP_API, {
        accountType,
        name,
        email,
        password,
        confirmPassword,
        otp,
        navigate,
      });
      if (!response.data.success) {
        toast(response.data.message);
        throw new Error(response.data.message);
      }
      toast("You Have Signed Up Successfully!");
      navigate("/login");
    } catch (error) {
      toast("Signup failed. Please try again!");
      navigate("/signup");
    }
    dispatch(setLoading(false));
  };
}

export function logIn(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnect("POST", LOGIN_API, {
        email,
        password,
      });
      console.log("LOGIN API RESPONSE: ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const { findUser } = await response.data;
      const { token, name } = await findUser;
      const user = findUser;

      toast("You have successfully logged in.");
      dispatch(setToken(token));
      dispatch(setName(name));
      dispatch(setUser(user));

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard/profile");
    } catch (error) {
      toast("Login Failed! Please try agin.");
    }
    dispatch(setLoading(false));
  };
}

export function logOut(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setName(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast("Logged Out Successfully");
    navigate("/");
  };
}

export function getResetPasswordToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnect("POST", RESET_PASSWORD_TOKEN_API, {
        email,
      });
      console.log("RESET PASSWORD TOKEN API RESPONSE: ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password Reset Link has successfully sent to your Email.");

      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN API ERROR: ", error);
      toast("Failed to sent mail. Try again!");
    }
    dispatch(setLoading(false));
  };
}

export function resetPassword(
  newPassword,
  confirmNewPassword,
  token,
  navigate
) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnect("POST", RESET_PASSWORD_API, {
        newPassword,
        confirmNewPassword,
        token,
      });

      console.log("RESET PASSWORD RESPONSE: ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast("Password has been reset successfully!");
      navigate("/login");
    } catch (error) {
      console.log("RESET PASSWORD ERROR: ", error);
      toast.error("Unable to reset your password.");
    }
    dispatch(setLoading(false));
  };
}