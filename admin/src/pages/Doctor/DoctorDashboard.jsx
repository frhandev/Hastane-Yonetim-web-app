import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

export const DoctorDashboard = () => {
  const { dToken, backendUrl, getDashboard, dashData, getDoctorAppointments } =
    useContext(DoctorContext);

  const cancelAppointment = async (appId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId: appId },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId: appId },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) getDashboard();
  }, [dToken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 rounded min-w-52 border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className=" w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                ${dashData.earnings}
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
                {dashData.patients}
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
                    src={app.userData.image}
                    alt=""
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {app.userData.name}
                    </p>
                    <p className="text-gray-600">{app.slotDate}</p>
                  </div>
                  {app.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : app.isCompleted ? (
                    <p className="text-green-400 text-xs font-medium">
                      Completed
                    </p>
                  ) : (
                    <div className=" flex">
                      <img
                        onClick={() => cancelAppointment(app._id)}
                        className="cursor-pointer w-10"
                        src={assets.cancel_icon}
                        alt=""
                      />
                      <img
                        onClick={() => completeAppointment(app._id)}
                        className="cursor-pointer w-10"
                        src={assets.tick_icon}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
};
