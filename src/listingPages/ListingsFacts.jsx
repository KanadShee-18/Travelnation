// import React from "react";
// import { motion } from "framer-motion";

// const ListingsFacts = () => {
//   // Array of tips for the owner
//   const tips = [
//     {
//       title: "Upload Multiple Photos",
//       description:
//         "When creating a listing, you can upload up to 5 images to showcase your property. Make sure to use high-quality photos to attract more potential guests!",
//     },
//     {
//       title: "Select Available Dates",
//       description:
//         "You have the flexibility to choose a range of available dates for your listing. You can also add additional available dates later to accommodate more bookings.",
//     },
//     {
//       title: "Manage Availability",
//       description:
//         "If your availability changes, don’t forget to update your listing to ensure your calendar is always accurate. This helps avoid double bookings and keeps potential guests informed.",
//     },
//     {
//       title: "Respond to User Requests",
//       description:
//         "Timely responses are key! It's important to consistently provide feedback to guest requests. A quick response can increase your chances of confirming bookings and building a good relationship with users.",
//     },
//     {
//       title: "Pricing Flexibility",
//       description:
//         "You can adjust the price for your listing depending on demand, seasons, or special offers. Keep an eye on competitors and market trends to stay competitive.",
//     },
//     {
//       title: "Add Special Features",
//       description:
//         "Highlight unique features of your property like parking, pet-friendly spaces, or proximity to attractions. The more information you provide, the more likely guests will choose your listing.",
//     },
//     {
//       title: "Create Detailed Descriptions",
//       description:
//         "Make your description as detailed as possible to help guests get a clear idea of what to expect. Include amenities, room configurations, and nearby attractions.",
//     },
//     {
//       title: "Track Your Listings",
//       description:
//         "Stay on top of your listings by regularly reviewing your performance, managing feedback, and ensuring all details are up-to-date.",
//     },
//     {
//       title: "Update Listing Status",
//       description:
//         "Once a booking is confirmed, update the status of your listing to avoid overlapping reservations. This will help maintain a smooth guest experience.",
//     },
//     {
//       title: "Provide Accurate Information",
//       description:
//         "Always make sure that your listing details are accurate, as this helps avoid confusion and ensures a positive experience for both you and your guests.",
//     },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen max-h-fit">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.3 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         transition={{
//           duration: 1,
//           type: "spring",
//           stiffness: 40,
//         }}
//         className="relative h-screen pt-16 text-blue-500"
//       >
//         <div className="relative z-20 gap-y-7 max-w-[600px] mx-auto mt-10 flex flex-col p-8 rounded-xl shadow-md bg-opacity-30 bg-[#3f467a] shadow-[#4953a5] hover:shadow-slate-950 transition-all duration-200 hover:scale-95">
//           <div className="absolute w-3/4 h-4/5 bg-gradient-to-br from-[#6644ff] via-[#615fff] to-[#ff1f88] rounded-t-2xl rounded-br-3xl blur-[90px] opacity-25 bottom-0 right-0 translate-x-[50%] translate-y-[50%]"></div>
//           <h1 className="text-3xl font-semibold text-start text-transparent font-poppins bg-gradient-to-r from-[#6644ff] via-[#615fff] to-[#6644ff] drop-shadow-2xl bg-clip-text">
//             Tips for Managing Your Listings
//           </h1>
//           <p className="text-2xl font-medium tracking-wide text-transparent bg-gradient-to-br from-slate-400 to-slate-500 drop-shadow-2xl bg-clip-text text-start">
//             OWNER'S GUIDE
//           </p>

//           <div className="flex flex-col px-5 pb-10 gap-y-5 place-items-start justify-center py-5 bg-[#5460be] bg-opacity-25 rounded-xl shadow-md shadow-slate-950 w-full m-auto text-xl font-poppins font-medium text-[#aa96ff]">
//             {/* Mapping over the tips array to generate the content */}
//             {tips.map((tip, index) => (
//               <p key={index} className="text-base">
//                 <span>
//                   {" "}
//                   <strong>{tip.title}:</strong>{" "}
//                 </span>
//                 <span className="text-slate-400 font-imprima">
//                   {" "}
//                   {tip.description}{" "}
//                 </span>
//               </p>
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ListingsFacts;

import React from "react";
import { motion } from "framer-motion";

const ListingsFacts = () => {
  const tips = [
    {
      title: "Upload Multiple Photos",
      description:
        "When creating a listing, you can upload up to 5 images to showcase your property. Make sure to use high-quality photos to attract more potential guests!",
    },
    {
      title: "Select Available Dates",
      description:
        "You have the flexibility to choose a range of available dates for your listing. You can also add additional available dates later to accommodate more bookings.",
    },
    {
      title: "Manage Availability",
      description:
        "If your availability changes, don’t forget to update your listing to ensure your calendar is always accurate. This helps avoid double bookings and keeps potential guests informed.",
    },
    {
      title: "Respond to User Requests",
      description:
        "Timely responses are key! It's important to consistently provide feedback to guest requests. A quick response can increase your chances of confirming bookings and building a good relationship with users.",
    },
    {
      title: "Pricing Flexibility",
      description:
        "You can adjust the price for your listing depending on demand, seasons, or special offers. Keep an eye on competitors and market trends to stay competitive.",
    },
    {
      title: "Add Special Features",
      description:
        "Highlight unique features of your property like parking, pet-friendly spaces, or proximity to attractions. The more information you provide, the more likely guests will choose your listing.",
    },
    {
      title: "Create Detailed Descriptions",
      description:
        "Make your description as detailed as possible to help guests get a clear idea of what to expect. Include amenities, room configurations, and nearby attractions.",
    },
    {
      title: "Track Your Listings",
      description:
        "Stay on top of your listings by regularly reviewing your performance, managing feedback, and ensuring all details are up-to-date.",
    },
    {
      title: "Update Listing Status",
      description:
        "Once a booking is confirmed, update the status of your listing to avoid overlapping reservations. This will help maintain a smooth guest experience.",
    },
    {
      title: "Provide Accurate Information",
      description:
        "Always make sure that your listing details are accurate, as this helps avoid confusion and ensures a positive experience for both you and your guests.",
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen mb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 40,
        }}
        className="relative h-auto pt-16 text-blue-500"
      >
        <div className="relative z-20 gap-y-7 max-w-[600px] mx-auto mt-10 flex flex-col p-8 rounded-xl shadow-md bg-opacity-30 bg-[#3f467a] shadow-[#4953a5] hover:shadow-slate-950 transition-all duration-200 hover:scale-95">
          <div className="absolute w-3/4 h-4/5 bg-gradient-to-br from-[#6644ff] via-[#615fff] to-[#ff1f88] rounded-t-2xl rounded-br-3xl blur-[90px] opacity-25 bottom-0 right-0 translate-x-[50%] translate-y-[50%]"></div>
          <h1 className="text-3xl font-semibold text-start text-transparent font-poppins bg-gradient-to-r from-[#6644ff] via-[#615fff] to-[#6644ff] drop-shadow-2xl bg-clip-text">
            Tips for Managing Your Listings
          </h1>
          <p className="text-2xl font-medium tracking-wide text-transparent bg-gradient-to-br from-slate-400 to-slate-500 drop-shadow-2xl bg-clip-text text-start">
            OWNER'S GUIDE
          </p>

          <div className="flex flex-col px-5 pb-10 gap-y-5 place-items-start justify-center py-5 bg-[#5460be] bg-opacity-25 rounded-xl shadow-md shadow-slate-950 w-full m-auto text-xl font-poppins font-medium text-[#aa96ff]">
            {tips.map((tip, index) => (
              <p key={index} className="text-base">
                <span>
                  {" "}
                  <strong>{tip.title}:</strong>{" "}
                </span>
                <br />
                <span className="text-slate-400 font-imprima">
                  {" "}
                  &rarr; {tip.description}{" "}
                </span>
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ListingsFacts;
