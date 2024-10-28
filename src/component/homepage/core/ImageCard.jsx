import React from "react";

const ImageCard = ({ img }) => {
  return (
    <div className="inline-block mx-1 transition-all duration-200 transform md:mx-4 hover:scale-95">
      <img
        src={img}
        loading="lazy"
        alt="Image"
        className="slideImg object-cover lg:w-[300px] md:w-[250px] min-w-[170px] aspect-square rounded-xl transform transition-all duration-200 hover:opacity-80 hover:cursor-pointer"
      />
      <div className="absolute bottom-0 rounded-b-xl z-30 h-[20%] w-full bg-gradient-to-t from-[#172236] to-transparent"></div>
    </div>
  );
};

export default ImageCard;
