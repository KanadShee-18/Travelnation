import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpDetails: null,
  loading: false,
  name: null,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignUpDetails(state, action) {
      state.signUpDetails = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setSignUpDetails, setLoading, setName, setToken } =
  authSlice.actions;

export default authSlice.reducer;
