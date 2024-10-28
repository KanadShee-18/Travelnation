const BASE_URL = import.meta.env.VITE_BASE_URL;
// const BASE_URL = "http://localhost:4000/api/v2";

// Auth:
export const authEndPoints = {
  OTPSENDING_API: BASE_URL + "/auth/sendOtp",
  SIGNUP_API: BASE_URL + "/auth/signUp",
  LOGIN_API: BASE_URL + "/auth/logIn",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
  RESET_PASSWORD_TOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESET_PASSWORD_API: BASE_URL + "/auth/resetPassword",
};

// Listing Category Endpoints:
export const categoryEndpoints = {
  GET_CATEGORIES_API: BASE_URL + "/category/allCategories",
  GET_CATEGORYPAGE_DETAILS_API: BASE_URL + "/categoryPageDetails",
};
