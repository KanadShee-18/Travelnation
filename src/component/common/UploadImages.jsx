// import React, { useEffect, useRef, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { toast } from "react-toastify";

// const UploadImages = ({
//   name,
//   label,
//   register,
//   setValue,
//   errors,
//   viewData = null,
//   editData = null,
// }) => {
//   const [selectedFiles, setSelectedFiles] = useState(null);
//   const [previewSources, setPreviewSources] = useState(
//     viewData || editData || []
//   );

//   const inputRef = useRef(null);

//   const previewFile = (file) => {
//     const objectUrl = URL.createObjectURL(file);
//     return objectUrl;
//   };

//   const onDrop = (acceptedImages) => {
//     const newFilesArray = [...selectedFiles, ...acceptedImages];
//     // setSelectedFiles(newFilesArray);

//     if (newFilesArray.length <= 5) {
//       setSelectedFiles(newFilesArray);

//       const newPreviewSources = acceptedImages.map((file) => previewFile(file));
//       setPreviewSources((prev) => [...prev, ...newPreviewSources]);

//       setValue(name, newFilesArray);
//     } else {
//       toast("You are allowed to select only 5 images.");

//       const limitedFilesArray = newFilesArray.slice(0, 5);
//       setSelectedFiles(limitedFilesArray);

//       const newPreviewSources = limitedFilesArray.map((file) =>
//         previewFile(file)
//       );
//       setPreviewSources((prev) => [...prev, ...newPreviewSources]);

//       setValue(name, limitedFilesArray);
//     }

//     const newPreviewSources = acceptedImages.map((file) => previewFile(file));
//     setPreviewSources((prev) => [...prev, ...newPreviewSources]);

//     setValue(name, newFilesArray);
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: { "image/*": [".jpeg", ".jpg", ".png"] },
//     onDrop,
//   });

//   useEffect(() => {
//     register(name, { required: true });
//   }, [register, name]);

//   useEffect(() => {
//     if (viewData || editData) {
//       const links = viewData || editData;
//       const imageLinks = Array.isArray(links) ? links : [links];

//       setPreviewSources((prev) => [...prev, ...imageLinks]);
//     }
//   }, [viewData, editData]);

//   useEffect(() => {
//     return () => {
//       previewSources.forEach((src) => URL.revokeObjectURL(src));
//     };
//   }, [previewSources]);

//   return (
//     <div className="flex flex-col my-2 gap-y-2">
//       <label htmlFor={name} className="text-slate-300">
//         {label} <sup className="text-pink-500">*</sup>
//       </label>
//       <div
//         className={`${isDragActive ? "bg-[#383e5e]" : "bg-[#464e7e]"}
//             flex min-h-[200px] cursor-pointer items-center rounded-md
//             shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0]  bg-opacity-35 shadow-slate-950
//         `}
//         {...getRootProps()}
//       >
//         <input {...getInputProps()} ref={inputRef}  className="bg-slate-200"/>
//         {previewSources && previewSources.length > 0 ? (
//           <div className="flex flex-col items-center p-2 rounded-lg bg-slate-800">
//             {previewSources.map((image, index) => (
//               <img
//                 key={index} // Ensure each image has a unique key
//                 src={image}
//                 alt={`Preview ${index + 1}`} // Descriptive alt text for accessibility
//                 className="min-w-[50px] w-[120px] aspect-square"
//               />
//             ))}
//           </div>
//         ) : (
//           <p className=" w-full text-center text-sm text-blue-300">
//             No images selected. Drag and drop images here!
//           </p> // Feedback when no images are selected
//         )}
//       </div>
//       {errors[name] && (
//         <span className="ml-2 text-pink-500 text-xs tracking-wider">
//           {label} is required.
//         </span>
//       )}
//     </div>
//   );
// };

// export default UploadImages;


import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const UploadImages = ({
  name,
  label,
  register,
  setValue,
  errors,
  viewData = null,
  editData = null,
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewSources, setPreviewSources] = useState(viewData || editData || []);

  const inputRef = useRef(null);

  const previewFile = (file) => {
    const objectUrl = URL.createObjectURL(file);
    return objectUrl;
  };

  const onDrop = (acceptedImages) => {
    const newFilesArray = [...selectedFiles, ...acceptedImages];
    
    if (newFilesArray.length <= 5) {
      setSelectedFiles(newFilesArray);

      const newPreviewSources = acceptedImages.map((file) => previewFile(file));
      setPreviewSources((prev) => [...prev, ...newPreviewSources]);

      setValue(name, newFilesArray);
    } else {
      toast("You are allowed to select only 5 images.");
      
      const limitedFilesArray = newFilesArray.slice(0, 5);
      setSelectedFiles(limitedFilesArray);

      const newPreviewSources = limitedFilesArray.map((file) => previewFile(file));
      setPreviewSources(newPreviewSources); // Resetting to the new limited preview sources

      setValue(name, limitedFilesArray);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop,
  });

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    if (viewData || editData) {
      const links = viewData || editData;
      const imageLinks = Array.isArray(links) ? links : [links];

      setPreviewSources((prev) => [...prev, ...imageLinks]);
    }
  }, [viewData, editData]);

  useEffect(() => {
    return () => {
      previewSources.forEach((src) => URL.revokeObjectURL(src));
    };
  }, [previewSources]);

  return (
    <div className="flex flex-col my-2 gap-y-2">
      <label htmlFor={name} className="text-slate-300">
        {label} <sup className="text-pink-500">*</sup>
      </label>
      <div
        className={`${isDragActive ? "bg-[#383e5e]" : "bg-[#464e7e]"}
            flex min-h-[200px] cursor-pointer items-center rounded-md
            shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0]  bg-opacity-35 shadow-slate-950
        `}
        {...getRootProps()} // Spread root props on this div
      >
        <input {...getInputProps()} ref={inputRef} className="hidden" /> {/* Hide the input, but keep it accessible */}

        {previewSources && previewSources.length > 0 ? (
          <div className="flex flex-col items-center p-2 rounded-lg bg-slate-800">
            {previewSources.map((image, index) => (
              <img
                key={index} // Ensure each image has a unique key
                src={image}
                alt={`Preview ${index + 1}`} // Descriptive alt text for accessibility
                className="min-w-[50px] w-[120px] aspect-square"
              />
            ))}
          </div>
        ) : (
          <p className="w-full text-center text-sm text-blue-300">
            No images selected. Drag and drop images here!
          </p> // Feedback when no images are selected
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-pink-500 text-xs tracking-wider">
          {label} is required.
        </span>
      )}
    </div>
  );
};

export default UploadImages;
