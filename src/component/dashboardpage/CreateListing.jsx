import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingCategories } from "../../services/servercalls/categoryApis";

const CreateListing = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [listingCategories, setListingCategories] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  // Taking all categories
  useEffect(() => {
    const getAllCategories = async () => {
      setLoading(true);
      const result = await fetchListingCategories();
      // const categories = await result?.categories?.details;
      // if (categories.length > 0) {
      //   setListingCategories(categories);
      // }
      console.log(result);

      setLoading(false);
    };
    getAllCategories();
  }, []);

  return <div></div>;
};

export default CreateListing;
