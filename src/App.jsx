import { lazy, Suspense, useState } from "react";
import "./App.css";
import Navbar from "./mainPages/Navbar";
import { Routes, Route } from "react-router-dom";
import Spinner from "./component/common/Spinner";
import OpenRoute from "./component/authroutes/OpenRoute";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpVerification from "./component/authroutes/OtpVerification";
import ForgetPassword from "./component/authroutes/ForgetPassword";
import UpdatePassword from "./component/authroutes/UpdatePassword";
// import Accomodations from "./mainPages/Accomodations";
import ThemeContextProvider from "./context/ThemeContextProvider";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import PrivateRoute from "./component/authroutes/PrivateRoute";
import OwnerDashboard from "./mainPages/OwnerDashboard";
import VisitorDashboard from "./mainPages/VisitorDashboard";
import Dashboard from "./mainPages/Dashboard";
import Profile from "./component/dashboardpage/Profile";
import OwnerListings from "./component/dashboardpage/OwnerListings";
import VisitorWishlist from "./component/dashboardpage/VisitorWishlist";
import CreateListing from "./component/dashboardpage/CreateListing";
import UserFeedBacks from "./component/dashboardpage/UserFeedBacks";
import UserStay from "./component/dashboardpage/UserStay";
import ContactUs from "./mainPages/ContactUs";
import ViewListing from "./listingPages/ViewListing";
import ModifyListing from "./listingPages/ModifyListing";
import Accomodations from "./mainPages/Accomodations";
import CategoryPage from "./component/categoryPages/CategoryPage";
import WishLists from "./component/categoryPages/WishLists";
import About from "./mainPages/About";

// Lazy Loading Components:
const Homepage = lazy(() => import("./mainPages/Homepage"));
const LogIn = lazy(() => import("./mainPages/LogIn"));
const SignUp = lazy(() => import("./mainPages/SignUp"));

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <ThemeContextProvider>
      <div className="relative flex flex-col w-screen min-h-screen bg-gradient-to-r from-blue-200 via-pink-100 to-purple-100 font-inter selection:bg-cyan-300">
        <Navbar />

        <Suspense
          fallback={
            <div className="w-full h-[70vh] grid place-items-center">
              <Spinner />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/accomodations" element={<Accomodations />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/signup"
              element={
                <OpenRoute>
                  <SignUp />
                </OpenRoute>
              }
            />
            <Route
              path="/login"
              element={
                <OpenRoute>
                  <LogIn />
                </OpenRoute>
              }
            />
            <Route
              path="/verify-otp"
              element={
                <OpenRoute>
                  <OtpVerification />
                </OpenRoute>
              }
            />
            <Route
              path="reset-password"
              element={
                <OpenRoute>
                  <ForgetPassword />
                </OpenRoute>
              }
            />
            <Route
              path="/update-password/:id"
              element={
                <OpenRoute>
                  <UpdatePassword />
                </OpenRoute>
              }
            />
            <Route path="/:categoryName/stays" element={<CategoryPage />} />
            <Route path="/listing-insider/:id" element={<ViewListing />} />
            <Route
              path="/dashboard" // Change the path to /dashboard/*
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="/dashboard/profile" element={<Profile />} />
              {user?.accountType === ACCOUNT_TYPE.OWNER && (
                <>
                  <Route path="listings" element={<OwnerListings />} />
                  <Route path="wishlists" element={<WishLists />} />
                  <Route path="add-listing" element={<CreateListing />} />
                  <Route
                    path="modify-listing/:id"
                    element={<ModifyListing />}
                  />
                  <Route path="user-feedbacks" element={<UserFeedBacks />} />
                </>
              )}
              {user?.accountType === ACCOUNT_TYPE.VISITOR && (
                <>
                  <Route path="wishlists" element={<WishLists />} />
                  <Route path="stay" element={<UserStay />} />
                  <Route path="contact" element={<ContactUs />} />
                </>
              )}
            </Route>{" "}
          </Routes>
        </Suspense>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          pauseOnHover={false}
          bodyClassName="custom-toast-body"
          transition={Slide}
          hideProgressBar={true}
          closeOnClick={true}
          className={"mb-10"}
          closeButton={false}
        />
      </div>
    </ThemeContextProvider>
  );
}

export default App;
