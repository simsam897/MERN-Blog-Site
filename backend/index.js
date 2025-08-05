import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import path from "path";
dotenv.config({ path: "./.env" });
const app = express();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("server is running on port 3000 !!");
});
