import { Router } from "express";
import userRoutes from "./v1/user.route.js";

const router = Router();

router.use("/v1/users", userRoutes);

export default router;
