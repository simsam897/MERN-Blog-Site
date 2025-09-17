import express from "express";
import { test } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { upload } from "../middlewares/multer.middleware.js";
import { updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.put(
  "/update/:id",
  verifyToken,
  upload.single("profilePicture"),
  updateUser
);

export default router;
