import { toast } from "react-toastify";
import { apiConnect } from "../apiConnect";
import { listingEndpoints } from "../serverApis";
import { setLoading } from "../../slices/authSlice";

const {
  CREATE_LISTING_API,
  FETCH_OWNER_LISTINGS,
  DELETE_LISTING_API,
  FETCH_ALL_LISTINGS,
  FETCH_SINGLE_LISTINGS,
} = listingEndpoints;

export const createListing = async (data, token) => {
  let result = null;
  try {
    const response = await apiConnect("POST", CREATE_LISTING_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("Create Listing API response: ", response);

    console.log("Listing data: ", response.data);

    if (!response.data.success) {
      throw new Error("Could not able to create listing.");
    }

    toast("Congratulations! New Listing has been created for you.");

    result = response?.data;
  } catch (error) {
    console.log("Create Listing API error: ", error);
    toast.error(error?.message);
  }
  return result;
};

export const ownerListings = async (token) => {
  try {
    const response = await apiConnect("GET", FETCH_OWNER_LISTINGS, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("OWNER LISTINGS API RESPONSE: ", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast("All Listings Fetched Successfully!");

    return response;
  } catch (error) {
    console.log("Owner specific listings error: ", error);
    toast("Some Problem occurred while fetching your listings.");
  }
};
