import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

const Accomodations = () => {
  const { theme } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const navigate = useNavigate();
  const truncatedWords = 15;
  const limit = 8;

  useEffect(() => {
    fetchListings(page);

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

  const fetchListings = async (currentPage) => {
    setLoading(true);
    const data = await fetchAllListings(page, limit);
    if (data?.listingsData?.data) {
      setListings((prevData) =>
        currentPage === 1
          ? data.listingsData.data
          : [...prevData, ...data.listingsData.data]
      );
      setHasMore(currentPage < data.listingsData.totalPages);
      setPage(currentPage + 1);
    }
    setLoading(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  console.log("All listings are: ", listings);

  if (loading)
    return (
      <div className="grid w-full place-items-center">
        <Spinner />
      </div>
    );

  return (
    <div
      className="w-screen h-full min-h-screen pt-16 text-blue-500 accomodation
    dark:bg-[#0b101b]
    "
    >
      <div className="fixed inset-0 max-w-full opacity-65">
        <img
          src={exploremainImg}
          alt=""
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 opacity-50 bg-gradient-to-t from-black via-slate-950 to-slate-900"></div>
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
        {loading ? (
          <div className="relative h-full min-w-full py-6">
            <ShimmerCardNumber num={6} />
          </div>
        ) : (
          <div className="relative h-full min-w-full py-6">
            <InfiniteScroll
              dataLength={listings.length}
              next={() => fetchListings(page)}
              hasMore={hasMore}
              loader={<Spinner />}
              endMessage={
                <div className="w-full mx-auto text-center">
                  No more listings to show
                </div>
              }
              className="relative grid w-10/12 h-full grid-cols-1 gap-4 py-2 mx-auto scroll-smooth place-items-center lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 xl:w-3/4 scrollbar-hide"
            >
              {listings?.map((listing, index) => {
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
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                      // stiffness: 40,
                    }}
                    onClick={() => navigate(`/listing-insider/${listingId}`)}
                    key={index}
                    className="flex relative flex-col max-w-[300px] h-[420px] bg-[#464e7e] bg-opacity-35 backdrop-blur-md rounded-md shadow-md shadow-slate-950 transition-all  cursor-pointer duration-300 hover:shadow-slate-700"
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
                            className="min-w-[150px] w-full object-cover rounded-t-md h-[210px] rounded-br-3xl hover:opacity-85 shadow-sm shadow-slate-900"
                          />
                        </>
                      )}
                      {remainingImagesCount > 0 && (
                        <span className="absolute p-1 text-sm text-blue-300 rounded backdrop-blur-sm bg-slate-800 bg-opacity-70 top-2 left-2">
                          +{remainingImagesCount}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col px-4 py-2 bg-[#464e7e] shadow-md shadow-slate-900 rounded-b-md h-full m-2 rounded-tl-2xl bg-opacity-35">
                      <h2 className="text-lg mb-2 font-semibold text-transparent font-poppins bg-gradient-to-r from-[#c4b7ff] via-[#8381ff] to-[#8971f7] drop-shadow-2xl bg-clip-text">
                        {listing?.title}
                      </h2>
                      <h3 className="text-[15px] mb-1 font-semibold text-transparent font-inter bg-gradient-to-br from-[#c9beff] via-[#b5b2fd] to-[#c0b6f1] drop-shadow-2xl bg-clip-text">
                        {listing?.description?.split(" ").length >
                        truncatedWords
                          ? `${listing?.description
                              .split(" ")
                              .slice(0, truncatedWords)
                              .join(" ")} ...`
                          : `${listing?.description}`}
                      </h3>
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-col my-1 overflow-hidden font-medium text-[#9796e6] gap-x-1">
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
            </InfiniteScroll>

            {showScrollToTop && (
              <button
                onClick={scrollToTop}
                className="fixed p-3 rounded-full bg-slate-800 bg-opacity-65 bottom-2 right-10 text-slate-50"
              >
                <FaArrowUp size={20} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accomodations;
