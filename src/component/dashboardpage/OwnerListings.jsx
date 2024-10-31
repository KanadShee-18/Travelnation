import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ownerListings } from "../../services/servercalls/listingApis";
import Spinner from "../common/Spinner";
import { MdEditDocument } from "react-icons/md";
import { BsTrash2Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OwnerListings = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [imagesNumber, setImagesNumber] = useState(0);

  const truncatedWords = 15;

  console.log("Listings comes as: ", listings);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const result = await ownerListings(token);
      setListings(result?.data?.listings);
      setLoading(false);
    };
    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="grid w-full h-[70vh] place-items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-10/12 min-h-screen gap-4 mx-auto my-6">
      <h1 className="text-4xl font-semibold text-start text-transparent md:text-start font-poppins bg-gradient-to-r from-[#9077ff] via-[#a8a6ff] to-[#a89be6] drop-shadow-2xl bg-clip-text">
        Your Listings
      </h1>
      <br />
      <div className="relative grid w-full h-full grid-cols-1 gap-4 py-2 scroll-smooth place-items-center xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
        {listings?.map((listing, index) => {
          const images = listing?.image || [];
          const firstImage = images[0]?.url;
          const listingId = listing?._id;
          console.log("Listing id is: ", listingId);

          const remainingImagesCount =
            images.length > 1 ? images.length - 1 : 0;

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => navigate(`/listing-insider/${listingId}`)}
              key={index}
              className="flex relative flex-col max-w-[300px] h-[420px] gap-y-1 bg-[#464e7e] bg-opacity-35 backdrop-blur-md rounded-md shadow-md shadow-slate-950 transition-all  cursor-pointer duration-300 hover:shadow-slate-700"
            >
              <div className="relative">
                {firstImage && (
                  <>
                    <motion.img
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1.2 }}
                      src={firstImage}
                      alt="image"
                      className="min-w-[150px] w-full object-cover rounded-t-md h-[210px] rounded-br-3xl hover:opacity-85"
                    />
                  </>
                )}
                {remainingImagesCount > 0 && (
                  <span className="absolute p-1 text-sm text-blue-300 rounded backdrop-blur-sm bg-slate-800 bg-opacity-70 top-2 left-2">
                    +{remainingImagesCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col px-4 py-2">
                <h2 className="text-lg mb-2 font-semibold text-transparent font-poppins bg-gradient-to-r from-[#7e61ff] via-[#8381ff] to-[#8971f7] drop-shadow-2xl bg-clip-text">
                  {listing?.title}
                </h2>
                <h3 className="text-[15px] mb-1 font-semibold text-transparent font-inter bg-gradient-to-br from-[#aba0e0] via-[#9d9bdb] to-[#ada1e6] drop-shadow-2xl bg-clip-text">
                  {listing?.description?.split(" ").length > truncatedWords
                    ? `${listing?.description
                        .split(" ")
                        .slice(0, truncatedWords)
                        .join(" ")} ...`
                    : `${listing?.description}`}
                </h3>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col my-1 overflow-hidden font-medium text-blue-300 gap-x-1">
                    <p className="w-11/12 text-sm font-semibold text-nowrap text-ellipsis">
                      {listing?.location}, {listing?.country}
                    </p>

                    <p className="text-lg font-medium text-slate-300">
                      &#8377; {listing?.price.toLocaleString()}
                    </p>
                  </div>
                  {/* <div className="flex flex-row gap-x-2">
                  <button>
                    <MdEditDocument className="text-2xl text-[#8381ff]" />
                  </button>
                  <button>
                    <BsTrash2Fill className="text-2xl text-[#7e88b4]" />
                  </button>
                </div> */}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OwnerListings;
