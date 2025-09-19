import dotenv from "dotenv";
import express from "express";

import mongoose from "mongoose";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import signUpRoute from "./routes/auth.route.js";
import signInRoute from "./routes/auth.route.js";
import google from "./routes/auth.route.js";

import cookieParser from "cookie-parser";
import updateUser from "./routes/user.route.js";
import deleteUser from "./routes/user.route.js";
import cors from "cors";
dotenv.config({ path: "./.env" });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// import path from "path";
app.use(
  cors({
    origin: "http://localhost:5173", // <-- set to your frontend origin (include port)
    credentials: true,
  })
);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("server is running on port 3000 !!");
});

// routes

// app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/auth", signUpRoute);
app.use("/api/auth", signInRoute);
app.use("/api/auth", google);
app.use("/api/user", updateUser);
app.use("/api/user", deleteUser);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
