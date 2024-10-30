import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listingData: null,
  modifyListing: false,
};

const listingSlice = createSlice({
  name: "listing",
  initialState: initialState,
  reducers: {
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setModifyListing: (state, action) => {
      state.modifyListing = action.payload;
    },
  },
});

export const { setListingData, setModifyListing } = listingSlice.actions;

export default listingSlice.reducer;
