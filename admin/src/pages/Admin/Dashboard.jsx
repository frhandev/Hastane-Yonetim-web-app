import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { aToken, backendUrl, getAllAppointments, getDashboard, dashData } =
    useContext(AdminContext);

  const cancelAppointment = async (appId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId: appId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (aToken) {
      getDashboard();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 rounded min-w-52 border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className=" w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 rounded min-w-52 border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className=" w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 rounded min-w-52 border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className=" w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.users}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className=" flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-300">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-0 border-gray-300">
            {Array.isArray(dashData.latestAppointments) &&
              dashData.latestAppointments.map((app, index) => (
                <div
                  className=" flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                  key={index}
                >
                  <img
                    className=" rounded-full w-10"
                    src={app.doctorData.image}
                    alt=""
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {app.doctorData.name}
                    </p>
                    <p className="text-gray-600">{app.slotDate}</p>
                  </div>
                  {app.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(app._id)}
                      className="cursor-pointer w-10"
                      src={assets.cancel_icon}
                      alt=""
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
