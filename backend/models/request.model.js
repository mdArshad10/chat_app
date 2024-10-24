import mongoose from "mongoose";
import {
  AvailableRequestStatusProviders,
  RequestStatusEnum,
} from "../constant.js";

const requestSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: RequestStatusEnum.PENDING,
      enum: AvailableRequestStatusProviders,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Request = mongoose.model("Request", requestSchema);
