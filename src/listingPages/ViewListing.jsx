import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchListing } from "../services/servercalls/listingApis";
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

mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

const ViewListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { _id } = useSelector((state) => state.user.user);
  const ownerId = _id;
  const [listing, setListing] = useState(null);
  const listingId = location.pathname.split("/").pop();
  const [loading, setLoading] = useState(false);
  const mapContainerRef = useRef(null);
  console.log("Listing id in view listing: ", listingId);
  console.log("Owner id from state: ", ownerId);

  console.log("Listing in state is: ", listing);

  useEffect(() => {
    const fetchFullListingDetails = async (listingId) => {
      setLoading(true);
      const response = await fetchListing(listingId);
      console.log("Response of full listing: ", response);
      setListing(response?.listing_details?.data);
      dispatch(setListingData(response?.listing_details?.data));
      setLoading(false);
    };
    fetchFullListingDetails(listingId);
  }, []);

  useEffect(() => {
    if (listing && mapContainerRef.current) {
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
      navigate("/dashboard/add-listing");
    } else {
      toast("You can't edit this listing right now!");
    }
  };

  const handleDeleteClick = () => {};

  if (loading) {
    return (
      <div className="grid w-full h-[60vh] place-items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-screen h-full mb-32">
      <div className="fixed inset-0 max-w-full opacity-65">
        <img
          src={hotelImg}
          alt="Sign Up"
          className="object-cover w-full h-full "
        />
        <div className="absolute inset-0 opacity-75 bg-gradient-to-t from-black via-slate-950 to-slate-900"></div>
      </div>
      <div className="flex flex-col items-start justify-center gap-4 mx-10 lg:mx-auto xl:w-10/12 lg:w-11/12 lg:flex-row">
        <div className="relative lg:w-1/2 w-full mx-auto  mt-24 flex flex-col gap-y-3 items-start justify-center p-5 bg-[#3b405c] bg-opacity-85 rounded-md shadow-md shadow-slate-950 backdrop-blur-sm text-[#937aff]">
          <h2 className="text-4xl font-semibold text-start text-transparent md:text-start font-poppins bg-gradient-to-r from-[#9077ff] via-[#a8a6ff] to-[#a89be6] drop-shadow-2xl bg-clip-text">
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
        </div>

        <div className="relative w-full lg:w-2/5 lg:h-[50vh] h-[500px] mx-auto  mt-24 flex flex-col gap-y-3 items-start justify-center p-5 bg-[#3b405c] bg-opacity-85 rounded-md shadow-md shadow-slate-950 backdrop-blur-sm text-[#937aff]">
          <h2 className="text-3xl font-semibold text-start text-transparent md:text-start font-poppins bg-gradient-to-r from-[#9077ff] via-[#a8a6ff] to-[#a89be6] drop-shadow-2xl bg-clip-text">
            Have a Look in its Exact Location
          </h2>
          <div
            ref={mapContainerRef}
            className="w-full h-full rounded-md shadow-md shadow-slate-950"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ViewListing;
