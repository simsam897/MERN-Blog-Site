import express from "express";
import { log } from "node:console";

const app = express();

app.listen(3000, () => {
  log("server is running on port 3000 !!");
});
