import { toast } from "react-toastify";
import { categoryEndpoints } from "../serverApis";
import { apiConnect } from "../apiConnect";

const { GET_CATEGORIES_API, GET_CATEGORYPAGE_DETAILS_API } = categoryEndpoints;

export const fetchListingCategories = async () => {
  let result = [];
  try {
    const response = await apiConnect("GET", GET_CATEGORIES_API);
    // console.log("GET LISTING CATEGORIES RESPONSE: ", response);
    // console.log(response.data);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // toast("All Categories Fetched Successfully");
    result = response;
  } catch (error) {
    // console.log("GET LISTING GATEGORIES API ERROR: ", error);
    toast("NO CATEGORIES");
  }
  return result;
};

export const fetchCategoryPage = async (categoryName) => {
  let result = [];
  try {
    // console.log("Cat Name in api call: ", categoryName);

    const response = await apiConnect(
      "GET",
      GET_CATEGORYPAGE_DETAILS_API,
      null,
      null,
      {
        categoryName,
      }
    );
    // console.log("GET LISTING CATEGORy PAGE RESPONSE: ", response);
    // console.log(response.data);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast("All Category Page Data Fetched Successfully");
    result = response;
  } catch (error) {
    // console.log("GET LISTING GATEGORY PAGE API ERROR: ", error);
    toast("No listing is available on this Category");
  }
  return result;
};
