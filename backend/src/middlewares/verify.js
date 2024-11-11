import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";
import { User } from "../models/user.model.js";

const verifyUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      throw new Error("Token is not found");
    }
    const decode = await jwt.verify(token, JWT_SECRET);
    if (!decode) {
      throw new Error("Invalid token");
    }

    const user = await User.findById(decode.id).select("-password");
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new Error(error.message);
  }
};

export { verifyUser };
