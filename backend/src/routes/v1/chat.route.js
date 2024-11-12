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
// router.route('/').post(accessChat)

// fetch chat
// router.route('/').get(fetchChats);

// create group
// router.route('/group').post(createGroupChat);

// rename group
// router.route('/group').put(renameGroup);

//removeFrom group
// router.route("/groupremove").put(removeFromGroupChat);

// add to group
// router.route("/groupadd").post(addToGroupChat);

export default router;
