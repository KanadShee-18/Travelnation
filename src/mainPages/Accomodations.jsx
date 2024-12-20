// import React, { useCallback, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import exploremainImg from "../assets/explorePics/exploremain.jpg";
// import { fetchAllListings } from "../services/servercalls/listingApis";
// import { FaStaylinked } from "react-icons/fa";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import CategoryList from "../listingPages/CategoryList";
// import Spinner from "../component/common/Spinner";
// import ShimmerCardNumber from "../component/common/ShimmerCardNumber";
// import { FaArrowUp } from "react-icons/fa";
// import { IoBagCheckOutline } from "react-icons/io5";
// import { BsHeart, BsHeartFill } from "react-icons/bs";
// import { addToWishList } from "../services/servercalls/authApis";
// import { toast } from "react-toastify";
// import { setUserWishLists } from "../slices/userSlice";
// import Footer from "../component/common/Footer";

// const Accommodations = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { theme } = useSelector((state) => state.theme);
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.user);
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [showScrollToTop, setShowScrollToTop] = useState(false);
//   const { userWishlists } = useSelector((state) => state.user);
//   const limit = 8;

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 200) {
//         setShowScrollToTop(true);
//       } else {
//         setShowScrollToTop(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const loadInitialData = async () => {
//       setLoading(true);
//       const data = await fetchAllListings(1, limit);
//       if (data?.listingsData?.data) {
//         setListings(data.listingsData.data);
//         setHasMore(page < data.listingsData.totalPages);
//       }
//       setLoading(false);
//     };
//     loadInitialData();
//   }, []);

//   // Fetch additional data for infinite scroll
//   const fetchMoreData = useCallback(async () => {
//     const nextPage = page + 1;
//     setLoading(true);

//     const data = await fetchAllListings(nextPage, limit);
//     if (data?.listingsData?.data) {
//       setListings((prevListings) => [
//         ...prevListings,
//         ...data.listingsData.data,
//       ]);
//       setPage(nextPage);
//       setHasMore(nextPage < data.listingsData.totalPages);
//     }
//     setLoading(false);
//   }, [page, limit]);

//   const loadMoreListings = () => {
//     if (hasMore) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   // console.log("Listings are: ", listings);

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
//     // console.log("RESPONSE OF ADDWISHLIST: ", response);

//     // if (response) {
//     //   setFillLove(true);
//     //   const newWishlists = [...userWishlists, listingId];
//     //   dispatch(setUserWishLists(newWishlists));
//     // } else {
//     //   const filteredLists = userWishlists.filter((id) => id !== listingId);
//     //   dispatch(setUserWishLists(filteredLists));
//     // }
//     toast("See your wishlist in your wishlist section");
//   };

//   if (loading && listings.length === 0) {
//     return (
//       <div className="relative flex items-center justify-center w-screen min-h-screen mt-20">
//         <ShimmerCardNumber num={8} />
//       </div>
//     );
//   }
//   // console.log("User wishlists: ", userWishlists);

//   return (
//     <div className="w-screen h-full min-h-screen pt-16 text-blue-500 accomodation dark:bg-[#0b101b]">
//       {/* <div className="fixed inset-0 max-w-full opacity-65">
//         <img
//           src={exploremainImg}
//           alt=""
//           className="object-cover w-full h-full"
//         />
//         <div className="absolute inset-0 opacity-25 bg-gradient-to-t from-black via-slate-950 to-slate-900"></div>
//       </div> */}

//       <div className="relative flex flex-col min-w-full min-h-screen bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 bg-opacity-95 scroll-smooth">
//         <div className="relative min-w-full h-fit bg-[#171a27] bg-opacity-45 pb-6">
//           <div className="w-11/12 pt-10 mx-auto md:w-10/12">
//             <div className="flex flex-col items-start gap-2">
//               <div className="flex gap-3 text-xl md:text-3xl">
//                 <FaStaylinked className="text-[#56a0ce] " />
//                 <h1 className="text-start  font-semibold text-transparent font-poppins bg-gradient-to-r from-[#549bc7] via-[#56a0ce] to-[#4781a5] drop-shadow-2xl bg-clip-text">
//                   Find Your Perfect Stay
//                 </h1>
//               </div>
//               <div className="w-full">
//                 <p className="text-start md:text-lg text-sm md:ml-12 ml-8 font-semibold text-transparent font-poppins bg-gradient-to-r from-[#7981a5] via-[#788fb9] to-[#686d94] drop-shadow-2xl bg-clip-text">
//                   Explore According to Categories
//                 </p>
//               </div>
//               <CategoryList />
//             </div>
//           </div>
//         </div>

//         <div className="relative h-full min-w-full py-6 mb-36">
//           <InfiniteScroll
//             dataLength={listings.length}
//             next={fetchMoreData}
//             hasMore={hasMore}
//             loader={<Spinner className="z-[100]" />}
//             endMessage={
//               <div className="w-full mx-auto text-center">
//                 No more listings to show
//               </div>
//             }
//             className="relative grid w-10/12 h-full grid-cols-1 gap-4 py-2 mx-auto mb-40 scroll-smooth place-items-center lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 xl:w-3/4 scrollbar-hide"
//           >
//             {listings.map((listing, index) => {
//               const images = listing?.image || [];
//               const firstImage = images[0]?.url;
//               const listingId = listing?._id;
//               const remainingImagesCount =
//                 images.length > 1 ? images.length - 1 : 0;

//               // let randomHeight = Math.floor(Math.random() * 150) + 400;

//               return (
//                 <motion.div
//                   initial={{ y: 20 }}
//                   whileInView={{ y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.3, ease: "easeInOut" }}
//                   key={index}
//                   // style={{ height: `${randomHeight}px` }}
//                   className={`flex relative flex-col max-w-[300px] h-[420px] bg-[#616e8b] bg-opacity-85 backdrop-blur-md rounded-md shadow-md shadow-slate-950 transition-all cursor-pointer duration-300 hover:shadow-slate-700`}
//                 >
//                   <div className="relative">
//                     {firstImage && (
//                       <motion.img
//                         initial={{ opacity: 0 }}
//                         whileInView={{ opacity: 1 }}
//                         transition={{ duration: 1.2 }}
//                         src={firstImage}
//                         alt="image"
//                         className="min-w-[150px] w-full object-cover rounded-t-md h-[210px] rounded-br-3xl hover:opacity-85 shadow-sm shadow-slate-900"
//                       />
//                     )}
//                     {remainingImagesCount > 0 && (
//                       <span className="absolute p-1 text-sm text-blue-300 rounded backdrop-blur-sm bg-slate-800 bg-opacity-70 top-2 left-2">
//                         +{remainingImagesCount}
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex relative flex-col px-4 py-2 bg-[#282d47] shadow-md shadow-slate-900 rounded-b-md h-full m-1 rounded-tl-2xl">
//                     <h2 className="text-lg mb-2 text-nowrap text-ellipsis font-semibold text-transparent font-poppins bg-gradient-to-r from-[#8a9dd1] via-[#9090ce] to-[#8aaace] drop-shadow-2xl bg-clip-text">
//                       {listing?.title}
//                     </h2>
//                     <h3 className="text-[15px] scrollbar-hide mb-3 h-[40px] overflow-y-hidden font-semibold text-transparent font-inter bg-gradient-to-br from-[#7985aa] via-[#7978bb] to-[#7a87be] drop-shadow-2xl bg-clip-text">
//                       {listing?.description.split(" ").length > 15
//                         ? `${listing?.description
//                             .split(" ")
//                             .slice(0, 15)
//                             .join(" ")} ...`
//                         : `${listing?.description}`}
//                     </h3>
//                     <div className="flex flex-row items-center justify-between">
//                       <div className="flex flex-col my-1 overflow-hidden font-medium text-[#59b7c4] gap-x-1">
//                         <span>
//                           ${listing?.price}{" "}
//                           <span className="text-xs">/night</span>
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex flex-row items-center justify-between w-full my-3">
//                       <div
//                         onClick={() =>
//                           handleLoveClick(listing.owner, listing._id)
//                         }
//                         className="relative z-[100]"
//                       >
//                         <button className="text-sm bg-[#6093b1] px-2 py-2  tracking-wide rounded-md shadow-sm shadow-slate-800 font-medium text-slate-800 font-poppins transition-all duration-200 hover:cursor-pointer hover:scale-95">
//                           Wishlist+
//                         </button>
//                       </div>
//                       <div
//                         onClick={() =>
//                           navigate(`/listing-insider/${listing._id}`)
//                         }
//                         className="flex items-center gap-1 p-2 text-sm font-semibold text-blue-200 rounded-md shadow-md bg-slate-600 shadow-slate-900 hover:bg-slate-700 active:bg-slate-800"
//                       >
//                         <IoBagCheckOutline className="text-blue-400" />
//                         <span>Check Out</span>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </InfiniteScroll>
//         </div>
//         <Footer />
//       </div>
//       {showScrollToTop && (
//         <button
//           onClick={scrollToTop}
//           className="fixed p-2 text-2xl text-blue-500 transition-all duration-300 rounded-full shadow-lg bg-slate-500 bg-opacity-55 bottom-10 right-10 hover:shadow-xl"
//         >
//           <FaArrowUp />
//         </button>
//       )}
//     </div>
//   );
// };

// export default Accommodations;

import React, { useCallback, useEffect, useState } from "react";
import { IoBagCheckOutline, IoSearchOutline } from "react-icons/io5";
import CategoryList from "../listingPages/CategoryList";
import { fetchAllListings } from "../services/servercalls/listingApis";
import InfiniteScroll from "react-infinite-scroll-component";
import ShimmerCardNumber from "../component/common/ShimmerCardNumber";
import ShimmerCard from "../component/common/ShimmerCard";
import Spinner from "../component/common/Spinner";
import { useNavigate } from "react-router-dom";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { toast } from "react-toastify";
import {
  addToWishList,
  toggleWishList,
} from "../services/servercalls/authApis";
import { useDispatch, useSelector } from "react-redux";
import { setUserWishLists } from "../slices/userSlice";
import SwiperSlider from "../component/common/SwiperSlider";
import { SiSentry } from "react-icons/si";
import { ACCOUNT_TYPE } from "../utils/constants";

const Accomodations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user, userWishlists } = useSelector((state) => state.user);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mouseHover, setMouseHover] = useState(false);
  const [listingIndex, setListingIndex] = useState(null);
  const [love, setLove] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 8;

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const data = await fetchAllListings(1, limit);
      // console.log(data);

      if (data?.listingsData?.data) {
        setListings(data.listingsData.data);
      }
      setLoading(false);
    };

    loadInitialData();
  }, []);

  // Function to fetch more listings if available:

  const fetchMoreListings = useCallback(async () => {
    const nextPage = page + 1;
    setLoading(true);

    setTimeout(async () => {
      const data = await fetchAllListings(nextPage, limit);

      if (data?.listingsData?.data) {
        setListings((prevListings) => [
          ...prevListings,
          ...data.listingsData.data,
        ]);
        setPage(nextPage);
        setHasMore(nextPage < data.listingsData.totalPages);
      }
      setLoading(false);
    }, 1000); // Delay of 1000ms (1 second)
    setLoading(false);
  }, [page, limit]);

  const handleWishlist = async (ownerId, listingId) => {
    if (!user) {
      toast("Please login to manage your wishlist.");
      return;
    }

    if (user.id === ownerId) {
      toast("As the owner, you can't add this listing to your wishlist.");
      return;
    }

    const response = await toggleWishList(user.token, listingId);
    if (response === null) return; // Exit if there was an error

    let updatedWishlists;
    if (response) {
      // If added to wishlist
      updatedWishlists = [...userWishlists, listingId];
    } else {
      // If removed from wishlist
      updatedWishlists = userWishlists.filter((id) => id !== listingId);
    }

    // Dispatch action to update Redux state
    dispatch(setUserWishLists(updatedWishlists));

    // Update user in localStorage to keep it in sync
    const updatedUser = { ...user, wishLists: updatedWishlists };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    toast("See your wishlists in your profile.");
  };

  const handleAirbnb = async () => {
    if (!user) {
      toast("You must be logged in to list your home");
      return;
    } else {
      navigate("/dashboard/add-listing");
    }
  };

  if (loading && listings.length === 0) {
    return (
      <div className="relative flex items-center justify-center w-screen h-screen mt-20">
        <div className="w-11/12 mx-auto lg:w-10/12">
          <div className="w-2/3 h-8 bg-gray-400 rounded-md shimmer lg:w-1/3"></div>

          <div className="grid gap-4 mt-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ShimmerCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // console.log(page);
  // console.log(listings);

  return (
    <div className="relative w-screen min-h-screen text-gray-800 bg-white">
      <div className="w-11/12 mx-auto lg:w-10/12">
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="flex gap-4 bg-[#f7f7f7] p-1 rounded-3xl shadow-md shadow-slate-500">
            <span
              // style={{
              //   boxShadow: "inset 0px -2px 2px rgba(0, 0, 0, 0.4)",
              // }}
              className="w-fit md:text-base text-sm text-center py-2 px-4 rounded-3xl  bg-[#f7f7f7] shadow-inner shadow-slate-700"
            >
              Stays to Look out
            </span>
            {user && user.accountType === ACCOUNT_TYPE.OWNER && (
              <span
                onClick={() => handleAirbnb()}
                // style={{
                //   boxShadow: "inset 0px -2px 2px rgba(0, 0, 0, 0.4)",
                // }}
                className="text-gray-800 hover:scale-95 hover:cursor-pointer transition-all duration-200 hover:text-[#ff385c] font-medium rounded-3xl flex items-center px-4 py-1 bg-[#f7f7f7] shadow-inner shadow-slate-700 md:text-base text-sm"
              >
                + Airbnb Your Home
              </span>
            )}
          </div>
        </div>
      </div>
      {/* <div className="w-full bg-slate-400 shadow-md mt-6 shadow-slate-400 h-[1px]"></div> */}

      <div className="w-11/12 mx-auto mt-10 lg:w-10/12">
        <CategoryList />
      </div>

      <div className="w-11/12 mx-auto mt-8 mb-40 lg:w-10/12">
        <InfiniteScroll
          key={page}
          dataLength={listings.length}
          next={fetchMoreListings}
          hasMore={hasMore}
          loader={<Spinner className="z-[100]" />}
          endMessage={
            <div className="w-full mx-auto text-center">
              No more listings to show
            </div>
          }
          className="relative grid w-full h-full grid-cols-1 gap-4 pb-20 md:grid-cols-3 place-items-center lg:grid-cols-3 xl:grid-cols-4 scrollbar-hide"
        >
          {listings.map((listing, index) => {
            const images = listing?.image || [];
            const firstImage = images[0].url;

            return (
              <div
                key={index}
                className="flex flex-col mt-8 rounded-md relative lg:w-[320px] md:w-[240px] w-[300px] h-fit"
              >
                <div
                  onMouseEnter={() => {
                    setListingIndex(index);
                    setMouseHover(true);
                  }}
                  onMouseLeave={() => {
                    setListingIndex(null);
                    setMouseHover(false);
                  }}
                  // onClick={() => navigate(`/listing-insider/${listing._id}`)}
                  className="relative w-full h-[300px] md:h-[240px] lg:h-[320px]  rounded-md shadow-md hover:cursor-pointer hover:opacity-85 shadow-slate-500 transition-all duration-200"
                >
                  <span
                    onClick={() => handleWishlist(listing.owner, listing._id)}
                    className="absolute z-[70] text-3xl text-[#ff385c] right-2 top-2"
                  >
                    {userWishlists.includes(listing._id) ? (
                      <IoIosHeart />
                    ) : (
                      <IoIosHeart className="text-slate-200" />
                    )}
                  </span>
                  {images.length === 1 ||
                  !mouseHover ||
                  index !== listingIndex ? (
                    <img
                      src={firstImage}
                      alt="Image"
                      className="object-cover w-full rounded-md aspect-square"
                    />
                  ) : (
                    <SwiperSlider images={images.map((image) => image.url)} />
                  )}
                </div>

                <div className="flex flex-col p-3 h-[210px]">
                  <h2 className="mb-2 text-lg font-semibold text-slate-600 text-nowrap text-ellipsis font-poppins drop-shadow-2xl ">
                    {listing?.title}
                  </h2>
                  <h3 className="text-[15px] scrollbar-hide mb-1 overflow-y-hidden font-semibold text-slate-500 font-inter drop-shadow-2xl">
                    {listing?.description.split(" ").length > 15
                      ? `${listing?.description
                          .split(" ")
                          .slice(0, 15)
                          .join(" ")} ...`
                      : `${listing?.description}`}
                  </h3>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col my-1 overflow-hidden font-medium text-[#425355] gap-x-1">
                      <span>
                        &#8377; {listing?.price.toLocaleString("en-IN")}{" "}
                        <span className="text-xs">/night</span>
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/listing-insider/${listing._id}`)
                      }
                      className="flex items-center gap-2 px-3 py-1 text-sm transition-all duration-200 rounded shadow-md bg-slate-200 shadow-slate-400 hover:scale-95 hover:cursor-pointer"
                    >
                      <SiSentry />
                      Checkout
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Accomodations;
