import React from "react";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../utils/constants";
import OwnerSidebarLinks from "./OwnerSidebarLinks";
import VisitorSidebarLinks from "./VisitorSidebarLinks";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);

  console.log(user.accountType);

  return (
    <div className="min-w-[220px] max-w-[300px] p-4 text-white min-h-screen dark:bg-opacity-75 dark:bg-[#303e63]">
      {user?.accountType === ACCOUNT_TYPE.OWNER && <OwnerSidebarLinks />}

      {user?.accountType === ACCOUNT_TYPE.VISITOR && <VisitorSidebarLinks />}
    </div>
  );
};

export default Sidebar;
