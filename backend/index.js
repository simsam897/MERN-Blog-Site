import dotenv from "dotenv";
import express from "express";

import mongoose from "mongoose";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
dotenv.config({ path: "./.env" });
const app = express();
app.use(express.json());
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
