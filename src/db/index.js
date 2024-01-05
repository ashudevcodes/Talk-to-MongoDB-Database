import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const dataIns = await mongoose.connect(
      `${process.env.MONGO_URI}${DB_NAME}`,
    );
    console.log(`DataBase is Connected 🎉 ${dataIns.connection.host}`);
  } catch (error) {
    console.log(`MongoBD Error 🫡 : ${error}`);
    process.exit(1);
  }
};

export default connectDB;
