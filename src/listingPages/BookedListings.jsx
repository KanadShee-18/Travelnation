import React, { useEffect, useState } from "react";
import { bookedListings } from "../services/servercalls/authApis";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Spinner from "../component/common/Spinner";

const BookedListings = () => {
  const { token } = useSelector((state) => state.auth);
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookedListings = async () => {
    setLoading(true);
    const response = await bookedListings(token);
    // console.log("response: ", response);
    setBooked(response?.user?.bookedStays);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookedListings();
  }, []);

  // console.log("Booked and requested listings: ", booked);

  if (loading) {
    return (
      <div className="grid w-full h-full place-items-center">
        <ShimmerLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="w-full p-4 mx-auto mt-16">
        <h2 className="relative w-10/12 mx-auto mb-4 text-4xl font-semibold text-blue-400 xl:w-3/4">
          Your Booked and Requested Listings
        </h2>
        {booked.length > 0 ? (
          <div className="relative grid w-10/12 h-full grid-cols-1 gap-4 py-2 mx-auto scroll-smooth place-items-center xl:w-3/4 scrollbar-hide">
            {booked.map((listing, index) => {
              const images = listing?.listing?.image || [];
              const firstImage = images[0]?.url;
              const listingId = listing?.listing?._id;
              const remainingImagesCount =
                images.length > 1 ? images.length - 1 : 0;
              const status = listing?.status; // Get status from availability

              return (
                <motion.div
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  key={index}
                  className="flex relative flex-row max-w-[500px] h-auto bg-[#324de7] bg-opacity-35 backdrop-blur-md rounded-md shadow-md shadow-slate-950 transition-all cursor-pointer duration-300 hover:shadow-slate-700"
                >
                  <div className="relative">
                    {firstImage && (
                      <motion.img
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                        src={firstImage}
                        alt="image"
                        className="min-w-[150px] md:w-[250px] aspect-square h-full object-cover rounded-t-md rounded-br-3xl hover:opacity-85 shadow-sm shadow-slate-900"
                      />
                    )}
                    {remainingImagesCount > 0 && (
                      <span className="absolute z-[] p-1 text-sm text-blue-300 rounded backdrop-blur-sm bg-slate-800 bg-opacity-70 top-2 left-2">
                        +{remainingImagesCount}
                      </span>
                    )}
                  </div>
                  <div className="flex min-w-[200px] items-center justify-center relative flex-col px-4 py-2 bg-[#464e7e] shadow-md shadow-slate-900 rounded-b-md min-h-full m-2 rounded-tl-2xl bg-opacity-35">
                    <h2 className="text-lg mb-2 font-semibold text-transparent font-poppins bg-gradient-to-r from-[#c4b7ff] via-[#8381ff] to-[#8971f7] drop-shadow-2xl bg-clip-text">
                      {listing?.listing.title}
                    </h2>
                    <p className="text-[15px] mb-3 h-[40px] font-semibold text-transparent  font-inter bg-gradient-to-br from-[#c9beff] via-[#b5b2fd] to-[#c0b6f1] drop-shadow-2xl bg-clip-text">
                      {listing?.listing.description.split(" ").length > 15
                        ? `${listing?.listing.description
                            .split(" ")
                            .slice(0, 15)
                            .join(" ")} ...`
                        : `${listing?.listing.description}`}
                    </p>
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-col my-1 overflow-hidden font-medium text-[#9796e6] gap-x-1">
                        <span>
                          &#8377;{" "}
                          {listing?.listing.price.toLocaleString("en-IN")}{" "}
                          <span className="text-xs">/night</span>
                        </span>
                        {status && (
                          <span className="px-3 py-1 my-3 ml-2 text-sm text-yellow-400 rounded-md shadow-md shadow-slate-950 bg-slate-900">
                            {status.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="w-10/12 mx-auto text-center text-blue-300">
            You have no booked or requested items.
          </div>
        )}
      </div>
    </div>
  );
};

const ShimmerLoader = () => {
  return (
    <div className="flex relative flex-row max-w-[500px] h-auto bg-[#636c8a] animate-pulse rounded-md shadow-md shadow-slate-950 transition-all cursor-pointer duration-300 hover:shadow-slate-700">
      <div className="relative w-[150px] h-[150px] bg-slate-400 rounded-t-md rounded-br-3xl"></div>
      <div className="flex flex-col px-4 py-2 bg-[#465672] shadow-md shadow-slate-900 rounded-b-md min-h-full m-2 rounded-tl-2xl">
        <div className="w-[200px] h-[20px] bg-gray-500 rounded mb-2"></div>
        <div className="w-[250px] h-[15px] bg-gray-500 rounded mb-3"></div>
        <div className="w-[100px] h-[20px] bg-gray-500 rounded mb-2"></div>
        <div className="w-[50px] h-[20px] bg-gray-500 rounded"></div>
      </div>
    </div>
  );
};

export default BookedListings;
