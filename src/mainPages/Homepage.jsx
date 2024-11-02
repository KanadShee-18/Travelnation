import React, { lazy, Suspense, useRef } from "react";
import HomeVideoSlider from "../component/homepage/HomeVideoSlider";
import Spinner from "../component/common/Spinner";
import { motion, useScroll, useTransform } from "framer-motion";

const Explore = lazy(() => import("../component/homepage/Explore"));
import BannerVideo from "../component/homepage/core/BannerVideo";
import Footer from "../component/common/Footer";

const Homepage = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 0.1, 0]);

  return (
    <div>
      <motion.div className="relative h-screen overflow-hidden" ref={targetRef}>
        <BannerVideo />

        {/* Section 1 */}
        <motion.div style={{ opacity }} className="sticky inset-0 z-50">
          <HomeVideoSlider />
        </motion.div>
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
