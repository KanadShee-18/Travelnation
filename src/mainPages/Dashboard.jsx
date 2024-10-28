import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/dashboardpage/Sidebar";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="relative flex w-screen h-full min-h-screen pt-16 text-blue-500 dark:text-slate-700 bg-custom-linear dark:bg-dark-custom-radial">
      <Sidebar />

      <div className="w-full h-screen mx-auto">
        <div className="flex flex-col w-10/12 mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
