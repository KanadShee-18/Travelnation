// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// function PrivateRoute({ child }) {
//   const { token } = useSelector((state) => state.auth);

//   console.log("Token is:", token);

//   if (token !== null) {
//     return child;
//   } else {
//     return <Navigate to={"/login"} />;
//   }
// }

// export default PrivateRoute;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (token !== null) return children;
  else return <Navigate to="/login" />;
};

export default PrivateRoute;
