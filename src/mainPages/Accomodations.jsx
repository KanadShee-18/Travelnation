import React from "react";
import { useSelector } from "react-redux";

const Accomodations = () => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className="w-screen h-full min-h-screen pt-16 text-blue-500 accomodation
    dark:bg-[#0f172a]
    "
    ></div>
  );
};

export default Accomodations;
