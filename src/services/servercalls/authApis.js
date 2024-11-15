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
  ADD_TO_WISHLIST_API,
  WISHLIST_DATA_API,
  BOOKED_LISTINGS_API,
} = authEndPoints;

export const wishListData = async (token) => {
  try {
    const response = await apiConnect("POST", WISHLIST_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });
    // console.log("WISHLISTS DATA API RESPONSE: ", response);

    if (!response.data.success) {
      throw new Error("ERROR IN WISHLIST API: ", error);
    }

    toast("Wishlisted Items have been fetched successfully for you.");
    return response.data;
  } catch (error) {
    // console.log("WISHLISTS DATA API ERROR: ", error);
    toast("Not able to fetch wishlist data.");
  }
};
export const bookedListings = async (token) => {
  try {
    const response = await apiConnect("POST", BOOKED_LISTINGS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    // console.log("BOOKED LISTINGS DATA API RESPONSE: ", response);

    if (!response.data.success) {
      throw new Error("ERROR IN BOOKED LISTINGS API: ", error);
    }

    toast("Booked Listings have been fetched successfully for you.");
    return response.data;
  } catch (error) {
    // console.log("BOOKED LISTINGS API ERROR: ", error);
    toast("Not able to fetch wishlist data.");
  }
};

export const addToWishList = async (token, listingId) => {
  try {
    const response = await apiConnect(
      "POST",
      ADD_TO_WISHLIST_API,
      { listingId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error("ERROR IN ADDING TO WISHLIST: ", erorr);
    }

    if (response.data.wishListed) {
      toast("Listing Has Been Added to Wishlist");
    } else {
      toast("Listing Has Been Removed to Wishlist");
    }
    // console.log(response);

    return response.data.wishListed;
  } catch (error) {
    // console.log("ADD TO WISHLIST API ERROR: ", error);
    toast("Not able to add this listing to your Wishlist");
  }
};

export const toggleWishList = async (token, listingId) => {
  try {
    const response = await apiConnect(
      "POST",
      ADD_TO_WISHLIST_API,
      { listingId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error("Failed to update wishlist status.");
    }

    const { wishListed } = response.data;
    if (wishListed) {
      toast("Listing has been added to your wishlist.");
    } else {
      toast("Listing has been removed from your wishlist.");
    }

    return wishListed;
  } catch (error) {
    console.error("Wishlist API Error:", error);
    toast("Unable to update wishlist. Please try again.");
    return null; // Explicitly return null on error
  }
};

export function sendOtp(email, navigate) {
  // console.log("Req coming to authapi ....");

  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await apiConnect("POST", OTPSENDING_API, {
        email,
        checkUserPresent: true,
      });
      // console.log("Sendotp api response: ", response);
      // console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast("OTP sent successfully to your gmail.");
      navigate("/verify-otp");
    } catch (error) {
      // console.log("SENDOTP API error: ", error);
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
      // console.log("LOGIN API RESPONSE: ", response);

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
      // console.log("RESET PASSWORD TOKEN API RESPONSE: ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password Reset Link has successfully sent to your Email.");

      setEmailSent(true);
    } catch (error) {
      // console.log("RESET PASSWORD TOKEN API ERROR: ", error);
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

      // console.log("RESET PASSWORD RESPONSE: ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast("Password has been reset successfully!");
      navigate("/login");
    } catch (error) {
      // console.log("RESET PASSWORD ERROR: ", error);
      toast.error("Unable to reset your password.");
    }
    dispatch(setLoading(false));
  };
}
