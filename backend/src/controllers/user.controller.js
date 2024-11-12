import { User } from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import { fileUploadInCloudinary } from "../utils/cloudinary.js";
import { AsyncHandler } from "../middlewares/async-handler.js";
import { ErrorHandler } from "../utils/error.js";

const cookieOptions = {
  expires: new Date(Date.now() + 60 * 60 * 1000),
  secure: true,
  httpOnly: true,
  sameSite: "strict",
};

// @DESC: create a new user ✅
// @METHOD: POST   /api/v1/users/signup
// @ACCESS: public
const createUser = AsyncHandler(async (req, res, next) => {
  const { name, email, username, bio, password } = req.body;

  if (!req.file?.filename && !req.file?.path) {
    return next(new ErrorHandler("file is not found", StatusCodes.BAD_REQUEST));
  }

  const fileUrl = req.file?.path;
  const result = await fileUploadInCloudinary(fileUrl);
  if (!result) {
    return next(
      new ErrorHandler("file upload failed", StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
  const avatar = {
    public_id: result.public_id,
    url: result.url,
  };
  const user = new User({ name, email, username, password, bio, avatar });
  await user.save();

  const { password: hashedPassword, ...rest } = user._doc;
  const token = await user.generateAccessToken();
  res.status(StatusCodes.CREATED).cookie("token", token, cookieOptions).json({
    success: true,
    message: "User created successfully",
    data: rest,
  });
});

// @DESC: login the user ✅
// @METHOD: POST   /api/v1/user/login
// @ACCESS: public
const loginUser = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User not found", StatusCodes.NOT_FOUND));
  }

  const isPasswordMatch = await user.isMatchPassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Password", StatusCodes.UNAUTHORIZED));
  }

  const { password: hashedPassword, ...rest } = user._doc;
  const token = await user.generateAccessToken();
  res.status(StatusCodes.OK).cookie("token", token, cookieOptions).json({
    success: true,
    message: "User logged in successfully",
    data: rest,
  });
});

// @DESC: logout the user
// @METHOD: GET   /api/v1/user/logout
// @ACCESS: private
const logoutUser = AsyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "User logged out successfully",
  });
});

// @DESC: Get all the users ✅
// @METHOD: GET /api/v1/users
// @ACCESS: private
const getAllUser = AsyncHandler(async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: req.query.search, $options: "i" },
          { email: req.query.search, $options: "i" },
        ],
      }
    : {};
    // check point if user is not exist then ??
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  return res.status(StatusCodes.OK).json({ success: true, data: users });
});

export { createUser, loginUser, logoutUser, getAllUser };
