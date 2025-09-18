import { log } from "console";
import { User } from "../Models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import fs from "fs";

export const test = (req, res) => {
  res.json({ message: "api is working" });
};

export const updateUser = async (req, res, next) => {
  // if (req.user.id !== req.params.id) {
  //   return next(errorHandler(403, "you are not allowed to update this user"));
  // }

  console.log(req.user.id);
  console.log(req.params.id);

  if (
    !req.user ||
    !req.user.id ||
    req.user.id.toString().replace(/^:/, "") !== req.params.id.toString()
  ) {
    return next(errorHandler(403, "you are not allowed to update this user"));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "password must be at least 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 4 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "username must be between 4 and 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "username must be in lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "username can only contain letters and numbers")
      );
    }
  }

  try {
    // Handle profile picture upload & convert to Base64
    let profilePictureBase64 = null;
    if (req.file) {
      const fileData = fs.readFileSync(req.file.path);
      profilePictureBase64 = fileData.toString("base64");
      fs.unlinkSync(req.file.path); // remove temp file
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: profilePictureBase64 || req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// export const deleteUser = async (req, res, next) => {
//   // if (req.user.id !== req.params.userId) {
//   //   return next(errorHandler(403, "you are not allowed to delete this user"));
//   // }

//   if (
//     !req.user ||
//     !req.user.id ||
//     req.user.id.toString().replace(/^:/, "") !== req.params.id.toString()
//   ) {
//     return next(errorHandler(403, "you are not allowed to update this user"));
//   }

//   try {
//     await User.findByIdAndDelete(req.params.userId);
//     res.status(200).json("User has been deleted");
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteUser = async (req, res, next) => {
  try {
    // Ensure the logged-in user matches the requested userId
    if (!req.user || !req.user.id) {
      return next(errorHandler(401, "Not authenticated"));
    }
    console.log(req.user.id.toString());
    console.log(req.params.userId.toString());

    if (req.user.id.toString() !== req.params.userId.toString()) {
      return next(errorHandler(403, "You are not allowed to delete this user"));
    }

    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};
