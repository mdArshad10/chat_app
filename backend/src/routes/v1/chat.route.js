import { Router } from "express";
import { verifyUser } from "../../middlewares/verify.js";
import {
  accessChat,
  addUserIntoGroupChat,
  createGroupChat,
  fetchChat,
  removeUserFromGroupChat,
  renameGroupChat,
} from "../../controllers/chat.controller.js";
const router = Router();

// access chats 
router.route('/').post(accessChat)

// fetch chat
router.route("/").get(fetchChat);

// create group
router.route('/group').post(createGroupChat);

// rename group
router.route("/group").put(renameGroupChat);

//removeFrom group
router.route("/groupremove").put(removeUserFromGroupChat);

// add to group
router.route("/groupadd").post(addUserIntoGroupChat);

export default router;
