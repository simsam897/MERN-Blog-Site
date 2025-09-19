// import jwt from "jsonwebtoken";
// import { errorHandler } from "./error.js ";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;

//   if (!token) {
//     return next(errorHandler(401, "unauthorized"));
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return next(errorHandler(401, "unauthorized"));
//     }
//     req.user = { id: decoded.id }; // ✅ always id
//     next();
//   });
// };
// import jwt from "jsonwebtoken";
// import { errorHandler } from "./error.js";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token; // or req.headers.authorization if you're using headers
//   if (!token) return next(errorHandler(401, "No token, authorization denied"));

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return next(errorHandler(403, "Invalid token"));
//     req.user = user; // very important
//     next();
//   });
// };

import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }

    req.user = { id: decoded.id }; // ✅ always id
    next();
  });
};
