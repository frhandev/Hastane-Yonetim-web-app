import express from "express";
import {
  cancelAppointment,
  completeAppointment,
  doctorList,
  getAllAppointments,
  loginDoctor,
} from "../controlers/doctorControler.js";
import authDoctor from "../middlwares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/doctor-appointment", authDoctor, getAllAppointments);
doctorRouter.post("/cancel-appointment", authDoctor, cancelAppointment);
doctorRouter.post("/complete-appointment", authDoctor, completeAppointment);

export default doctorRouter;
