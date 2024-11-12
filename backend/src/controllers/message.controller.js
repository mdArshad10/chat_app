import { StatusCodes } from "http-status-codes";
import { AsyncHandler } from "../middlewares/async-handler.js";
import { ErrorHandler } from "../utils/error.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";

// @DESC: create the new message
// @METHOD: [POST]   /api/v1/message/
// @ACCESS: private
const sendMessage = AsyncHandler(async (req, res, next) => {
  // Requirement for the sending message
  // 1. ChatId is required
  // 2. Message content is required
  // 3. SenderId is required
  const { chatId, messageContent } = req.body;

  if (!chatId || !messageContent) {
    return next(new ErrorHandler("Invalid data passed into the request"));
  }

  const messageDetail = {
    chat: chatId,
    sender: req.user.id,
    content: messageContent,
  };

  const newMessage = await Message.create(messageDetail);

  const message = await newMessage
    .populate("sender", "name email username avatar")
    .populate("chat")
    .execPopulate();

  const allMembers = await User.populate(message, {
    path: "Chat.members",
    select: "name email username avatar",
  });

  const latestMessage = await Chat.findByIdAndUpdate(chatId, {
    latestMessage: messageContent,
  });
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Message sent successfully",
    data: message,
  });
});

// @DESC: fetch all message
// @METHOD: [GET]   /api/v1/messages/:chatId
// @ACCESS: private
const allMessages = AsyncHandler(async (req, res, next) => {
  const { chatId } = req.params;
  // check if chatId is not exist or expire

  const messages = await Message.find({ chat: chatId })
    .populate("sender", "name email avatar")
    .populate("chat");

  res.status(StatusCodes.OK).json({
    success: true,
    message: "All messages fetched successfully",
    data: messages,
  });
});

export { sendMessage, allMessages };
