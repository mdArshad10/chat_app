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

router
  .route("/")
  .post(accessChat) // access chats ✅
  .get(fetchChat); // fetch chat ✅

// create group ✅
router
  .route("/groups")
  .post(createGroupChat) // create group ✅
  .put(renameGroupChat); // rename group ✅

//removeFrom group ✅
router.route("/groups/remove").put(removeUserFromGroupChat);

// add to group ✅
router.route("/groups/add").post(addUserIntoGroupChat);

export default router;
