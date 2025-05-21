import express from "express";
import { addDoctor } from "../controlers/adminControler.js";
import upload from "../middlwares/multer.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", upload.single("image"), addDoctor);

export default adminRouter;
