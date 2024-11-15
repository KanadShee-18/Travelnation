// import React, { useEffect, useRef, useState } from "react";
// import hotelImg from "../assets/explorePics/dashhotel.jpg";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useForm, useWatch } from "react-hook-form";
// import { fetchListingCategories } from "../services/servercalls/categoryApis";
// import UploadImages from "../component/common/UploadImages";
// import Spinner from "../component/common/Spinner";
// import { RiMoneyRupeeCircleLine } from "react-icons/ri";
// import { editExistingListing } from "../services/servercalls/listingApis";
// import { setListingData, setModifyListing } from "../slices/listingSlice";

// const ModifyListing = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { listingData, modifyListing } = useSelector((state) => state.listing);
//   const { token } = useSelector((state) => state.auth);
//   const [loading, setLoading] = useState(false);
//   const [listingCategories, setListingCategories] = useState([]);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     getValues,
//     formState: { errors },
//     watch,
//   } = useForm();

//   // Taking all categories
//   useEffect(() => {
//     const getAllCategories = async () => {
//       setLoading(true);
//       const result = await fetchListingCategories();
//       // console.log("Result: ", result);

//       const categories = await result?.data?.data?.categories?.details;
//       if (categories?.length > 0) {
//         setListingCategories(categories);
//       }
//       // console.log(result);

//       setLoading(false);
//     };

//     getAllCategories();
//   }, []);

//   // console.log("Listing data is: ", listingData);
//   const selectedCategory = watch("category");
//   // console.log("Selected Category:", selectedCategory);

//   useEffect(() => {
//     if (modifyListing && listingData) {
//       reset({
//         title: listingData.title,
//         description: listingData.description,
//         price: listingData.price,
//         location: listingData.location,
//         country: listingData.country,
//         category: listingData.category,
//         images: listingData.image,
//       });
//     }
//   }, [modifyListing, listingData, reset]);

//   const onSubmit = async (data) => {
//     const listingValues = getValues();
//     // console.log("Listing Values are: ", listingValues);
//     // console.log("Listing Value category are: ", listingValues.category);
//     const formData = new FormData();
//     formData.append("listingId", listingData?._id);
//     if (listingValues.title !== listingData.title) {
//       formData.append("title", listingValues?.title);
//     }
//     if (listingValues.description !== listingData.description) {
//       formData.append("description", listingValues?.description);
//     }
//     if (listingValues.price !== listingData.price) {
//       formData.append("price", listingValues?.price);
//     }
//     if (listingValues.location !== listingData.location) {
//       formData.append("location", listingValues?.location);
//     }
//     if (listingValues.country !== listingData.country) {
//       formData.append("country", listingValues?.country);
//     }
//     if (JSON.stringify(listingValues.category) !== selectedCategory) {
//       formData.append("categoryId", selectedCategory);
//     }
//     console.log("Images in listing values: ", listingValues.images);
//     console.log("Other listing values are: ", listingValues);

//     const existingImageIds = listingData.image.map((img) => img.public_id);

//     // console.log("Existing Public Ids: ", existingImageIds);

//     const newImages = listingValues.images.filter((file) => {
//       return file instanceof File;
//     });
//     // console.log("New Images: ", newImages);

//     if (newImages.length > 0) {
//       newImages.forEach((file, index) => {
//         formData.append(`images[${index}]`, file);
//       });
//     }

//     // console.log("Formdata coming as: ", formData);
//     // for (let [key, value] of formData.entries()) {
//     //   console.log(`${key}: ${value instanceof File ? value.name : value}`);
//     // }
//     setLoading(true);
//     const result = await editExistingListing(formData, token);
//     if (result) {
//       // console.log("Result in listing page: ", result);
//       reset();
//       navigate("/dashboard/listings");
//     } else {
//       // console.log("Error in Editing listing");
//     }
//     dispatch(setModifyListing(false));
//     dispatch(setListingData(null));
//     setLoading(false);
//   };

//   return (
//     <div className="w-full h-full mx-auto mt-6 mb-32 ">
//       <div className="fixed inset-0 max-w-full opacity-65">
//         <img
//           src={hotelImg}
//           alt="Sign Up"
//           className="object-cover w-full h-full "
//         />
//         <div className="absolute inset-0 opacity-75 bg-gradient-to-t from-black via-slate-950 to-slate-900"></div>
//       </div>
//       <div className="max-w-[500px]  mx-auto flex items-center justify-center">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex flex-col pb-10 gap-y-5 place-items-center items-center justify-around py-5 bg-[#4954a5] bg-opacity-25 backdrop-blur-md rounded-xl shadow-md shadow-slate-950 w-full m-auto text-[#937aff] p-5"
//         >
//           <h1 className="text-3xl font-semibold text-start text-transparent font-poppins bg-gradient-to-r from-[#6644ff] via-[#615fff] to-[#6644ff] drop-shadow-2xl bg-clip-text">
//             {modifyListing ? "Edit" : "Create"} Your Listing
//           </h1>
//           <div className="flex flex-col w-full gap-y-2">
//             <label
//               htmlFor="title"
//               className="text-[15px] tracking-wide text-slate-300 text-start"
//             >
//               Listing Tiitle <sup className="text-pink-500">*</sup>
//             </label>
//             <div className="rounded-md shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
//               <input
//                 type="text"
//                 placeholder="Enter listing title"
//                 id="title"
//                 {...register("title", { required: true })}
//                 className="w-full text-sm p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
//               />
//             </div>
//             {errors.title && (
//               <span className="ml-2 text-pink-500">
//                 Listing Title is required.
//               </span>
//             )}
//           </div>

//           <div className="flex flex-col w-full gap-y-2">
//             <label
//               htmlFor="description"
//               className="text-[15px] tracking-wide text-slate-300 text-start"
//             >
//               Listing Description <sup className="text-pink-500">*</sup>
//             </label>
//             <div className="rounded-md shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 h-[70px] shadow-slate-950">
//               <textarea
//                 type="text"
//                 placeholder="Enter a crisp description"
//                 id="description"
//                 {...register("description", { required: true })}
//                 className="w-full scrollbar-hide min-h-full text-sm p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
//               />
//             </div>
//             {errors.description && (
//               <span className="ml-2 text-pink-500">
//                 Listing Description is required.
//               </span>
//             )}
//           </div>
//           <div className="flex flex-col w-full gap-3 md:flex-row">
//             <div className="flex flex-col w-full gap-y-2">
//               <label
//                 htmlFor="price"
//                 className="text-[15px] tracking-wide text-slate-300 text-start"
//               >
//                 Rent <sup className="text-pink-500">*</sup>
//               </label>
//               <div className="rounded-md relative justify-center flex shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] items-center bg-[#464e7e] bg-opacity-35 shadow-slate-950">
//                 <input
//                   placeholder="Enter listing price"
//                   type="number"
//                   id="price"
//                   {...register("price", {
//                     required: true,
//                     valueAsNumber: true,
//                   })}
//                   className="w-full text-sm p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
//                 />
//                 <span className="absolute right-0 flex items-center h-full mr-3 text-2xl text-blue-300 ">
//                   <RiMoneyRupeeCircleLine />
//                 </span>
//               </div>
//               {errors.price && (
//                 <span className="ml-2 text-pink-500">
//                   Listing Rent is required.
//                 </span>
//               )}
//             </div>
//             <div className="flex flex-col w-full gap-y-2">
//               <label
//                 htmlFor="category"
//                 className="text-[15px] tracking-wide text-slate-300 text-start"
//               >
//                 Select Category for Listing
//                 <sup className="text-pink-500">*</sup>
//               </label>
//               <div className="rounded-md shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
//                 <select
//                   id="category"
//                   defaultValue={""}
//                   {...register("category", { required: true })}
//                   className="w-full text-sm p-3 rounded-md tracking-wide text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
//                 >
//                   <option
//                     value=""
//                     disabled
//                     className="bg-[#464e7e] text-slate-200"
//                   >
//                     Select a Category
//                   </option>
//                   {!loading &&
//                     listingCategories.map((ctgry, i) => (
//                       <option
//                         key={i}
//                         value={ctgry?._id}
//                         className="bg-[#464e7e] text-slate-200"
//                       >
//                         {ctgry?.name}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//               {errors.category && (
//                 <span className="ml-2 text-pink-500">
//                   Listing Category is required.
//                 </span>
//               )}
//             </div>
//           </div>
//           <div className="flex flex-col w-full gap-3 md:flex-row">
//             <div className="flex flex-col w-full gap-y-2">
//               <label
//                 htmlFor="location"
//                 className="text-[15px] tracking-wide text-slate-300 text-start"
//               >
//                 Enter Location<sup className="text-pink-500">*</sup>
//               </label>
//               <div className="rounded-md shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
//                 <input
//                   placeholder="Enter Listing Location"
//                   id="location"
//                   {...register("location", { required: true })}
//                   className="w-full text-sm p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
//                 />
//               </div>
//               {errors.location && (
//                 <span className="ml-2 text-pink-500">
//                   Listing Location is required.
//                 </span>
//               )}
//             </div>
//             <div className="flex flex-col w-full gap-y-2">
//               <label
//                 htmlFor="country"
//                 className="text-[15px] tracking-wide text-slate-300 text-start"
//               >
//                 Enter Country Name<sup className="text-pink-500">*</sup>
//               </label>
//               <div className="rounded-md shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
//                 <input
//                   placeholder="Enter Listing Country"
//                   id="country"
//                   {...register("country", { required: true })}
//                   autoComplete="country"
//                   className="w-full text-sm p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
//                 />
//               </div>
//               {errors.country && (
//                 <span className="ml-2 text-pink-500">
//                   Listing Country is required.
//                 </span>
//               )}
//             </div>
//           </div>
//           <UploadImages
//             name="images"
//             label={"Listing Images (not more than 5)"}
//             register={register}
//             errors={errors}
//             setValue={setValue}
//             getValues={getValues}
//             editData={
//               modifyListing
//                 ? listingData?.image?.map((image) => image.url)
//                 : null
//             }
//           />
//           {loading && (
//             <div className="flex items-center justify-center w-full mt-6">
//               <Spinner />
//             </div>
//           )}
//           <div className="w-full">
//             <button className="w-full xl:py-3 py-2 xl:mt-10 mt-5 bg-gradient-to-r from-[#3d3b97] via-[#615fff] to-[#3d3b97] rounded-lg text-sm text-slate-200 tracking-wider drop-shadow-xl transition-all duration-200 hover:scale-95 hover:bg-gradient-to-br hover:from-[#3d3b97] hover:via-[#615fff] hover:to-[#3d3b97] active:bg-gradient-to-bl active:from-[#3d3b97] active:via-[#615fff] active:to-[#3d3b97]">
//               {modifyListing ? "EDIT LISTING" : "CREATE NEW LISTING"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ModifyListing;

import React, { useEffect, useState } from "react";
import hotelImg from "../assets/explorePics/dashhotel.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { fetchListingCategories } from "../services/servercalls/categoryApis";
import UploadImages from "../component/common/UploadImages";
import Spinner from "../component/common/Spinner";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { editExistingListing } from "../services/servercalls/listingApis";
import { setListingData, setModifyListing } from "../slices/listingSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModifyListing = () => {
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
    watch,
  } = useForm();

  const [selectedDates, setSelectedDates] = useState([null, null]); // State for start and end dates

  // Fetching all categories
  useEffect(() => {
    const getAllCategories = async () => {
      setLoading(true);
      const result = await fetchListingCategories();
      const categories = await result?.data?.data?.categories?.details;
      if (categories?.length > 0) {
        setListingCategories(categories);
      }
      setLoading(false);
    };

    getAllCategories();
  }, []);

  // Set initial form data for editing
  useEffect(() => {
    if (modifyListing && listingData) {
      reset({
        title: listingData.title,
        description: listingData.description,
        price: listingData.price,
        location: listingData.location,
        country: listingData.country,
        category: listingData.category,
        images: listingData.image,
        availableDates:
          listingData.availability && listingData.availability[0]
            ? {
                startDate: listingData.availability[0].date,
                endDate:
                  listingData.availability[listingData.availability.length - 1]
                    .date,
              }
            : null,
      });
      if (listingData.availability && listingData.availability[0]) {
        setSelectedDates([
          new Date(listingData.availability[0].date),
          new Date(
            listingData.availability[listingData.availability.length - 1].date
          ),
        ]);
      }
    }
  }, [modifyListing, listingData, reset]);

  const handleDateChange = (dates) => {
    setSelectedDates(dates); // Update local state
    setValue("availableDates", dates); // Update form state
  };

  const onSubmit = async (data) => {
    const listingValues = getValues();
    const formData = new FormData();
    formData.append("listingId", listingData?._id);

    // Append form fields that have changed
    if (listingValues.title !== listingData.title) {
      formData.append("title", listingValues?.title);
    }
    if (listingValues.description !== listingData.description) {
      formData.append("description", listingValues?.description);
    }
    if (listingValues.price !== listingData.price) {
      formData.append("price", listingValues?.price);
    }
    if (listingValues.location !== listingData.location) {
      formData.append("location", listingValues?.location);
    }
    if (listingValues.country !== listingData.country) {
      formData.append("country", listingValues?.country);
    }
    if (JSON.stringify(listingValues.category) !== listingData.category) {
      formData.append("categoryId", listingValues?.category);
    }

    // Handle images
    const newImages = listingValues.images.filter(
      (file) => file instanceof File
    );
    if (newImages.length > 0) {
      newImages.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
    }

    formData.append(
      "availableDates",
      JSON.stringify(listingValues?.availableDates)
    );

    setLoading(true);
    const result = await editExistingListing(formData, token);
    if (result) {
      reset();
      navigate("/dashboard/listings");
    }
    dispatch(setModifyListing(false));
    dispatch(setListingData(null));
    setLoading(false);
  };

  return (
    <div className="w-full h-full mx-auto mt-6 mb-32 ">
      <div className="fixed inset-0 max-w-full opacity-65">
        <img
          src={hotelImg}
          alt="Sign Up"
          className="object-cover w-full h-full "
        />
        <div className="absolute inset-0 opacity-75 bg-gradient-to-t from-black via-slate-950 to-slate-900"></div>
      </div>
      <div className="max-w-[500px]  mx-auto flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col pb-10 gap-y-5 place-items-center items-center justify-around py-5 bg-[#4954a5] bg-opacity-25 backdrop-blur-md rounded-xl shadow-md shadow-slate-950 w-full m-auto text-[#937aff] p-5"
        >
          <h1 className="text-3xl font-semibold text-start text-transparent font-poppins bg-gradient-to-r from-[#6644ff] via-[#615fff] to-[#6644ff] drop-shadow-2xl bg-clip-text">
            {modifyListing ? "Edit" : "Create"} Your Listing
          </h1>

          {/* Other form fields */}

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

          {/* Availability Date Range */}
          <div className="flex flex-col w-full gap-y-2">
            <label
              htmlFor="availableDates"
              className="text-[15px] tracking-wide text-slate-300 text-start"
            >
              Available Dates Range <sup className="text-pink-500">*</sup>
            </label>
            <div className="rounded-md w-fit  shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
              <DatePicker
                selected={selectedDates[0]} // First selected date
                onChange={handleDateChange} // Handle date change
                selectsRange // Enable range selection
                startDate={selectedDates[0]} // Set start date
                endDate={selectedDates[1]} // Set end date
                className="w-full text-sm p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
                placeholderText="Select Available Dates"
                dateFormat="yyyy/MM/dd"
                isClearable
              />
            </div>
            {errors.availableDates && (
              <span className="ml-2 text-pink-500">
                Available Dates are required.
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-5 bg-[#6644ff] text-white rounded-md"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Save Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModifyListing;
