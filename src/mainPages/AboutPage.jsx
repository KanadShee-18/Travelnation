import React from "react";

const AboutPage = () => {
  return (
    <div className="w-10/12 mx-auto my-16 lg:w-11/12">
      {/* Page Heading with Gradient Text */}
      <h1 className="mb-12 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
        Welcome to WanderLust - Your Home Away From Home
      </h1>

      {/* Introduction Section */}
      <section className="mb-16">
        <p className="text-lg leading-relaxed text-gray-700">
          WanderLust redefines the travel experience, bringing comfort,
          convenience, and a sense of community to every destination. Whether
          you’re seeking cozy cottages, luxury apartments, or exotic hideaways,
          WanderLust has handpicked stays tailored to every adventurer’s taste
          and needs. We believe that a trip should be more than just a getaway –
          it should be a journey that connects you with the world.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
          Our Mission
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Our mission is to create a world where everyone feels at home, no
          matter where they travel. By connecting travelers with carefully
          curated stays and exceptional hosts, WanderLust transforms vacations
          into life-enriching experiences. We aim to foster a sustainable
          tourism environment, embracing local cultures and ensuring every stay
          leaves a positive impact.
        </p>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
          Our Values
        </h2>
        <ul className="pl-5 space-y-4 list-disc">
          <li className="text-lg leading-relaxed text-gray-700">
            <span className="font-semibold text-gray-900">Authenticity:</span>{" "}
            We celebrate the unique qualities of each destination, encouraging
            travelers to experience local culture authentically.
          </li>
          <li className="text-lg leading-relaxed text-gray-700">
            <span className="font-semibold text-gray-900">Community:</span> By
            connecting guests and hosts, we foster a global community where
            travel inspires unity and friendship.
          </li>
          <li className="text-lg leading-relaxed text-gray-700">
            <span className="font-semibold text-gray-900">Sustainability:</span>{" "}
            WanderLust is dedicated to eco-friendly practices that benefit both
            travelers and the environments they explore.
          </li>
        </ul>
      </section>

      {/* Why Choose Us Section */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
          Why Choose WanderLust?
        </h2>
        <p className="mb-4 text-lg leading-relaxed text-gray-700">
          Choosing WanderLust means embarking on a journey of endless
          possibilities. Each listing is vetted to provide unique experiences
          that allow guests to enjoy the best of their destination. From
          comfortable amenities to exciting local recommendations, we prioritize
          guest satisfaction in every detail.
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          With WanderLust, you’re not just booking a room – you’re stepping into
          a world of warmth, comfort, and discovery.
        </p>
      </section>

      {/* Call to Action Section */}
      <section className="mb-16 text-center">
        <h2 className="mb-6 text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-600">
          Ready to Embark on Your Next Adventure?
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-gray-700">
          Join WanderLust today and find your perfect stay! Whether you’re
          looking for a weekend escape or an extended retreat, our platform is
          designed to make finding your ideal home easy and enjoyable.
        </p>
        <button className="px-6 py-3 font-semibold text-white transition duration-200 bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700">
          Explore Our Listings
        </button>
      </section>
    </div>
  );
};

export default AboutPage;
