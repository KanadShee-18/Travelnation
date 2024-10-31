import React, { useState } from "react";
import { MdClose } from "react-icons/md";
const ImageGallery = ({ images }) => {
  const [enlargedImage, setEnlargedImage] = useState(null); // State for the enlarged image
  const imageCount = images.length; // Total number of images

  const handleImageClick = (image) => {
    // Toggle enlarged image or reset to null
    setEnlargedImage(enlargedImage === image ? null : image);
  };

  return (
    <div className="relative w-full h-full">
      <div className="grid w-full h-full bg-slate-500">
        {/* Layout for 1 image */}
        {imageCount === 1 && (
          <div className="w-full h-[450px] col-span-1">
            <img
              src={images[0]}
              alt={`Image 1`}
              className="object-cover w-full h-full border-[1px] border-slate-300 cursor-pointer"
              onClick={() => handleImageClick(images[0])}
            />
          </div>
        )}

        {/* Layout for 2 images */}
        {imageCount === 2 && (
          <div className="grid w-full h-full grid-cols-2">
            {images.map((image, index) => (
              <div key={index} className="h-full col-span-1">
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-full border-[1px] border-slate-300 cursor-pointer"
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Layout for 3 images */}
        {imageCount === 3 && (
          <div className="grid w-full h-full grid-cols-2">
            <div className="h-[450px] col-span-1">
              <img
                src={images[0]}
                alt={`Image 1`}
                className="object-cover w-full h-full border-[1px] border-slate-300 cursor-pointer"
                onClick={() => handleImageClick(images[0])}
              />
            </div>
            <div className="grid h-[450px] col-span-1 grid-rows-2 ">
              {images.slice(1).map((img, index) => (
                <div key={index} className="h-full">
                  <img
                    src={img}
                    alt={`Image ${index + 2}`}
                    className="object-cover w-full h-full border-[1px] border-slate-300 cursor-pointer"
                    onClick={() => handleImageClick(img)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Layout for 4 images */}
        {imageCount === 4 && (
          <div className="grid w-full h-full grid-cols-2">
            <div className="h-full col-span-1">
              <img
                src={images[0]}
                alt={`Image 1`}
                className="object-cover w-full h-full border-[1px] border-slate-300 cursor-pointer"
                onClick={() => handleImageClick(images[0])}
              />
            </div>
            <div className="grid h-full grid-cols-3 col-span-1 ">
              {images.slice(1).map((img, index) => (
                <div key={index} className="h-full">
                  <img
                    src={img}
                    alt={`Image ${index + 2}`}
                    className="object-cover w-full h-full border-[1px] border-slate-300 cursor-pointer"
                    onClick={() => handleImageClick(img)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Layout for 5 images */}
        {imageCount === 5 && (
          <div className="grid w-full h-full grid-cols-3 ">
            <div className="h-full col-span-1">
              <img
                src={images[0]}
                alt={`Image 1`}
                className="object-cover w-full h-full border-[1px] border-slate-300 cursor-pointer"
                onClick={() => handleImageClick(images[0])}
              />
            </div>
            <div className="grid h-full col-span-1 grid-rows-2 ">
              {images.slice(1, 3).map((img, index) => (
                <div key={index} className="h-full">
                  <img
                    src={img}
                    alt={`Image ${index + 2}`}
                    className="object-cover w-full h-full border-[1px] border-slate-300 cursor-pointer"
                    onClick={() => handleImageClick(img)}
                  />
                </div>
              ))}
            </div>
            <div className="grid h-full col-span-1 grid-rows-2 ">
              {images.slice(3).map((img, index) => (
                <div key={index} className="h-full">
                  <img
                    src={img}
                    alt={`Image ${index + 4}`}
                    className="object-cover w-full h-full border-[1px] border-slate-300 cursor-pointer"
                    onClick={() => handleImageClick(img)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {enlargedImage && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative w-[90%] h-[90%] bg-[#48588d] shadow-md shadow-slate-950">
            <img
              src={enlargedImage}
              alt="Enlarged View"
              className="object-cover w-full h-full"
            />
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute p-1 text-xl rounded-full text-slate-900 bg-slate-200 bg-opacity-70 top-2 right-2 hover:bg-opacity-85"
            >
              <MdClose />
            </button>
          </div>
        </div>
      )}

      <div className="absolute p-2 text-xs tracking-wider rounded right-1 bottom-1 text-slate-200 bg-slate-700 bg-opacity-60 backdrop-blur-md">
        Click on Any Image to Get a Expand View
      </div>
    </div>
  );
};

export default ImageGallery;
