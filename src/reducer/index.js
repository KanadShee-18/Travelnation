import { combineReducers } from "@reduxjs/toolkit";

import themeReducer from "../slices/themeSlice";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import listingReducer from "../slices/listingSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  user: userReducer,
  listing: listingReducer,
});

export default rootReducer;
