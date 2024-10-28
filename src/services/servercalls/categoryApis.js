import { toast } from "react-toastify";
import { categoryEndpoints } from "../serverApis";
import { apiConnect } from "../apiConnect";

const { GET_CATEGORIES_API, GET_CATEGORYPAGE_DETAILS_API } = categoryEndpoints;

export const fetchListingCategories = async () => {
  let result = [];
  try {
    const response = await apiConnect("GET", GET_CATEGORIES_API);
    console.log("GET LISTING CATEGORIES RESPONSE: ", response);
    console.log(response.data);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast("All Listing Fetched Successfully");
    result = response;
  } catch (error) {
    console.log("GET LISTING GATEGORIES API ERROR: ", error);
    toast("NO CATEGORIES");
  }
  return result;
};
