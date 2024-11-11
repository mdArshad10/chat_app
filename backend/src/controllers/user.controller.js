import { User } from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import { fileUploadInCloudinary } from "../utils/cloudinary.js";

const cookieOptions = {
  expires: new Date(Date.now() + 60 * 60 * 1000),
  secure: true,
  httpOnly: true,
  sameSite: "strict",
};

// @DESC: create a new user
// @METHOD: POST   /api/v1/user/new
// @ACCESS: public
const createUser = async (req, res, next) => {
  try {
    const { name, username, bio, password } = req.body;

    if (!req.files?.filename && !req.files?.path) {
      // file is not upload from frontend
    }
    const fileUrl = req.files?.path;
    const result = await fileUploadInCloudinary(fileUrl);
    if (!result) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "file upload failed" });
    }
    const avatar = {
      public_id: result.public_id,
      url: result.url,
    };
    const user = new User(name, username, password, bio, avatar);
    await user.save();

    const { password: hashedPassword, ...rest } = user._doc;
    const token = await user.generateAccessToken();
    res.status(StatusCodes.CREATED).cookie("token", token, cookieOptions).json({
      success: true,
      message: "User created successfully",
      data: rest,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal server error" });
  }
};

// @DESC: login the user
// @METHOD: POST   /api/v1/user/login
// @ACCESS: public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordMatch = await user.isMatchPassword(password);
    if (!isPasswordMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: "Invalid credentials" });
    }
    const { password: hashedPassword, ...rest } = user._doc;
    const token = await user.generateAccessToken();
    res.status(StatusCodes.OK).cookie("token", token, cookieOptions).json({
      success: true,
      message: "User logged in successfully",
      data: rest,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal server error" });
  }
};

// @DESC: logout the user
// @METHOD: GET   /api/v1/user/logout
// @ACCESS: private
const logoutUser = async (req, res, next) => {
  try {
    const user = req.user;
    res.clearCookie("token");

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    //
  }
};

// @DESC: Get all the users
// @METHOD: GET /api/v1/users
// @ACCESS: private
const getAllUser = async (req, res, next) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: req.query.search, $options: "i" },
            { email: req.query.search, $options: "i" },
          ],
        }
      : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    return res.status(StatusCodes.OK).json({ success: true, data: users });
  } catch (error) {
    // code
  }
};

export { createUser, loginUser, logoutUser, getAllUser };
