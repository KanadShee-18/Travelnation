import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import exploremainImg from "../assets/explorePics/exploremain.jpg";
import { fetchAllListings } from "../services/servercalls/listingApis";
import { FaStaylinked } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CategoryList from "../listingPages/CategoryList";
import Spinner from "../component/common/Spinner";
import ShimmerCardNumber from "../component/common/ShimmerCardNumber";
import { FaArrowUp } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { addToWishList } from "../services/servercalls/authApis";
import { toast } from "react-toastify";
import { setUserWishLists } from "../slices/userSlice";

const Accommodations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const { userWishlists } = useSelector((state) => state.user);
  const limit = 8;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch listings based on the current page
  const fetchListings = useCallback(async () => {
    setLoading(true);
    const data = await fetchAllListings(page, limit);
    if (data?.listingsData?.data) {
      setListings((prevListings) => [
        ...prevListings,
        ...data.listingsData.data,
      ]);
      setHasMore(page < data.listingsData.totalPages);
    }
    setLoading(false);
  }, [page]);

  // Load initial listings when the component mounts or when the page changes
  useEffect(() => {
    fetchListings();
  }, [fetchListings]); // Dependency array includes fetchListings only

  const loadMoreListings = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  console.log("Listings are: ", listings);

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
    console.log("RESPONSE OF ADDWISHLIST: ", response);

    if (response) {
      setFillLove(true);
      const newWishlists = [...userWishlists, listingId];
      dispatch(setUserWishLists(newWishlists));
    } else {
      const filteredLists = userWishlists.filter((id) => id !== listingId);
      dispatch(setUserWishLists(filteredLists));
    }
    toast("See your wishlist in your wishlist section");
  };

  if (loading && listings.length === 0) {
    return (
      <div className="grid w-full place-items-center">
        <Spinner />
      </div>
    );
  }
  console.log("User wishlists: ", userWishlists);

  return (
    <div className="w-screen h-full min-h-screen pt-16 text-blue-500 accomodation dark:bg-[#0b101b]">
      <div className="fixed inset-0 max-w-full opacity-65">
        <img
          src={exploremainImg}
          alt=""
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 opacity-25 bg-gradient-to-t from-black via-slate-950 to-slate-900"></div>
      </div>

      <div className="relative flex flex-col min-w-full bg-[#1f2131] bg-opacity-85 min-h-screen scroll-smooth">
        <div className="relative min-w-full h-fit bg-[#1e2141] bg-opacity-45 pb-6">
          <div className="w-11/12 pt-10 mx-auto md:w-10/12">
            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-3">
                <FaStaylinked className="text-3xl text-pink-600" />
                <h1 className="text-start text-3xl font-semibold text-transparent font-poppins bg-gradient-to-r from-pink-600 via-[#ff4372] to-[#ff4d79] drop-shadow-2xl bg-clip-text">
                  Find Your Perfect Stay
                </h1>
              </div>
              <div className="w-full">
                <p className="text-start text-lg ml-12 font-semibold text-transparent font-poppins bg-gradient-to-r from-[#afc1ff] via-[#b4caf1] to-[#a6aacc] drop-shadow-2xl bg-clip-text">
                  Explore According to Categories
                </p>
              </div>
              <CategoryList />
            </div>
          </div>
        </div>

        <div className="relative h-full min-w-full py-6 mb-36">
          <InfiniteScroll
            dataLength={listings.length}
            next={loadMoreListings}
            hasMore={hasMore}
            loader={<Spinner className="z-[100]" />}
            endMessage={
              <div className="w-full mx-auto text-center">
                No more listings to show
              </div>
            }
            className="relative grid w-10/12 h-full grid-cols-1 gap-4 py-2 mx-auto mb-40 scroll-smooth place-items-center lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 xl:w-3/4 scrollbar-hide"
          >
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
                  onClick={() => navigate(`/listing-insider/${listing._id}`)}
                  className="flex relative flex-col max-w-[300px] h-[420px] bg-[#304df0] bg-opacity-25 backdrop-blur-md rounded-md shadow-md shadow-slate-950 transition-all cursor-pointer duration-300 hover:shadow-slate-700"
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
                    <h3 className="text-[15px] scrollbar-hide mb-3 h-[40px] overflow-y-hidden font-semibold text-transparent font-inter bg-gradient-to-br from-[#c9beff] via-[#b5b2fd] to-[#c0b6f1] drop-shadow-2xl bg-clip-text">
                      {listing?.description.split(" ").length > 15
                        ? `${listing?.description
                            .split(" ")
                            .slice(0, 15)
                            .join(" ")} ...`
                        : `${listing?.description}`}
                    </h3>
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
          </InfiniteScroll>
        </div>
      </div>
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed p-2 text-2xl text-blue-500 transition-all duration-300 rounded-full shadow-lg bg-slate-500 bg-opacity-55 bottom-10 right-10 hover:shadow-xl"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default Accommodations;
