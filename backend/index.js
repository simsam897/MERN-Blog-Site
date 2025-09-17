import dotenv from "dotenv";
import express from "express";

import mongoose from "mongoose";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import signRoute from "./routes/auth.route.js";
import google from "./routes/auth.route.js";

import cookieParser from "cookie-parser";
import updateUser from "./routes/user.route.js";
dotenv.config({ path: "./.env" });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// import path from "path";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("server is running on port 3000 !!");
});

// routes

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("api/auth", signRoute);
app.use("/api/auth", google);
app.use("/api/auth", updateUser);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
