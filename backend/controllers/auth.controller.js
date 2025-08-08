import { User } from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  // console.log(req.body);

  // first requesting data
  // error status code and message
  // create the newuser
  // save the user in the database
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "all fields are required"));
  }
  const hashedPasword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username: username,
    email: email,
    password: hashedPasword,
  });

  try {
    await newUser.save();
    res.json({ message: "signup succesfull" });
  } catch (error) {
    next(error);
  }
};
