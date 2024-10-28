import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listing: null,
  modifyListing: false,
};

const listingSlice = createSlice({
  name: "listing",
  initialState: initialState,
  reducers: {
    setListing: (state, action) => {
      state.listing = action.payload;
    },
    setModifyListing: (state, action) => {
      state.modifyListing = action.payload;
    },
  },
});

export const { setListing, setModifyListing } = listingSlice.actions;

export default listingSlice.reducer;
