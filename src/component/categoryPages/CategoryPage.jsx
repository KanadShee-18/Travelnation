import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategoryPage } from "../../services/servercalls/categoryApis";
import hotelImg from "../../assets/explorePics/dashhotel.jpg";
import { IoBagCheckOutline } from "react-icons/io5";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setUserWishLists } from "../../slices/userSlice";
import { addToWishList } from "../../services/servercalls/authApis";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { userWishlists } = useSelector((state) => state.user);
  const { categoryName } = useParams();
  // console.log(categoryName);
  const [listings, setListings] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState(null);

  useEffect(() => {
    const categoryPageData = async (categoryName) => {
      let response = await fetchCategoryPage(categoryName);
      // console.log(response);
      setCategoryDetails(response?.data?.categoryPageDetails?.data[0]);
      setListings(response?.data?.categoryPageDetails?.data?.[0]?.listings);
    };

    categoryPageData(categoryName);
  }, []);

  // console.log("Category page data is: ", listings);
  // console.log("Category categoryDetails is: ", categoryDetails);

  const handleLoveClick = async (ownerId, listingId) => {
    if (!user) {
      toast("You must log in to add this listing to your wishlist");
      return;
    }
    if (user._id === ownerId) {
      toast("As the owner, you can't add this listing to your wishlist.");
      return;
    }
    const response = await addToWishList(token, listingId);
    // console.log("RESPONSE OF ADDWISHLIST: ", response);

    if (response) {
      const newWishlists = [...userWishlists, listingId];
      dispatch(setUserWishLists(newWishlists));
    } else {
      const filteredLists = userWishlists.filter((id) => id !== listingId);
      dispatch(setUserWishLists(filteredLists));
    }
    toast("See your wishlist in your wishlist section");
  };

  return (
    <div>
      <div className="fixed inset-0 max-w-full opacity-65">
        <img
          src={hotelImg}
          alt="Sign Up"
          className="object-cover w-full h-full "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950 to-slate-900 opacity-85"></div>
      </div>
      <div className="relative z-20 mt-16">
        <div className="min-h-[200px] bg-[#243364] flex items-center bg-opacity-60">
          <div className="flex flex-col w-10/12 h-full m-auto gap-y-3">
            <h1 className="text-start text-3xl font-semibold text-transparent font-poppins bg-gradient-to-r from-[#8173ff] via-[#9185ff] to-[#e195ff] drop-shadow-2xl bg-clip-text">
              {categoryDetails?.name}
            </h1>
            <h1 className="text-start text-lg ml-6 font-semibold text-transparent font-poppins bg-gradient-to-r from-[#afc1ff] via-[#b4caf1] to-[#a6aacc] drop-shadow-2xl bg-clip-text">
              {categoryDetails?.description}
            </h1>
          </div>
        </div>
        <div className="w-full min-h-screen categoryBg">
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
                      <div
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
                      </div>
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
                        <div className="flex items-center gap-1 text-sm font-semibold text-blue-200">
                          <IoBagCheckOutline className="text-blue-400" />
                          <span>Book Now</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="w-10/12 mx-auto text-center text-blue-300">
              No Listings Available in this Topic
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
