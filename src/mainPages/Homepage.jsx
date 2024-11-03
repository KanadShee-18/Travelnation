import React, { lazy, Suspense } from "react";
import HomeVideoSlider from "../component/homepage/HomeVideoSlider";
import Spinner from "../component/common/Spinner";
import { motion } from "framer-motion";

const Explore = lazy(() => import("../component/homepage/Explore"));
import BannerVideo from "../component/homepage/core/BannerVideo";
import Footer from "../component/common/Footer";

const Homepage = () => {
  return (
    <div className="overflow-hidden">
      <motion.div className="relative w-full h-screen">
        <BannerVideo />
        {/* HomeVideoSlider now has a higher z-index to overlay BannerVideo */}
        <div className="absolute inset-0 z-10">
          <HomeVideoSlider />
        </div>
      </motion.div>

      {/* Section: 2 */}
      <Suspense
        fallback={
          <div className="grid w-full h-full place-items-center">
            <Spinner />
          </div>
        }
      >
        <Explore />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Homepage;
