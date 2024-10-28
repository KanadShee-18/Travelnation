import { combineReducers } from "@reduxjs/toolkit";

import themeReducer from "../slices/themeSlice";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
