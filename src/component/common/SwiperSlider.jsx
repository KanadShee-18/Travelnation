// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";

// const SwiperSlider = ({ images }) => {
//   // console.log("Images comes as: ", images);

//   return (
//     <Swiper
//       className="mb-4 rounded-md sliderShd"
//       modules={[Autoplay, Navigation, Pagination]}
//       navigation
//       pagination={{ clickable: true }}
//       spaceBetween={50}
//       autoplay={true}
//       loop={true}
//       slidesPerView={1}
//     >
//       {images.map((image, i) => (
//         <SwiperSlide key={i} className="w-full aspect-square">
//           <img src={image} className="object-cover w-full h-full" alt="image" />
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default SwiperSlider;

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";

// const SwiperSlider = ({ images }) => {
//   return (
//     <Swiper
//       className="mb-4 rounded-md sliderShd"
//       modules={[Autoplay, Navigation, Pagination]}
//       navigation={{
//         nextEl: ".swiper-button-next-custom",
//         prevEl: ".swiper-button-prev-custom",
//       }}
//       pagination={{ clickable: true }}
//       spaceBetween={50}
//       autoplay={true}
//       loop={true}
//       slidesPerView={1}
//     >
//       {images.map((image, i) => (
//         <SwiperSlide key={i} className="w-full aspect-square">
//           <img src={image} className="object-cover w-full h-full" alt="image" />
//         </SwiperSlide>
//       ))}
//       {/* Custom Navigation Buttons */}
//       <div className="swiper-button-next-custom">Next</div>
//       <div className="swiper-button-prev-custom">Prev</div>
//     </Swiper>
//   );
// };

// export default SwiperSlider;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const SwiperSlider = ({ images }) => {
  return (
    <Swiper
      className="mb-4 rounded-md sliderShd"
      modules={[Autoplay, Navigation, Pagination]}
      navigation={{
        nextEl: ".swiper-button-next-custom",
        prevEl: ".swiper-button-prev-custom",
      }}
      pagination={{ clickable: true }}
      spaceBetween={50}
      autoplay={true}
      loop={true}
      slidesPerView={1}
    >
      {images.map((image, i) => (
        <SwiperSlide key={i} className="w-full aspect-square">
          <img src={image} className="object-cover w-full h-full" alt="image" />
        </SwiperSlide>
      ))}

      {/* Custom Navigation Buttons */}
      <div className="absolute  swiper-button-next-custom bg-slate-200 p-1 text-slate-900 rounded-full top-1/2 z-[10] right-2 text-xl shadow-md shadow-slate-900 hover:bg-slate-800 hover:text-slate-200">
        <MdNavigateNext />
      </div>
      <div className="swiper-button-prev-custom bg-slate-200 text-slate-900 rounded-full p-1 text-xl  top-1/2 z-[10] left-2 absolute shadow-md shadow-slate-900 hover:bg-slate-800 hover:text-slate-200">
        <MdNavigateBefore />
      </div>
    </Swiper>
  );
};

export default SwiperSlider;
