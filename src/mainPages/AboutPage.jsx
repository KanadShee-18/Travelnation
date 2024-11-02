import React from "react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10 h-[70vh]"></div>
      <div className="fixed top-0 w-full h-full opacity-100 ">
        <div className="absolute top-0 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
      <div className="relative w-11/12 mx-auto my-16 lg:w-10/12">
        {/* Page Heading with Gradient Text */}
        <div className="relative flex flex-col items-center justify-center w-full min-h-screen">
          <div className="w-[50%] h-[40%] top-[20%] opacity-35 right-0 bg-gradient-to-br from-purple-500 via-slate-500 to-blue-500 blur-[70px] absolute rounded-3xl"></div>
          <h1 className="mb-12 font-bold text-center text-transparent text-8xl bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
            Welcome to WanderLust
          </h1>
          <p className="mb-12 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#757ca1] to-[#878fb8]">
            Your Home Away From Home
          </p>

          {/* Introduction Section */}
          <section className="w-full lg:w-3/4">
            <p className="text-lg leading-relaxed text-gray-700 font-semibold text-center text-transparent font-poppins bg-gradient-to-r from-[#8a76e2] via-[#5150a8] to-[#6e61aa] drop-shadow-2xl bg-clip-text">
              WanderLust redefines the travel experience, bringing comfort,
              convenience, and a sense of community to every destination.
              Whether you’re seeking cozy cottages, luxury apartments, or exotic
              hideaways, WanderLust has handpicked stays tailored to every
              adventurer’s taste and needs. We believe that a trip should be
              more than just a getaway – it should be a journey that connects
              you with the world.
            </p>
          </section>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col z-[100] items-center justify-center min-h-screen gap-6 ">
          <section className="w-full mb-16 md:w-1/2">
            <h2 className="mb-6 text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 font-semibold text-center text-transparent font-inter bg-gradient-to-r from-[#7a6eac] via-[#5150a8] to-[#6e61aa] drop-shadow-2xl bg-clip-text">
              Our mission is to create a world where everyone feels at home, no
              matter where they travel. By connecting travelers with carefully
              curated stays and exceptional hosts, WanderLust transforms
              vacations into life-enriching experiences. We aim to foster a
              sustainable tourism environment, embracing local cultures and
              ensuring every stay leaves a positive impact.
            </p>
          </section>

          {/* Values Section */}
          <section className="w-full mb-16 md:w-1/2">
            <h2 className="mb-6 text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
              Our Values
            </h2>
            <ul className="pl-5 space-y-4 list-disc">
              <li className="text-lg leading-relaxed text-gray-700 font-semibold text-start text-transparent font-inter bg-gradient-to-r from-[#998ec9] via-[#a5a4db] to-[#b2acca] drop-shadow-2xl bg-clip-text">
                <span className="font-semibold text-blue-400">
                  Authenticity:
                </span>{" "}
                We celebrate the unique qualities of each destination,
                encouraging travelers to experience local culture authentically.
              </li>
              <li className="text-lg leading-relaxed text-gray-700 font-semibold text-start text-transparent font-inter bg-gradient-to-r from-[#998ec9] via-[#a5a4db] to-[#b2acca] drop-shadow-2xl bg-clip-text">
                <span className="font-semibold text-blue-400">Community:</span>{" "}
                By connecting guests and hosts, we foster a global community
                where travel inspires unity and friendship.
              </li>
              <li className="text-lg leading-relaxed text-gray-700 font-semibold text-start text-transparent font-inter bg-gradient-to-r from-[#998ec9] via-[#a5a4db] to-[#b2acca] drop-shadow-2xl bg-clip-text">
                <span className="font-semibold text-blue-400">
                  Sustainability:
                </span>{" "}
                WanderLust is dedicated to eco-friendly practices that benefit
                both travelers and the environments they explore.
              </li>
            </ul>
          </section>
        </div>

        {/* Why Choose Us Section */}
        <div className="flex flex-col z-[100] items-center justify-center w-full min-h-screen mx-auto md:w-10/12">
          <section className="flex flex-col mb-16 text-center gap-y-10">
            <h2 className="py-5 mb-6 text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
              Why Choose WanderLust?
            </h2>
            <p className="mb-4 text-lg  leading-relaxed text-gray-700 font-semibold text-center text-transparent font-poppins bg-gradient-to-r from-[#8a76e2] via-[#5150a8] to-[#6e61aa] drop-shadow-2xl bg-clip-text">
              Choosing WanderLust means embarking on a journey of endless
              possibilities. Each listing is vetted to provide unique
              experiences that allow guests to enjoy the best of their
              destination. From comfortable amenities to exciting local
              recommendations, we prioritize guest satisfaction in every detail.
            </p>
            <p className="text-lg leading-relaxed text-gray-300">
              With WanderLust, you’re not just booking a room – you’re stepping
              into a world of warmth, comfort, and discovery.
            </p>
          </section>
        </div>

        {/* Call to Action Section */}
        <div className="relative z-[100] flex items-center min-h-screen">
          <section className="flex flex-col items-center w-full mb-16 gap-y-5">
            <h2 className="w-full mb-6 text-6xl font-semibold text-center text-transparent bg-slate-300 bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-600">
              Ready to Embark on Your Next Adventure?
            </h2>
            <p className="mb-8 text-lg font-semibold text-center text-transparent font-poppins bg-gradient-to-r from-[#8a76e2] via-[#5150a8] to-[#6e61aa] drop-shadow-2xl bg-clip-text">
              Join WanderLust today and find your perfect stay! Whether you’re
              looking for a weekend escape or an extended retreat, our platform
              is designed to make finding your ideal home easy and enjoyable.
            </p>
            <button
              onClick={() => navigate("/accomodations")}
              className="px-6 py-3 font-semibold text-white transition duration-200 bg-indigo-600 rounded-md shadow-md cursor-pointer hover:bg-indigo-700"
            >
              Explore Our Listings
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
