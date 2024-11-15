import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingCategories } from "../../services/servercalls/categoryApis";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import UploadImages from "../common/UploadImages";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  createListing,
  editExistingListing,
} from "../../services/servercalls/listingApis";
import Spinner from "../common/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MultipleDatePicker from "../../listingPages/MultipleDatePicker";

const CreateListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listingData, modifyListing } = useSelector((state) => state.listing);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [listingCategories, setListingCategories] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  // Taking all categories
  useEffect(() => {
    const getAllCategories = async () => {
      setLoading(true);
      const result = await fetchListingCategories();
      // console.log("Result: ", result);

      const categories = await result?.data?.data?.categories?.details;
      if (categories?.length > 0) {
        setListingCategories(categories);
      }
      // console.log(result);

      setLoading(false);
    };

    getAllCategories();
  }, []);

  const onSubmit = async (data) => {
    const listingValues = getValues();
    console.log("Listing Values are: ", listingValues);

    const formData = new FormData();

    formData.append("title", listingValues?.title);
    formData.append("description", listingValues?.description);
    formData.append("price", listingValues?.price);
    formData.append("location", listingValues?.location);
    formData.append("country", listingValues?.country);
    formData.append("categoryId", listingValues?.category);
    formData.append(
      "availableDates",
      JSON.stringify(listingValues?.availableDates)
    );

    listingValues?.images.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    console.log("Formdata coming as: ", formData);

    setLoading(true);
    const result = await createListing(formData, token);

    if (result) {
      // console.log("Result in listing page: ", result);
      reset();
      navigate("/dashboard/listings");
    } else {
      // console.log("Error in creating listing");
    }
    setLoading(false);
  };

  return (
    <div className="relative pt-20 mb-6">
      <div className="max-w-[500px] mx-auto flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col pb-10 gap-y-5 place-items-center items-center justify-around py-5 bg-[#4954a5] bg-opacity-25 backdrop-blur-md rounded-xl shadow-md shadow-slate-950 w-full m-auto text-[#937aff] p-5"
        >
          <h1 className="text-3xl font-semibold text-start text-transparent font-poppins bg-gradient-to-r from-[#6644ff] via-[#615fff] to-[#6644ff] drop-shadow-2xl bg-clip-text">
            {modifyListing ? "Edit" : "Create"} Your Listing
          </h1>
          <div className="flex flex-col w-full gap-y-2">
            <label
              htmlFor="title"
              className="text-[15px] tracking-wide text-slate-300 text-start"
            >
              Listing Tiitle <sup className="text-pink-500">*</sup>
            </label>
            <div className="rounded-md shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
              <input
                type="text"
                placeholder="Enter listing title"
                id="title"
                {...register("title", { required: true })}
                className="w-full text-sm p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
              />
            </div>
            {errors.title && (
              <span className="ml-2 text-pink-500">
                Listing Title is required.
              </span>
            )}
          </div>

          <div className="flex flex-col w-full gap-y-2">
            <label
              htmlFor="description"
              className="text-[15px] tracking-wide text-slate-300 text-start"
            >
              Listing Description <sup className="text-pink-500">*</sup>
            </label>
            <div className="rounded-md shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 h-[70px] shadow-slate-950">
              <textarea
                type="text"
                placeholder="Enter a crisp description"
                id="description"
                {...register("description", { required: true })}
                className="w-full scrollbar-hide min-h-full text-sm p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
              />
            </div>
            {errors.description && (
              <span className="ml-2 text-pink-500">
                Listing Description is required.
              </span>
            )}
          </div>
          <div className="flex flex-col w-full gap-3 md:flex-row">
            <div className="flex flex-col w-full gap-y-2">
              <label
                htmlFor="price"
                className="text-[15px] tracking-wide text-slate-300 text-start"
              >
                Rent <sup className="text-pink-500">*</sup>
              </label>
              <div className="rounded-md relative justify-center flex shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] items-center bg-[#464e7e] bg-opacity-35 shadow-slate-950">
                <input
                  placeholder="Enter listing price"
                  type="number"
                  id="price"
                  {...register("price", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="w-full text-sm p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
                />
                <span className="absolute right-0 flex items-center h-full mr-3 text-2xl text-blue-300 ">
                  <RiMoneyRupeeCircleLine />
                </span>
              </div>
              {errors.price && (
                <span className="ml-2 text-pink-500">
                  Listing Rent is required.
                </span>
              )}
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <label
                htmlFor="category"
                className="text-[15px] tracking-wide text-slate-300 text-start"
              >
                Select Category for Listing
                <sup className="text-pink-500">*</sup>
              </label>
              <div className="rounded-md shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
                <select
                  id="category"
                  defaultValue={""}
                  {...register("category", { required: true })}
                  className="w-full text-sm p-3 rounded-md tracking-wide text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
                >
                  <option
                    value=""
                    disabled
                    className="bg-[#464e7e] text-slate-200"
                  >
                    Select a Category
                  </option>
                  {!loading &&
                    listingCategories.map((ctgry, i) => (
                      <option
                        key={i}
                        value={ctgry?._id}
                        className="bg-[#464e7e] text-slate-200"
                      >
                        {ctgry?.name}
                      </option>
                    ))}
                </select>
              </div>
              {errors.category && (
                <span className="ml-2 text-pink-500">
                  Listing Category is required.
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full gap-3 md:flex-row">
            <div className="flex flex-col w-full gap-y-2">
              <label
                htmlFor="location"
                className="text-[15px] tracking-wide text-slate-300 text-start"
              >
                Enter Location<sup className="text-pink-500">*</sup>
              </label>
              <div className="rounded-md shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
                <input
                  placeholder="Enter Listing Location"
                  id="location"
                  {...register("location", { required: true })}
                  className="w-full text-sm p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
                />
              </div>
              {errors.location && (
                <span className="ml-2 text-pink-500">
                  Listing Location is required.
                </span>
              )}
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <label
                htmlFor="country"
                className="text-[15px] tracking-wide text-slate-300 text-start"
              >
                Enter Country Name<sup className="text-pink-500">*</sup>
              </label>
              <div className="rounded-md shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
                <input
                  placeholder="Enter Listing Country"
                  id="country"
                  {...register("country", { required: true })}
                  autoComplete="country"
                  className="w-full text-sm p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
                />
              </div>
              {errors.country && (
                <span className="ml-2 text-pink-500">
                  Listing Country is required.
                </span>
              )}
            </div>
          </div>

          <MultipleDatePicker
            errors={errors}
            getValues={getValues}
            setValue={setValue}
            register={register}
          />

          <UploadImages
            name="images"
            label={"Listing Images (not more than 5)"}
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            editData={
              modifyListing
                ? listingData?.image?.map((image) => image.url)
                : null
            }
          />
          {loading && (
            <div className="flex items-center justify-center w-full mt-10">
              <Spinner />
            </div>
          )}
          <div className="w-full">
            <button className="w-full xl:py-3 py-2 xl:mt-10 mt-5 bg-gradient-to-r from-[#3d3b97] via-[#615fff] to-[#3d3b97] rounded-lg text-sm text-slate-200 tracking-wider drop-shadow-xl transition-all duration-200 hover:scale-95 hover:bg-gradient-to-br hover:from-[#3d3b97] hover:via-[#615fff] hover:to-[#3d3b97] active:bg-gradient-to-bl active:from-[#3d3b97] active:via-[#615fff] active:to-[#3d3b97]">
              {modifyListing ? "EDIT LISTING" : "CREATE NEW LISTING"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
