import express from "express";
import { doctorList } from "../controlers/doctorControler.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);

export default doctorRouter;
