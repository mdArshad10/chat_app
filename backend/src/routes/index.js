import { Router } from "express";
import userRoutes from "./v1/user.route.js";
import chatRoutes from "./v1/chat.route.js";
import messageRoutes from "./v1/message.route.js";

const router = Router();

router.use("/v1/users", userRoutes);
router.use("/v1/chats", chatRoutes);
router.use("/v1/messages", messageRoutes);

export default router;
