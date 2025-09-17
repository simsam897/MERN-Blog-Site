// import jwt from "jsonwebtoken";
// import { User } from "../Models/user.model.js";

// const verifyToken = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("access_token")) {
//       return res
//         .status(401)
//         .json({ success: false, message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User not found" });
//     }

//     req.user = user; // attach user to req
//     next();
//   } catch (err) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Invalid or expired token" });
//   }
// };

// export default verifyToken;

import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token =
    req.cookies.access_token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  console.log(token);
  if (!token) {
    return next(errorHandler(401, "unauthorized - no token provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(errorHandler(401, "unauthorized - invalid token"));
    }

    // ✅ handle both { userId } and { id }
    const userId = decoded.id || decoded.userId;

    if (!userId) {
      return next(errorHandler(401, "unauthorized - token missing user id"));
    }

    // always attach as string
    // req.user = { id: userId.toString() };
    req.user = { id: userId.toString().replace(/^:/, "") };
    next();
  });
};
