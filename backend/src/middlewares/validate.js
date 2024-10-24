import { ExpressValidator } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const validator = (req, res, next) => {
  const error = ExpressValidator(req);

  if (error.isEmpty()) {
    return next();
  }
  const extractErrors = error.array().map((item) => item.msg);

  return res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: extractErrors,
    data: null,
    err: extractErrors,
  });
};
