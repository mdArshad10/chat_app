import { Chat } from "../models/chat.model.js";
import { StatusCodes } from "http-status-codes";

// @DESC: create a new user
// @METHOD: POST   /api/v1/user/new
// @ACCESS: public
const accessChat = async (req, res, next) => {};

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
