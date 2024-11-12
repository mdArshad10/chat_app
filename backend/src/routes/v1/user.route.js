import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUser,
} from "../../controllers/user.controller.js";
import { upload } from "../../utils/multer.js";
import { validator } from "../../middlewares/validate.js";
import { userValidatorRules } from "../../middlewares/validatorRules/userValidatorRules.js";
import { verifyUser } from "../../middlewares/verify.js";

const router = Router();

// ✅
router.route("/signup").post(
  // userValidatorRules.createUser,
  // validator,
  upload.single("avatar"),
  createUser
);

// ✅
router.route("/login").post(loginUser);

// ✅
router.route("/logout").get(verifyUser, logoutUser);

// ✅
router.route("/").get(verifyUser, getAllUser);

export default router;
