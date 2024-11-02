import { toast } from "react-toastify";
import { apiConnect } from "../apiConnect";
import { listingEndpoints } from "../serverApis";
import { setLoading } from "../../slices/authSlice";

const {
  CREATE_LISTING_API,
  MODIFY_LISTING_API,
  FETCH_OWNER_LISTINGS,
  DELETE_LISTING_API,
  FETCH_ALL_LISTINGS,
  FETCH_SINGLE_LISTING,
} = listingEndpoints;

export const createListing = async (data, token) => {
  let result = null;
  try {
    const response = await apiConnect("POST", CREATE_LISTING_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    // console.log("Create Listing API response: ", response);

    // console.log("Listing data: ", response.data);

    if (!response.data.success) {
      throw new Error("Could not able to create listing.");
    }

    toast("Congratulations! New Listing has been created for you.");

    result = response?.data;
  } catch (error) {
    // console.log("Create Listing API error: ", error);
    toast.error(error?.message);
  }
  return result;
};

export const editExistingListing = async (data, token) => {
  let result = null;
  try {
    const response = await apiConnect("PUT", MODIFY_LISTING_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    // console.log("Editing Listing API response: ", response);

    if (!response.data.success) {
      throw new Error(
        "Could not able to edit listing. Error comes as: ",
        response?.error?.message
      );
    }

    toast("Listing has been modified successfully!");
    result = response?.data;
  } catch (error) {
    // console.log("Edit Listing API Error: ", error);
    toast("Listing Has Been Modified Successfully!");
  }
  return result;
};

export const deleteListing = async (token, listingId, ownerId) => {
  // console.log("Listing id in delete api: ", listingId);
  // console.log("Listing id in delete api: ", ownerId);

  try {
    const response = await apiConnect(
      "DELETE",
      DELETE_LISTING_API,
      {
        listingId: listingId,
        ownerId: ownerId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // console.log("DELETE LISTING API RESPONSE: ", response);

    if (!response.data.success) {
      throw new Error("Error occurred while delete listing is: ", error);
    }

    toast("Listing has been deleted successfully for You");
  } catch (error) {
    // console.log("Error occurred while deleting listing: ", error);
    toast("Not able to delete your listing. Try again!");
  }
};

export const ownerListings = async (token) => {
  try {
    const response = await apiConnect("GET", FETCH_OWNER_LISTINGS, null, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("OWNER LISTINGS API RESPONSE: ", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // toast("All Listings Fetched Successfully!");

    return response;
  } catch (error) {
    // console.log("Owner specific listings error: ", error);
    toast("Some Problem occurred while fetching your listings.");
  }
};

export const fetchListing = async (listingId) => {
  try {
    // console.log("Listing id in bacnend call: ", listingId);

    const response = await apiConnect("POST", FETCH_SINGLE_LISTING, {
      listingId: listingId,
    });
    // console.log("SINGLE LISTING API ERROR: ", response);

    if (!response.data.success) {
      throw new Error("Some Error Occurred While Fetching Listing Details");
    }

    toast("Listing has been Fetched Successfully");

    return response?.data;
  } catch (error) {
    // console.log("Listing details error: ", error);
    toast("Some error occurred while fetching this single listing.");
  }
};

export const fetchAllListings = async (page, limit) => {
  let result;
  try {
    const response = await apiConnect("GET", FETCH_ALL_LISTINGS, null, null, {
      page,
      limit,
    });
    // console.log("FETCHING ALL LISTINGS API RESPONSE: ", response);

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch listings.");
    }

    // toast("All listings fetched successfully.");

    result = response?.data;
  } catch (error) {
    // console.log("ERROR WHILE FETCHING ALL LISTINGS: ", error);
    toast("Some error occurred while fetching all listings.");
  }
  return result;
};
