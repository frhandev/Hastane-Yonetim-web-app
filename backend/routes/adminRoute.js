import express from "express";
import {
  addDoctor,
  adminDashboard,
  allDoctors,
  appointmentsAdmin,
  cancelAppointment,
  loginAdmin,
} from "../controlers/adminControler.js";
import upload from "../middlwares/multer.js";
import authAdmin from "../middlwares/authAdmin.js";
import { changeAvailability } from "../controlers/doctorControler.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, cancelAppointment);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
