import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const dbInstance = await mongoose.connect(
      `mongodb://127.0.0.1:27017/chatApp`
    );
    console.log(
      `the database is connected successfully at ${dbInstance.connection.port}`
    );
  } catch (error) {
    console.log("some thing wrong with database connection");
    console.log(error);
    process.exit(1);
  }
};
