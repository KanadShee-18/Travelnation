import React, { lazy, Suspense } from "react";
import HomeVideoSlider from "../component/homepage/HomeVideoSlider";
import Spinner from "../component/common/Spinner";

const Explore = lazy(() => import("../component/homepage/Explore"));
const BannerVideo = lazy(() =>
  import("../component/homepage/core/BannerVideo")
);

const Homepage = () => {
  return (
    <div>
      <div className="relative h-screen overflow-hidden">
        <Suspense
          fallback={
            <div className="grid w-full h-full place-items-center">
              <Spinner />
            </div>
          }
        >
          <BannerVideo />
        </Suspense>

        {/* Section 1 */}
        <div className="absolute inset-0 z-50">
          <HomeVideoSlider />
        </div>
      </div>

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
    </div>
  );
};

export default Homepage;
