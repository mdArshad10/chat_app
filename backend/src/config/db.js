import mongoose from "mongoose";
import { MONGO_URL } from "../constant.js";

export const dbConnection = async () => {
  try {
    const dbInstance = await mongoose.connect(`${MONGO_URL}/chatApp`);
    console.log(
      `the database is connected successfully at ${dbInstance.connection.port}`
    );
  } catch (error) {
    console.log("some thing wrong with database connection");
    console.log(error);
    process.exit(1);
  }
};
