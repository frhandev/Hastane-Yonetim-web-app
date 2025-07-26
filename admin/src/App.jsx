/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Login from "./pages/login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";

const App = () => {
  const { aToken } = useContext(AdminContext);
  return aToken ? (
    <div className="bg-[#F8f9fd]">
      <ToastContainer />
      <Navbar />
      <div>
        <SideBar />
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
