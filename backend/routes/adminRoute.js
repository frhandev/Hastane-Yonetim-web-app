import express from "express";
import { addDoctor, loginAdmin } from "../controlers/adminControler.js";
import upload from "../middlwares/multer.js";
import authAdmin from "../middlwares/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);

export default adminRouter;
