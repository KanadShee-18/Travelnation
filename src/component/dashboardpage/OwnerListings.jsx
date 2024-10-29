import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ownerListings } from "../../services/servercalls/listingApis";
import Spinner from "../common/Spinner";
import { MdEditDocument } from "react-icons/md";
import { BsTrash2Fill } from "react-icons/bs";

const OwnerListings = () => {
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [imagesNumber, setImagesNumber] = useState(0);

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
    <div className="relative flex flex-wrap items-start justify-around w-10/12 min-h-screen gap-4 mx-auto my-6">
      {listings?.map((listing, index) => {
        const images = listing?.image || [];
        const firstImage = images[0]?.url;
        const remainingImagesCount = images.length > 1 ? images.length - 1 : 0;

        return (
          <div
            key={index}
            className="flex relative flex-col max-w-[300px] gap-y-1 bg-[#464e7e] bg-opacity-35 backdrop-blur-md rounded-md shadow-md shadow-slate-950 transition-all  cursor-pointer duration-300 mx-auto hover:shadow-slate-700"
          >
            <div className="relative">
              {firstImage && (
                <>
                  <img
                    src={firstImage}
                    alt="image"
                    className="min-w-[150px] w-full object-cover rounded-t-md h-[210px] rounded-br-3xl hover:opacity-85"
                  />
                </>
              )}
              {remainingImagesCount > 0 && (
                <span className="absolute p-1 text-sm text-white bg-black rounded bg-opacity-70 top-2 left-2">
                  +{remainingImagesCount}
                </span>
              )}
            </div>
            <div className="flex flex-col px-4 py-2">
              <h2 className="text-lg mb-2 font-semibold text-transparent font-poppins bg-gradient-to-r from-[#7e61ff] via-[#8381ff] to-[#8971f7] drop-shadow-2xl bg-clip-text">
                {listing?.title}
              </h2>
              <h3 className="text-base mb-1 font-semibold text-transparent font-inter bg-gradient-to-br from-[#aba0e0] via-[#9d9bdb] to-[#ada1e6] drop-shadow-2xl bg-clip-text">
                {listing?.description}
              </h3>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col my-1 font-medium text-blue-300 gap-x-1">
                  <p>
                    {listing?.location}, {listing?.country}
                  </p>

                  <p className="text-lg font-medium text-slate-300">
                    &#8377; {listing?.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-row gap-x-2">
                  <button>
                    <MdEditDocument className="text-2xl text-[#8381ff]" />
                  </button>
                  <button>
                    <BsTrash2Fill className="text-2xl text-[#7e88b4]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OwnerListings;
