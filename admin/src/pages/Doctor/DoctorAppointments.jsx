import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorAppointments = () => {
  const { backendUrl, dToken } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const getDoctorAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/doctor-appointment",
        {
          headers: { dToken },
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

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
    if (dToken) getDoctorAppointments();
  }, [dToken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border border-gray-300 text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll ">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300">
          <p>#</p>
          <p>patient</p>
          <p>payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((app, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-300 hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={app.userData.image}
                alt=""
              />
              <p>{app.userData.name}</p>
            </div>
            <p className="text-xs inline border border-primary px-2 rounded-full w-fit">
              {app.payment ? "Online" : "Cash"}
            </p>
            <p className=" max-sm:hidden">{calculateAge(app.userData.dob)}</p>
            <p>
              {app.slotDate}, {app.slotTime}
            </p>

            <p>${app.doctorData.fees}</p>
            {app.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : app.isCompleted ? (
              <p className="text-green-400 text-xs font-medium">Completed</p>
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
  );
};

export default DoctorAppointments;
