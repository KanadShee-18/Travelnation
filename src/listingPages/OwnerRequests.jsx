import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  listingBooking,
  ownerRequestedListings,
  verifyBooking,
} from "../services/servercalls/listingApis";
import { IoBagCheckOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";

const OwnerRequests = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch listings on mount
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const result = await ownerRequestedListings(token);
      setBookings(result?.data?.listings);
      setLoading(false);
    };
    fetchListings();
  }, [token]); // Re-fetch when token changes

  // Handle the "Mark as Booked" action
  const handleDateClick = async (listingId, itemId, itemStatus, userId) => {
    // Start loading
    setLoading(true);

    // Call verifyBooking to mark the availability as booked
    const response = await verifyBooking(
      listingId,
      itemId,
      "booked", // Mark as booked
      userId,
      token
    );

    // console.log(response);

    // After the booking is confirmed, refetch the listings
    const updatedListings = await ownerRequestedListings(token);
    setBookings(updatedListings?.data?.listings);

    // Stop loading
    setLoading(false);
  };

  // console.log("Bookings requested: ", bookings);

  if (loading) {
    return (
      <div className="grid w-full h-full pt-16 place-items-center">
        <ShimmerLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="w-full p-4 mx-auto mt-16">
        <h2 className="relative w-10/12 mx-auto mb-4 text-4xl font-semibold text-blue-400 xl:w-3/4">
          Requested Bookings
        </h2>

        {bookings.length > 0 ? (
          <div className="relative grid w-10/12 h-full grid-cols-1 gap-4 py-2 mx-auto scroll-smooth place-items-center xl:w-3/4 scrollbar-hide">
            {bookings.map((listing, index) => {
              const images = listing?.image || [];
              const firstImage = images[0]?.url;
              const listingId = listing?._id;
              const remainingImagesCount =
                images.length > 1 ? images.length - 1 : 0;

              // Filter requested availabilities with requestedUser details
              const requestedAvailabilities = listing.availability.filter(
                (item) =>
                  item.status === "requested" && item.requestedUser.length > 0
              );

              const formattedDate = new Date(listing.availability[0].date)
                .toISOString()
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/");

              return (
                <motion.div
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  key={index}
                  className="flex relative flex-row max-w-full h-auto bg-[#324de7] bg-opacity-35 backdrop-blur-md rounded-md shadow-md shadow-slate-950 transition-all cursor-pointer duration-300 hover:shadow-slate-700"
                >
                  <div className="relative">
                    {firstImage && (
                      <motion.img
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                        src={firstImage}
                        alt="image"
                        className="min-w-[150px] md:w-[300px] h-full w-full object-cover aspect-square rounded-t-md rounded-br-3xl hover:opacity-85 shadow-sm shadow-slate-900"
                      />
                    )}
                    {remainingImagesCount > 0 && (
                      <span className="absolute p-1 text-sm text-blue-300 rounded backdrop-blur-sm bg-slate-800 bg-opacity-70 top-2 left-2">
                        +{remainingImagesCount}
                      </span>
                    )}
                  </div>
                  <div className="flex relative flex-col px-4 py-2 bg-[#464e7e] shadow-md shadow-slate-900 rounded-b-md h-full m-2 rounded-tl-2xl bg-opacity-35">
                    <h2 className="text-lg mb-2 font-semibold text-transparent font-poppins bg-gradient-to-r from-[#c4b7ff] via-[#8381ff] to-[#8971f7] drop-shadow-2xl bg-clip-text">
                      {listing?.title}
                    </h2>
                    <p className="text-[15px] mb-3 h-[40px] font-semibold text-transparent font-inter bg-gradient-to-br from-[#c9beff] via-[#b5b2fd] to-[#c0b6f1] drop-shadow-2xl bg-clip-text">
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
                    </div>

                    <div className="flex flex-col w-full gap-4 my-3">
                      {requestedAvailabilities.length > 0 ? (
                        requestedAvailabilities.map((availability, idx) => (
                          <div
                            key={availability._id}
                            className="flex flex-col gap-2 p-4 rounded-md shadow-md bg-slate-700"
                          >
                            <div>
                              <span className="font-medium text-blue-300">
                                Requested Date:{" "}
                                {new Date(availability.date)
                                  .toLocaleDateString(undefined, {
                                    timeZone: "UTC",
                                  })
                                  .split("/")
                                  .reverse()
                                  .join("/")}
                              </span>
                            </div>

                            {availability.requestedUser.map((user) => (
                              <div
                                key={user._id}
                                className="flex flex-col items-center justify-between px-3 py-2 rounded-md bg-slate-600"
                              >
                                <div className="text-blue-200">
                                  <span className="font-medium">
                                    Requested By:
                                  </span>{" "}
                                  {user.name} ({user.email})
                                </div>
                                <button
                                  onClick={() =>
                                    handleDateClick(
                                      listing._id,
                                      availability._id,
                                      availability.status,
                                      user._id // Pass user details
                                    )
                                  }
                                  className="flex items-center gap-1 px-3 py-1 mt-3 text-sm font-semibold text-blue-200 bg-blue-500 rounded-md shadow-md hover:bg-blue-600 active:bg-blue-700"
                                >
                                  <TiTick className="text-white" />
                                  <span>Mark as Booked</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-blue-300">
                          No requested availabilities.
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row items-center justify-between w-full my-3">
                      <div
                        onClick={() =>
                          navigate(`/listing-insider/${listing._id}`)
                        }
                        className="flex items-center gap-1 p-2 text-sm font-semibold text-blue-200 rounded-md shadow-md bg-slate-600 shadow-slate-900 hover:bg-slate-700 active:bg-slate-800"
                      >
                        <IoBagCheckOutline className="text-blue-400" />
                        <span>See Your Listing</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="w-10/12 mx-auto text-center text-blue-300">
            You have no requested bookings.
          </div>
        )}
      </div>
    </div>
  );
};

const ShimmerLoader = () => {
  return (
    <div className="w-full p-4 mx-auto mt-16">
      <h2 className="relative w-10/12 mx-auto mb-4 text-4xl font-semibold text-blue-400 xl:w-3/4">
        Requested Bookings
      </h2>
      <div className="relative grid w-10/12 h-full grid-cols-1 gap-4 py-2 mx-auto scroll-smooth place-items-center xl:w-3/4 scrollbar-hide">
        {/* Shimmering Placeholder for Listings */}
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex relative flex-row max-w-full h-auto bg-[#e0e0e0] animate-pulse rounded-md shadow-md shadow-slate-950 transition-all cursor-pointer duration-300"
          >
            <div className="relative">
              <div className="min-w-[150px] md:w-[300px] h-full w-full bg-gray-300 rounded-t-md rounded-br-3xl"></div>
            </div>
            <div className="flex relative flex-col px-4 py-2 bg-[#e0e0e0] shadow-md shadow-slate-900 rounded-b-md h-full m-2 rounded-tl-2xl">
              <div className="w-[200px] h-[20px] bg-gray-300 rounded mb-2"></div>
              <div className="w-[250px] h-[15px] bg-gray-300 rounded mb-3"></div>
              <div className="w-[100px] h-[20px] bg-gray-300 rounded mb-2"></div>
              <div className="w-[50px] h-[20px] bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerRequests;
