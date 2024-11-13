import { Chat } from "../models/chat.model.js";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.model.js";
import { AsyncHandler } from "../middlewares/async-handler.js";
import { ErrorHandler } from "../utils/error.js";

// @DESC: create a new chat ✅
// @METHOD: [POST]  /api/v1/chats
// @ACCESS: private
const accessChat = AsyncHandler(async (req, res, next) => {
  const { userId, senderId } = req.body;
  if (!userId) {
    return next(
      new ErrorHandler("UserId params is not send with request", StatusCodes.b)
    );
  }

  const newChatForTest = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        members: { $elemMatch: { $eq: senderId } }, // TODO: login user's user id
      },
      {
        members: { $elemMatch: { $eq: userId } },
      },
    ],
  });

  const userChat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        members: { $elemMatch: { $eq: senderId } }, // TODO: login user's user id
      },
      {
        members: { $elemMatch: { $eq: userId } },
      },
    ],
  })
    .populate("members", "-password")
    .populate("latestMessage")
    .exec();
  const sender = await User.populate(userChat, {
    path: "latestMessage.sender",
    select: "name avatar username email",
  });

  if (sender.length > 0) {
    return res.status(StatusCodes.OK).json({
      success: true,
      data: sender[0],
    });
  } else {
    const chatData = {
      name: "sender",
      members: [senderId, userId], // TODO: login user's user id
    };
    const newChatCreated = await Chat.create(chatData);
    console.log("the new Chat created");
    console.log(newChatCreated);

    const fullChat = await Chat.findOne({ _id: newChatCreated._id }).populate(
      "members",
      "-password"
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: fullChat,
    });
  }
});

// @DESC: fetch the chat data for login user ✅
// @METHOD: [GET]   /api/v1/chats
// @ACCESS: private
const fetchChat = AsyncHandler(async (req, res, next) => {
  const { senderId } = req.body;
  const chats = await Chat.findOne({
    members: { $elemMatch: { $eq: senderId } }, // TODO: login user's userID
  })
    .populate("members", "-password")
    .populate("latestMessage")
    .populate("groupAdmin", "-password")
    .sort({ updatedAt: -1 });

  const fullChat = await Chat.findById(chats._id).populate(
    "members",
    "-password"
  );
  res.status(StatusCodes.OK).json({
    success: true,
    data: fullChat,
  });
});

// @DESC: create a new Group chat ✅
// @METHOD: [POST]   /api/v1/chats/groups
// @ACCESS: private
const createGroupChat = AsyncHandler(async (req, res, next) => {
  const { name, members, senderId } = req.body;
  // check the condition if user not send the name and members

  const users = JSON.parse(req.body.members);

  if (users.length < 2) {
    return next(
      new ErrorHandler(
        "Group chat must have at least 2 members",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  users.push(req.user);
  const createNewGroupChat = await Chat.create({
    name,
    isGroupChat: true,
    members: users,
    groupAdmin: senderId, // TODO: login user details
  });

  const fullChat = await Chat.findOne({ _id: createNewGroupChat._id }).populate(
    "members",
    "-password"
  );
  res.status(StatusCodes.OK).json({
    success: true,
    data: fullChat,
  });
});

// @DESC: rename the group chat ✅
// @METHOD: [PUT]   /api/v1/chats/groups
// @ACCESS: private/Admin
const renameGroupChat = AsyncHandler(async (req, res, next) => {
  const { chatId, name } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { name },
    { new: true }
  )
    .populate("members", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    return next(
      new ErrorHandler("Group chat not found", StatusCodes.NOT_FOUND)
    );
  }

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "chat detail updated successfully",
    data: updatedChat,
  });
});

// @DESC: remove the user from the group chat
// @METHOD: POST   /api/v1/chats/groups/remove
// @ACCESS: private
const removeUserFromGroupChat = AsyncHandler(async (req, res, next) => {
  const { userId, chatId } = req.body;
  const addNewUserIntoGroupChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { members: userId },
    },
    {
      new: true,
    }
  )
    .populate("members", "-password")
    .populate("groupAdmin", "-password");

  if (!addNewUserIntoGroupChat) {
    return next(
      new ErrorHandler("Group chat not found", StatusCodes.NOT_FOUND)
    );
  }
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "User remove from group chat successfully",
    data: addNewUserIntoGroupChat,
  });
});

// @DESC: Add the the new member into the group ✅
// @METHOD: [PUT]   /api/v1/chat/groups/new
// @ACCESS: private
const addUserIntoGroupChat = AsyncHandler(async (req, res, next) => {
  const { userId, chatId } = req.body;
  const addNewUserIntoGroupChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { members: userId },
    },
    {
      new: true,
    }
  )
    .populate("members", "-password")
    .populate("groupAdmin", "-password");

  if (!addNewUserIntoGroupChat) {
    return next(
      new ErrorHandler("Group chat not found", StatusCodes.NOT_FOUND)
    );
  }
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "User added to group chat successfully",
    data: addNewUserIntoGroupChat,
  });
});

export {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroupChat,
  addUserIntoGroupChat,
  removeUserFromGroupChat,
};
