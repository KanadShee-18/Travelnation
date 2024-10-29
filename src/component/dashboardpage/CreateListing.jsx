import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingCategories } from "../../services/servercalls/categoryApis";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import UploadImages from "../common/UploadImages";

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
      console.log("Result: ", result);

      const categories = await result?.data?.data?.categories?.details;
      if (categories?.length > 0) {
        setListingCategories(categories);
      }
      console.log(result);

      setLoading(false);
    };
    getAllCategories();
  }, []);

  console.log("Listing categories comes as: ", listingCategories);

  const onSubmit = () => {};

  return (
    <div className="mt-6 ">
      <div className="max-w-[500px] mx-auto flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col pb-10 gap-y-5 place-items-center items-center justify-around py-5 bg-[#5460be] bg-opacity-25 rounded-xl shadow-md shadow-slate-950 w-full m-auto text-[#937aff] p-5"
        >
          <div className="w-full flex flex-col gap-y-2">
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

          <div className="w-full flex flex-col gap-y-2">
            <label
              htmlFor="description"
              className="text-[15px] tracking-wide text-slate-300 text-start"
            >
              Listing Description <sup className="text-pink-500">*</sup>
            </label>
            <div className="rounded-md shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
              <input
                type="text"
                placeholder="Enter a crisp description"
                id="description"
                {...register("title", { required: true })}
                className="w-full text-sm p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
              />
            </div>
            {errors.description && (
              <span className="ml-2 text-pink-500">
                Listing Description is required.
              </span>
            )}
          </div>
          <div className="w-full flex flex-col md:flex-row gap-3">
            <div className="w-full flex flex-col gap-y-2">
              <label
                htmlFor="price"
                className="text-[15px] tracking-wide text-slate-300 text-start"
              >
                Rent <sup className="text-pink-500">*</sup>
              </label>
              <div className="rounded-md relative flex shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] items-center bg-[#464e7e] bg-opacity-35 shadow-slate-950">
                <input
                  placeholder="Enter listing price"
                  id="price"
                  {...register("price", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="w-full text-sm p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
                />
                <span className=" h-full text-2xl text-blue-300 mr-3">
                  <RiMoneyRupeeCircleLine />
                </span>
              </div>
              {errors.price && (
                <span className="ml-2 text-pink-500">
                  Listing Rent is required.
                </span>
              )}
            </div>
            <div className="w-full flex flex-col gap-y-2">
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
                  className="w-full text-sm p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
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
          <div className="w-full flex flex-col md:flex-row gap-3">
            <div className="w-full flex flex-col gap-y-2">
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
            <div className="w-full flex flex-col gap-y-2">
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
          <UploadImages
            name="imagesArray"
            label={"Listing Images"}
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}

            />
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
