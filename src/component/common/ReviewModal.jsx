import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { createRating } from "../../services/servercalls/ratingApis";
import { toast } from "react-toastify";

const ReviewModal = ({ listingId }) => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("rating", 0);
    setValue("review", "");
  }, []);

  const ratingChanged = (newRating) => {
    // console.log("New rating comes as: ", newRating);

    setValue("rating", newRating);
  };

  const onSubmit = async (data) => {
    // console.log("Data from form comes as: ", data);

    const newCreatedRating = await createRating(
      {
        listingId: listingId,
        rating: data.rating,
        review: data.review,
      },
      token
    );
    // console.log(newCreatedRating);

    toast(newCreatedRating);

    setValue("rating", 0);
    setValue("review", "");
  };

  return (
    <div className="flex flex-col min-w-full">
      <div className="mb-3">
        <p className="text-lg font-semibold text-start text-transparent md:text-start font-poppins bg-gradient-to-r from-[#9077ff] via-[#a8a6ff] to-[#a89be6] drop-shadow-2xl bg-clip-text">
          Add a Review For this Listing
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col pb-10  px-4 place-items-center items-center justify-around py-2 bg-[#5460be] bg-opacity-25 rounded-xl shadow-md shadow-slate-950 m-auto text-[#937aff]"
      >
        <h1 className="text-slate-400 font-poppins">Add Your Rating</h1>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={20}
          activeColor="#ff4372"
          color="#615fff"
          id="rating"
        />
        <div className="flex flex-col items-center w-full mt-2">
          <label
            htmlFor="review"
            className="w-full font-semibold text-start text-slate-400 font-poppins"
          >
            Add Your Review
          </label>
          <textarea
            id="review"
            placeholder="Write your review"
            {...register("review", { required: true })}
            className="w-full text-sm p-2 bg-[#313a6d] scrollbar-hide rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 outline-none placeholder-opacity-70 shadow-md shadow-slate-900 backdrop-blur-lg min-h-[70px]"
          />
          {errors.review && (
            <span className="text-xs tracking-wider text-pink-500 ">
              Please Share Your Review
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full xl:py-3 py-2 xl:mt-10 mt-5 bg-gradient-to-r from-[#3d3b97] via-[#615fff] to-[#3d3b97] rounded-lg text-sm text-slate-200 tracking-wider drop-shadow-xl transition-all duration-200 hover:scale-95 hover:bg-gradient-to-br hover:from-[#3d3b97] hover:via-[#615fff] hover:to-[#3d3b97] active:bg-gradient-to-bl active:from-[#3d3b97] active:via-[#615fff] active:to-[#3d3b97]"
        >
          CREATE REVIEW
        </button>
      </form>
    </div>
  );
};

export default ReviewModal;
