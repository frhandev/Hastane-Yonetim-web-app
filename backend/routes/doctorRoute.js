import express from "express";
import {
  cancelAppointment,
  completeAppointment,
  doctorDashboard,
  doctorList,
  getAllAppointments,
  getProfile,
  loginDoctor,
  updateProfile,
} from "../controlers/doctorControler.js";
import authDoctor from "../middlwares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/doctor-appointment", authDoctor, getAllAppointments);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, getProfile);
doctorRouter.get("/update-profile", authDoctor, updateProfile);
doctorRouter.post("/cancel-appointment", authDoctor, cancelAppointment);
doctorRouter.post("/complete-appointment", authDoctor, completeAppointment);

export default doctorRouter;
