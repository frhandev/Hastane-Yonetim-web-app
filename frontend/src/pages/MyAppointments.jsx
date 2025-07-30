import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: { token },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handlePayment = () => {
    toast.error("Payment is disabled in demo");
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-300">
        My Appointments
      </p>
      <div>
        {appointments.map((appointment, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={appointment.doctorData.image}
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {appointment.doctorData.name}
              </p>
              <p>{appointment.doctorData.speciality}</p>
              <p className=" text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs ">{appointment.doctorData.address.line1}</p>
              <p className="text-xs ">{appointment.doctorData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:{" "}
                </span>
                {appointment.slotDate} | {appointment.slotTime}
              </p>
            </div>
            <div></div>
            <div className=" flex flex-col gap-2 justify-end">
              {!appointment.cancelled && (
                <button
                  onClick={handlePayment}
                  className="cursor-pointer text-sm text-stone-500 text-center sm:max-w-48 py-2 w-100 border border-gray-300 rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
              )}
              {!appointment.cancelled && (
                <button
                  onClick={() => cancelAppointment(appointment._id)}
                  className="cursor-pointer text-sm text-stone-500 text-center sm:max-w-48 py-2 w-100 border border-gray-300 rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}
              {appointment.cancelled && (
                <button className="cursor-pointer text-sm text-red-600 text-center sm:max-w-48 py-2 border border-red-600 rounded w-100 transition-all duration-300">
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
