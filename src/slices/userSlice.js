import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loading: false,
  userWishlists: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).wishLists || []
    : [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUserWishLists(state, action) {
      state.userWishlists = action.payload;
    },
  },
});

export const { setLoading, setUser, setUserWishLists } = userSlice.actions;

export default userSlice.reducer;
