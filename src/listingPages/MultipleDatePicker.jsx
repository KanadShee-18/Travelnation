import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MultipleDatePicker = ({ register, setValue, getValues, errors }) => {
  const [selectedDates, setSelectedDates] = useState([null, null]);

  const handleDateChange = (dates) => {
    setSelectedDates(dates); // Update local state
    setValue("availableDates", dates); // Update form state
  };

  return (
    <div className="flex flex-col w-full gap-y-2">
      <label
        htmlFor="availableDates"
        className="text-[15px] tracking-wide text-slate-300 text-start"
      >
        Available Dates Range <sup className="text-pink-500">*</sup>
      </label>
      <div className="rounded-md w-fit  shadow-md focus-within:shadow-sm focus-within:shadow-[#595ce0] bg-[#464e7e] bg-opacity-35 shadow-slate-950">
        <DatePicker
          selected={selectedDates[0]} // First selected date
          onChange={handleDateChange} // Handle date change
          selectsRange // Enable range selection
          startDate={selectedDates[0]} // Set start date
          endDate={selectedDates[1]} // Set end date
          className="w-full text-sm p-3 rounded-md tracking-wide text-blue-300 text-[15px] placeholder-purple-400 bg-transparent outline-none placeholder-opacity-70 backdrop-blur-lg"
          placeholderText="Select Available Dates"
          dateFormat="yyyy/MM/dd"
          isClearable
        />
      </div>
      {errors.availableDates && (
        <span className="ml-2 text-pink-500">
          Available Dates are required.
        </span>
      )}
    </div>
  );
};

export default MultipleDatePicker;
