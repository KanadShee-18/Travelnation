import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/dashboardpage/Sidebar";
import { useSelector } from "react-redux";
import hotelImg from "../assets/explorePics/dashhotel.jpg";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="relative flex w-screen h-full min-h-screen pt-16 text-blue-500 dark:text-slate-700 bg-custom-linear dark:bg-dark-custom-radial">
      <div className="fixed inset-0 max-w-full opacity-65">
        <img
          src={hotelImg}
          alt="Sign Up"
          className="object-cover w-full h-full "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950 to-slate-900 opacity-85"></div>
      </div>
      <Sidebar />

      <div className="w-full min-h-screen mx-auto">
        <div className="flex flex-col w-10/12 mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
