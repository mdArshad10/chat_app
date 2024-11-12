import fs from "node:fs";
import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET_KEY,
  CLOUDINARY_CLOUD_NAME,
} from "../constant.js";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET_KEY,
});

export const fileUploadInCloudinary = async (fileUrl) => {
  try {
    if (!fileUrl) return null;
    const info = await cloudinary.uploader.upload(fileUrl, {
      resource_type: "auto",
      folder: "chatApp",
    });
    console.log("file upload successfully");
    fs.unlinkSync(fileUrl);
    console.log("file is remove");
    return { success: true, public_id: info.public_id, url: info.secure_url };
  } catch (error) {
    fs.unlinkSync(fileUrl);
    console.log("something is wrong in file uploading");
    console.log(error);
    return null;
  }
};
