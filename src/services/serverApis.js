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
  ADD_TO_WISHLIST_API: BASE_URL + "/auth/addToWishlist",
  WISHLIST_DATA_API: BASE_URL + "/auth/wishlistedItems",
};

// Category Endpoints:
export const categoryEndpoints = {
  GET_CATEGORIES_API: BASE_URL + "/category/allCategories",
  GET_CATEGORYPAGE_DETAILS_API: BASE_URL + "/category/categoryPageDetails",
};

// Listing Endpoints:
export const listingEndpoints = {
  FETCH_ALL_LISTINGS: BASE_URL + "/listing/getListings",
  FETCH_SINGLE_LISTING: BASE_URL + "/listing/viewListing",
  FETCH_OWNER_LISTINGS: BASE_URL + "/listing/owner-listing",
  CREATE_LISTING_API: BASE_URL + "/listing/createListing",
  MODIFY_LISTING_API: BASE_URL + "/listing/modifyListing",
  DELETE_LISTING_API: BASE_URL + "/listing/destroyListing",
};

// Rating and Reviews Endpoints:

export const ratingEndpoints = {
  FETCH_ALL_REVIEWS: BASE_URL + "/review/allReviews",
  CREATE_REVIEW: BASE_URL + "/review/createReview",
  MODIFY_REVIEW: BASE_URL + "/review/updateReview",
  DELETE_REVIEW: BASE_URL + "/review/deleteReview",
};
