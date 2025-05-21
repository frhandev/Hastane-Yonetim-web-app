import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("YES ");
});

app.listen(port, () => {
  console.log("Server Started", port);
});
