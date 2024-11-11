import { Chat } from "../models/chat.model.js";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.model.js";

// @DESC: create a new chat
// @METHOD: POST   /api/v1/chats
// @ACCESS: private
const accessChat = async (req, res, next) => {
  const { userId } = req.body;

  // check that is userId per use exist karta hai nhi

  // chat that the privous chat exist karta hai ki nhi

  const userChat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        members: { $elemMatch: { $eq: req.user._id } },
      },
      {
        members: { $elemMatch: { $eg: userId } },
      },
    ],
  }).populate("users", "-password")
  .populate("latestMessage");
  const sender = await Chat.populate(userChat, {
    
  })
};

// @DESC: create a new user
// @METHOD: POST   /api/v1/user/new
// @ACCESS: public
const fetchChat = async (req, res, next) => {};

// @DESC: create a new user
// @METHOD: POST   /api/v1/user/new
// @ACCESS: public
const createGroupChat = async (req, res, next) => {};

// @DESC: create a new user
// @METHOD: POST   /api/v1/user/new
// @ACCESS: public
const renameGroupChat = async (req, res, next) => {};

// @DESC: create a new user
// @METHOD: POST   /api/v1/user/new
// @ACCESS: public
const removeFromGroupChat = async (req, res, next) => {};

// @DESC: create a new user
// @METHOD: POST   /api/v1/user/new
// @ACCESS: public
const addToGroupChat = async (req, res, next) => {};

export {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroupChat,
  addToGroupChat,
  removeFromGroupChat,
};
