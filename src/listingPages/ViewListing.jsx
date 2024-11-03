import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteListing,
  fetchListing,
} from "../services/servercalls/listingApis";
import { motion } from "framer-motion";
import Spinner from "../component/common/Spinner";
import viewpageImg from "../assets/explorePics/viewpage.jpg";
import ImageGallery from "./ImageGallery";
import hotelImg from "../assets/explorePics/dashhotel.jpg";
import { MdRebaseEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { setModifyListing, setListingData } from "../slices/listingSlice";
import { toast } from "react-toastify";
import ReviewModal from "../component/common/ReviewModal";
import ReviewSlider from "../component/common/ReviewSlider";
import Footer from "../component/common/Footer";

mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

const ViewListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  let ownerId;
  if (user) {
    ownerId = user._id;
  }
  const [listing, setListing] = useState(null);
  const listingId = location.pathname.split("/").pop();
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState([]);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const fetchFullListingDetails = async (listingId) => {
      setLoading(true);
      const response = await fetchListing(listingId);
      // console.log("Response of full listing: ", response);
      setListing(response?.listing_details?.data);
      setRatings(response?.listing_details?.data?.reviews);
      dispatch(setListingData(response?.listing_details?.data));
      setLoading(false);
    };
    fetchFullListingDetails(listingId);
  }, []);

  useEffect(() => {
    if (listing && mapContainerRef.current) {
      // console.log("Coordinates : ", listing.geometry.coordinates);

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: listing.geometry.coordinates,
        zoom: 9,
      });

      const popup = new mapboxgl.Popup().setHTML(`
    <div class="popup-container">
      <h3 class="popup-title">${listing.title}</h3>
    </div>
  `);

      new mapboxgl.Marker()
        .setLngLat(listing.geometry.coordinates)
        .setPopup(popup)
        .addTo(map);

      return () => map.remove();
    }
  }, [listing]);

  const handleEditClick = () => {
    if (listing) {
      dispatch(setModifyListing(true));
      navigate(`/dashboard/modify-listing/${listing?._id}`);
    } else {
      toast("You can't edit this listing right now!");
    }
  };

  const handleDeleteClick = async () => {
    // console.log("Owner id is: ", listing.owner?._id);

    if (listing) {
      setLoading(true);
      await deleteListing(token, listing?._id, listing?.owner?._id);
      setLoading(false);
      navigate("/dashboard/listings");
    } else {
      toast("Not Able to Delete Your Listing.");
    }
  };

  return (
    <div className="w-screen h-full">
      <div className="fixed inset-0 max-w-full opacity-65">
        <img
          src={hotelImg}
          alt="Sign Up"
          className="object-cover w-full h-full "
        />
        <div className="absolute inset-0 opacity-75 bg-gradient-to-t from-black via-slate-950 to-slate-900"></div>
      </div>

      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10 h-[70vh]"></div>
      <div className="fixed top-0 w-full h-full opacity-80">
        <div className="absolute top-0 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>

      {loading && (
        <div className="grid w-full h-[20vh] absolute z-50 place-items-center">
          <Spinner />
        </div>
      )}

      <div className="relative z-40 flex flex-col items-start justify-center gap-4 mx-10 lg:mx-auto xl:w-10/12 lg:w-11/12 lg:flex-row">
        <motion.div
          initial={{ opacity: 0, x: "50%", y: "20%", scale: 0.3 }}
          whileInView={{ opacity: 1, x: "0%", y: "0%", scale: 1 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 40,
          }}
          className="relative lg:w-1/2 w-full mx-auto  mt-24 flex flex-col gap-y-3 items-start justify-center p-5 bg-gradient-to-br from-[#232842] via-[#363c61] to-[#2c3252] shadow-sm shadow-slate-950 backdrop-blur-sm text-[#937aff] listingCard"
        >
          <h2 className="text-4xl font-semibold text-start text-transparent md:text-start font-poppins bg-gradient-to-r from-pink-600 via-[#ff4372] to-[#ff4d79] drop-shadow-2xl bg-clip-text">
            Insides of {listing?.title}
          </h2>
          <div className="imgsContainer w-full h-[450px] bg-slate-200 flex items-center justify-center">
            {listing?.image && (
              <ImageGallery images={listing.image.map((img) => img.url)} />
            )}
          </div>
          <div>
            <p className="text-2xl font-semibold text-transparent font-poppins bg-gradient-to-r from-[#8064ff] via-[#817fff] to-[#9984f5] drop-shadow-2xl bg-clip-text">
              {listing?.title}
            </p>
            <p className="my-1 text-sm font-medium tracking-wide text-transparent font-poppins bg-gradient-to-br from-slate-400 to-slate-300 drop-shadow-2xl bg-clip-text text-start">
              {listing?.description}
            </p>
          </div>
          <div className="flex flex-col justify-between w-full md:flex-row">
            <div>
              <div className="justify-start ">
                <h1 className="text-start text-slate-400">
                  <span className="text-lg font-semibold text-[#848fc9]">
                    OWNER:
                  </span>{" "}
                  {listing?.owner?.name}
                </h1>
              </div>
              <div>
                <p className="text-start text-slate-400">
                  <span className="text-lg font-semibold text-[#848fc9]">
                    Located at:{" "}
                  </span>{" "}
                  {listing?.location} - {listing?.country}
                </p>
              </div>
              <div className="text-xl font-semibold">
                &#8377; {listing?.price.toLocaleString()}
              </div>
            </div>
            <div>
              {listing?.owner?._id === ownerId && (
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => handleEditClick()}
                    className="flex flex-row items-center px-4 py-2 text-sm font-medium rounded-md shadow-md hover:bg-slate-800 shadow-slate-950 gap-x-2 bg-slate-700"
                  >
                    <MdRebaseEdit className="text-lg" />
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDeleteClick()}
                    className="flex flex-row items-center px-4 py-2 text-sm font-medium text-pink-500 rounded-md shadow-md hover:bg-slate-800 shadow-slate-950 gap-x-2 bg-slate-700"
                  >
                    <FaTrash className="text-lg" />
                    DELETE
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col w-full lg:w-1/2">
          <motion.div className="relative w-full md:w-4/5  lg:h-[50vh] h-[500px] mx-auto  mt-24 flex flex-col gap-y-3 items-start justify-center p-5 bg-[#3b405c] bg-opacity-85 shadow-sm shadow-slate-950 backdrop-blur-sm text-[#937aff] listingCard">
            <h2 className="text-3xl font-semibold text-start text-transparent md:text-start font-poppins bg-gradient-to-r from-[#9077ff] via-[#a8a6ff] to-[#a89be6] drop-shadow-2xl bg-clip-text">
              Have a Look in its Exact Location
            </h2>
            <div
              ref={mapContainerRef}
              className="w-full h-full rounded-md shadow-md shadow-slate-950"
            ></div>
          </motion.div>
          <div className="relative flex flex-col md:w-4/5 w-full  bg-[#3b405c] p-4 bg-opacity-65 rounded-md mx-auto mt-10 gap-y-3 shadow-md shadow-slate-950 listingCard">
            <ReviewModal listingId={listingId} />
          </div>
        </div>
      </div>
      <div className="relative z-40 flex flex-col items-start justify-start gap-4 mx-10 my-10 text-blue-500 lg:mx-auto xl:w-10/12 lg:w-11/12">
        <h2 className="text-lg font-semibold text-start text-transparent md:text-start font-poppins bg-gradient-to-r from-[#9077ff] via-[#a8a6ff] to-[#a89be6] drop-shadow-2xl bg-clip-text">
          Reviews about this listing:{" "}
        </h2>
        <br />
        <ReviewSlider Id={"ReviewSlider"} Reviews={ratings} />
      </div>
      <div className="relative w-full bg-slate-900">
        <Footer />
      </div>
    </div>
  );
};

export default ViewListing;
