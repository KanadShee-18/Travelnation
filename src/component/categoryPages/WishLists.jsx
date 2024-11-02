import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  wishListData,
} from "../../services/servercalls/authApis";
import { toast } from "react-toastify";
import { setUserWishLists } from "../../slices/userSlice";
import { motion } from "framer-motion";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { IoBagCheckOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const WishLists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [listings, setListings] = useState([]);
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const { userWishlists } = useSelector((state) => state.user);

  const fetchWishlists = async () => {
    try {
      const response = await wishListData(token);
      setListings(response?.data?.wishLists);
    } catch (error) {
      console.error("Error fetching wishlists:", error);
    }
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  const handleLoveClick = async (ownerId, listingId) => {
    const response = await addToWishList(token, listingId);
    // console.log("RESPONSE OF ADDWISHLIST: ", response);

    toast("Listing Has Been Removed Form Your Wishlist");
    fetchWishlists();
  };

  //   const handleLoveClick = async (ownerId, listingId) => {
  //     if (!user) {
  //       toast("You must log in to add this listing to your wishlist");
  //       return;
  //     }
  //     if (user._id === ownerId) {
  //       toast("As the owner, you can't add this listing to your wishlist.");
  //       return;
  //     }
  //     const response = await addToWishList(token, listingId);
  //     console.log("RESPONSE OF ADDWISHLIST: ", response);

  //     if (response) {
  //       const newWishlists = [...userWishlists, listingId];
  //       dispatch(setUserWishLists(newWishlists));
  //     } else {
  //       const filteredLists = userWishlists.filter((id) => id !== listingId);
  //       dispatch(setUserWishLists(filteredLists));
  //     }
  //     toast("See your wishlist in your wishlist section");
  //   };

  //   console.log("Listings: ", listings);

  return (
    <div>
      <div className="w-full p-4 mx-auto mt-16">
        <h2 className="relative w-10/12 mx-auto mb-4 text-4xl font-semibold text-blue-400 xl:w-3/4">
          Your Wishlists
        </h2>
        {/* <h2>Your Wishlists</h2> */}
        {listings.length > 0 ? (
          <div className="relative grid w-10/12 h-full grid-cols-1 gap-4 py-2 mx-auto scroll-smooth place-items-center lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 xl:w-3/4 scrollbar-hide">
            {listings.map((listing, index) => {
              const images = listing?.image || [];
              const firstImage = images[0]?.url;
              const listingId = listing?._id;
              const remainingImagesCount =
                images.length > 1 ? images.length - 1 : 0;

              return (
                <motion.div
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  key={index}
                  className="flex relative flex-col max-w-[300px] h-[420px] bg-[#324de7] bg-opacity-35 backdrop-blur-md rounded-md shadow-md shadow-slate-950 transition-all cursor-pointer duration-300 hover:shadow-slate-700"
                >
                  <div className="relative">
                    {firstImage && (
                      <motion.img
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                        src={firstImage}
                        alt="image"
                        className="min-w-[150px] w-full object-cover rounded-t-md h-[210px] rounded-br-3xl hover:opacity-85 shadow-sm shadow-slate-900"
                      />
                    )}
                    {remainingImagesCount > 0 && (
                      <span className="absolute p-1 text-sm text-blue-300 rounded backdrop-blur-sm bg-slate-800 bg-opacity-70 top-2 left-2">
                        +{remainingImagesCount}
                      </span>
                    )}
                  </div>
                  <div className="flex relative flex-col px-4 py-2 bg-[#464e7e] shadow-md shadow-slate-900 rounded-b-md h-full m-2 rounded-tl-2xl bg-opacity-35">
                    {/* <div
                      onClick={() =>
                        handleLoveClick(listing.owner, listing._id)
                      }
                      className="absolute right-2 top-2 z-[100]"
                    >
                      <button className="text-2xl text-pink-500 transition-all duration-200 hover:cursor-pointer hover:scale-95">
                        {userWishlists &&
                        userWishlists.includes(listing?._id) ? (
                          <BsHeartFill />
                        ) : (
                          <BsHeart />
                        )}
                      </button>
                    </div> */}
                    <h2 className="text-lg mb-2 font-semibold text-transparent font-poppins bg-gradient-to-r from-[#c4b7ff] via-[#8381ff] to-[#8971f7] drop-shadow-2xl bg-clip-text">
                      {listing?.title}
                    </h2>
                    <p className="text-[15px] mb-3 h-[40px] font-semibold text-transparent  font-inter bg-gradient-to-br from-[#c9beff] via-[#b5b2fd] to-[#c0b6f1] drop-shadow-2xl bg-clip-text">
                      {listing?.description.split(" ").length > 15
                        ? `${listing?.description
                            .split(" ")
                            .slice(0, 15)
                            .join(" ")} ...`
                        : `${listing?.description}`}
                    </p>
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-col my-1 overflow-hidden font-medium text-[#9796e6] gap-x-1">
                        <span>
                          ${listing?.price}{" "}
                          <span className="text-xs">/night</span>
                        </span>
                      </div>
                      {/* <div className="flex items-center gap-1 text-sm font-semibold text-blue-200">
                        <IoBagCheckOutline className="text-blue-400" />
                        <span>Book Now</span>
                      </div> */}
                    </div>
                    <div className="flex flex-row items-center justify-between w-full my-3">
                      <div
                        onClick={() =>
                          handleLoveClick(listing.owner, listing._id)
                        }
                        className="relative z-[100]"
                      >
                        <button className="text-sm bg-[#383868] px-2 py-2  tracking-wide rounded-md shadow-sm shadow-slate-800 font-medium text-pink-400 font-poppins transition-all duration-200 hover:cursor-pointer hover:scale-95">
                          Wishlist -
                        </button>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/listing-insider/${listing._id}`)
                        }
                        className="flex items-center gap-1 p-2 text-sm font-semibold text-blue-200 rounded-md shadow-md bg-slate-600 shadow-slate-900 hover:bg-slate-700 active:bg-slate-800"
                      >
                        <IoBagCheckOutline className="text-blue-400" />
                        <span>Check Out</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="w-10/12 mx-auto text-center text-blue-300">
            You have no wishlisted items.
          </div>
        )}
      </div>
    </div>
  );
};

export default WishLists;
