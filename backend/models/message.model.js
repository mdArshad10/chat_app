import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: String,
    attachment: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
