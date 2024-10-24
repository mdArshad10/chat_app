import { Router } from "express";
import { createUser } from "../../controllers/user.controller.js";
import { upload } from "../../utils/multer.js";
import { validator } from "../../middlewares/validate.js";
import { userValidatorRules } from "../../middlewares/validatorRules/userValidatorRules.js";

const router = Router();

router
  .route("/new")
  .post(
    userValidatorRules.createUser,
    validator,
    upload.single("avatar"),
    createUser
  );

export default router;
