import { body, param, query } from "express-validator";
import { User } from "../../models/user.model.js";

export const userValidatorRules = {
  createUser: [
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isString()
      .isLength({ min: 3, max: 20 })
      .withMessage("name must be between 3 and 20 characters long")
      .escape(),

    body("username")
      .notEmpty()
      .withMessage("username is required")
      .isString()
      .isLength({ min: 3, max: 20 })
      .withMessage("name must be between 3 and 20 characters long")
      .custom(async (value) => {
        const user = await User.findOne({ username: value });
        if (user) {
          throw new Error("username already exists");
        }
      })
      .escape(),

    body("bio")
      .notEmpty()
      .withMessage("bio is required")
      .isString()
      .isLength({ min: 3, max: 100 })
      .withMessage("name must be between 3 and 100 characters long")
      .escape(),

    body("password")
      .notEmpty()
      .withMessage("password is required it is empty")
      .isString()
      .withMessage("password must be a string")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        "password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol"
      )
      .escape(),
  ],
};
