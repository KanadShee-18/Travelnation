import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { FiUploadCloud } from "react-icons/fi";

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
  const [previewSources, setPreviewSources] = useState(
    viewData || editData || []
  );

  const onDrop = (acceptedImages) => {
    const newFilesArray = [...selectedFiles, ...acceptedImages];

    if (newFilesArray.length <= 5) {
      setSelectedFiles(newFilesArray);

      const newPreviewSources = acceptedImages.map((file) => previewFile(file));
      setPreviewSources((prev) => [...prev, ...newPreviewSources]);

      setValue(name, [...newFilesArray]);
    } else {
      toast("You are allowed to select only 5 images.");
      const limitedFilesArray = newFilesArray.slice(0, 5);
      setSelectedFiles(limitedFilesArray);

      const newPreviewSources = limitedFilesArray.map((file) =>
        previewFile(file)
      );
      setPreviewSources(newPreviewSources);

      setValue(name, [...limitedFilesArray]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop,
  });

  const previewFile = (file) => {
    const objectUrl = URL.createObjectURL(file);
    return objectUrl;
  };

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
    <div className="flex flex-col w-full gap-y-2">
      <label htmlFor={name} className="text-slate-300 text-[15px]">
        {label} <sup className="text-pink-500">*</sup>
      </label>
      <div
        className={`${isDragActive ? "bg-[#383e5e]" : "bg-[#464e7e]"}
            flex min-h-[200px] cursor-pointer items-center rounded-md
            shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-opacity-35 shadow-slate-950
        `}
        {...getRootProps()}
      >
        <input {...getInputProps()} style={{ display: "none" }} />
        {previewSources && previewSources.length > 0 ? (
          <div className="relative flex flex-col items-center w-full px-2 py-6 mx-2 rounded-lg bg-slate-800">
            <div className="flex flex-wrap justify-around w-full">
              {previewSources.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="min-w-[50px] m-2 shadow-md rounded-lg shadow-slate-700 w-[120px] aspect-square"
                />
              ))}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setPreviewSources([]);
                setSelectedFiles([]);
                setValue(name, []);
              }}
              className="absolute px-2 py-1 text-sm rounded-lg shadow-md -bottom-8 bg-slate-800 shadow-slate-950"
            >
              UNDO
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full p-6">
            <div className="grid rounded-full aspect-square w-14 place-items-center bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-blue-400" />
            </div>
            <p className="mt-2 text-sm tracking-wider text-center text-richblack-200">
              Drag and drop Images <br />
              <span className="font-semibold text-blue-200">Browse</span> one or
              more Images
            </p>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wider text-pink-500">
          {label} is required.
        </span>
      )}
    </div>
  );
};

export default UploadImages;
