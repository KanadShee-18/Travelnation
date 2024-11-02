import { toast } from "react-toastify";
import { apiConnect } from "../apiConnect";
import { ratingEndpoints } from "../serverApis";

const { CREATE_REVIEW, DELETE_REVIEW, FETCH_ALL_REVIEWS, MODIFY_REVIEW } =
  ratingEndpoints;

export const createRating = async (data, token) => {
  try {
    const response = await apiConnect("POST", CREATE_REVIEW, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("Response is: ", response);

    if (!response.data.success) {
      throw new Error("Could not create review.");
    }

    return "Review has been created";
  } catch (error) {
    console.log("Create rating error: ", error);
    return error.response.data.message;
  }
};
