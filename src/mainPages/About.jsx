import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import hotelImg from "../assets/explorePics/dashhotel.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "../component/common/Footer";

const About = () => {
  const targetRef = useRef(null);
  const targetRef1 = useRef(null);
  const targetRef2 = useRef(null);
  const targetRef3 = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: targetRef1,
    offset: ["start end", "end end"],
  });
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: targetRef2,
    offset: ["start end", "end end"],
  });
  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: targetRef3,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 0.1, 0]);
  const scale = useTransform(
    scrollYProgress1,
    [0, 0.5, 0.8, 1],
    [0.2, 0.8, 1, 1]
  );
  const scale2 = useTransform(scrollYProgress2, [0, 0.5], [0.2, 1]);
  const scale3 = useTransform(
    scrollYProgress3,
    [0, 0.5, 0.8, 1],
    [0.2, 0.8, 1, 1]
  );
  const opacity1 = useTransform(scrollYProgress2, [0.7, 0.8, 1], [1, 0.8, 0.5]);
  const opacity2 = useTransform(scrollYProgress2, [0.5, 1], [1, 1]);
  const translateX = useTransform(
    scrollYProgress2,
    [0, 0.4, 0.5],
    ["-100%", "-50%", "0%"]
  );

  const navigate = useNavigate();
  return (
    <>
      <motion.div>
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10 h-[70vh]"></div>
        <div className="fixed top-0 w-full h-full opacity-100 ">
          <img
            src={hotelImg}
            alt="Sign Up"
            className="object-cover w-full h-full "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950 to-slate-900 opacity-85"></div>
        </div>

        <div className="relative w-11/12 mx-auto my-16 lg:w-10/12">
          {/* Page Heading with Gradient Text */}
          <motion.div
            ref={targetRef}
            className="relative flex flex-col items-center justify-center w-full min-h-screen"
          >
            <motion.div style={{ opacity }} className="fixed">
              <div className="w-[50%] h-[40%] top-[20%] opacity-45 right-0 blur-[70px] bg-gradient-to-br from-purple-500 via-slate-500 to-blue-500 absolute rounded-3xl"></div>
              <h1 className="mb-12 text-4xl font-bold text-center text-transparent lg:text-8xl md:text-6xl bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
                Welcome to WanderLust
              </h1>
              <p className="mb-12 lg:text-4xl text-3xl my-6 font-bold text-center text-transparent font-edu bg-clip-text bg-gradient-to-r from-[#757ca1] to-[#878fb8]">
                Your Home Away From Home
              </p>

              {/* Introduction Section */}
              <section className="w-full mx-auto lg:w-3/4">
                <p className="md:text-lg text-sm mx-6 md:mx-0 leading-relaxed text-gray-700 font-imprima font-semibold text-center text-transparent bg-gradient-to-r from-[#8a76e2] via-[#5f5db9] to-[#6e61aa] drop-shadow-2xl bg-clip-text">
                  WanderLust redefines the travel experience, bringing comfort,
                  convenience, and a sense of community to every destination.
                  Whether you’re seeking cozy cottages, luxury apartments, or
                  exotic hideaways, WanderLust has handpicked stays tailored to
                  every adventurer’s taste and needs. We believe that a trip
                  should be more than just a getaway – it should be a journey
                  that connects you with the world.
                </p>
              </section>
            </motion.div>
          </motion.div>

          {/* Mission Section */}
          <div className="relative w-11/12 mx-auto my-16 lg:w-10/12">
            <motion.div
              ref={targetRef1}
              className="relative flex flex-col items-center justify-center w-full min-h-screen"
            >
              <motion.div
                style={{ scale }}
                className="sticky flex flex-col items-center justify-center md:flex-row "
              >
                <section className="relative w-full mb-16 md:w-1/2">
                  <h2 className="mb-6 text-2xl font-semibold text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                    Our Mission
                  </h2>
                  <p className="md:text-lg text-sm leading-relaxed text-gray-700 font-semibold text-start  text-transparent font-inter bg-gradient-to-r from-[#a293dd] via-[#7977df] to-[#9f91df] backdrop-blur-sm drop-shadow-2xl bg-clip-text">
                    Our mission is to create a world where everyone feels at
                    home, no matter where they travel. By connecting travelers
                    with carefully curated stays and exceptional hosts,
                    WanderLust transforms vacations into life-enriching
                    experiences. We aim to foster a sustainable tourism
                    environment, embracing local cultures and ensuring every
                    stay leaves a positive impact.
                  </p>
                  <div className="w-[70%] h-[60%] top-[20%] opacity-35 right-0 blur-[70px] bg-gradient-to-br from-purple-500 via-slate-500 to-blue-500 absolute rounded-3xl"></div>
                </section>

                {/* Values Section */}
                <section className="relative w-full mb-16 md:w-1/2">
                  <h2 className="mb-6 text-2xl font-semibold text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-600">
                    Our Values
                  </h2>
                  <ul className="pl-5 space-y-4 list-disc backdrop-blur-sm">
                    <li className="md:text-lg text-sm leading-relaxed text-gray-700 font-semibold text-start text-transparent font-inter bg-gradient-to-r from-[#998ec9] via-[#a5a4db] to-[#b2acca] drop-shadow-2xl bg-clip-text">
                      <span className="font-semibold text-blue-400">
                        Authenticity:
                      </span>{" "}
                      We celebrate the unique qualities of each destination,
                      encouraging travelers to experience local culture
                      authentically.
                    </li>
                    <li className="text-lg leading-relaxed text-gray-700 font-semibold text-start text-transparent font-inter bg-gradient-to-r from-[#998ec9] via-[#a5a4db] to-[#b2acca] drop-shadow-2xl bg-clip-text">
                      <span className="font-semibold text-blue-400">
                        Community:
                      </span>{" "}
                      By connecting guests and hosts, we foster a global
                      community where travel inspires unity and friendship.
                    </li>
                    <li className="text-lg leading-relaxed text-gray-700 font-semibold text-start text-transparent font-inter bg-gradient-to-r from-[#998ec9] via-[#a5a4db] to-[#b2acca] drop-shadow-2xl bg-clip-text">
                      <span className="font-semibold text-blue-400">
                        Sustainability:
                      </span>{" "}
                      WanderLust is dedicated to eco-friendly practices that
                      benefit both travelers and the environments they explore.
                    </li>
                  </ul>
                </section>
              </motion.div>
            </motion.div>
          </div>

          {/* Why Choose Us Section */}
          <motion.div
            ref={targetRef2}
            className="relative flex flex-col items-center justify-center w-full min-h-screen mx-auto md:w-10/12"
          >
            <motion.section
              style={{ x: translateX, opacity: opacity1, scale: scale2 }}
              className="flex flex-col min-h-screen mb-16 text-center gap-y-10"
            >
              <h2 className="py-5 mb-6 text-2xl font-semibold text-transparent lg:text-6xl md:text-4xl bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
                Why Choose WanderLust?
              </h2>
              <p className="mb-4 md:text-lg text-sm leading-relaxed text-gray-700 font-semibold text-center text-transparent font-poppins backdrop-blur-sm bg-gradient-to-r from-[#8a76e2] via-[#5150a8] to-[#6e61aa] drop-shadow-2xl bg-clip-text">
                Choosing WanderLust means embarking on a journey of endless
                possibilities. Each listing is vetted to provide unique
                experiences that allow guests to enjoy the best of their
                destination. From comfortable amenities to exciting local
                recommendations, we prioritize guest satisfaction in every
                detail.
              </p>
              <p className="text-sm leading-relaxed text-gray-300 md:text-lg">
                With WanderLust, you’re not just booking a room – you’re
                stepping into a world of warmth, comfort, and discovery.
              </p>
            </motion.section>
          </motion.div>

          {/* Call to Action Section */}
          <motion.div
            ref={targetRef3}
            className="relative flex items-center min-h-screen"
          >
            <motion.section
              style={{ scale: scale3, opacity: opacity2 }}
              className="flex flex-col items-center w-full mb-16 gap-y-5"
            >
              <h2 className="w-full mb-6 text-3xl font-semibold text-center text-transparent md:text-6xl bg-slate-300 bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-600">
                Ready to Embark on Your Next Adventure?
              </h2>
              <p className="mb-8 md:text-lg text-sm font-semibold text-center text-transparent font-poppins bg-gradient-to-r from-[#8a76e2] via-[#5150a8] to-[#6e61aa] drop-shadow-2xl bg-clip-text">
                Join WanderLust today and find your perfect stay! Whether you’re
                looking for a weekend escape or an extended retreat, our
                platform is designed to make finding your ideal home easy and
                enjoyable.
              </p>
              <button
                onClick={() => navigate("/accomodations")}
                className="px-6 py-3 font-semibold text-white transition duration-200 bg-indigo-600 rounded-md shadow-md cursor-pointer hover:bg-indigo-700"
              >
                Explore Our Listings
              </button>
            </motion.section>
          </motion.div>
        </div>
        <div className="relative w-full bg-slate-900">
          <Footer />
        </div>
      </motion.div>
    </>
  );
};

export default About;
