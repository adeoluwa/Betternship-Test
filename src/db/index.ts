import mongoose from "mongoose";
import logger from "../utils/logger"
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DB_url) {
  logger.warning("DB_URL environment variable is not set");
}

const uri = process.env.DB_URL;

const connectDB = async function () {
  // if (!uri) {
  //   console.log("Database URI is not set");
  // }

  try {
    await mongoose.connect(uri!);
    logger.info("Database Module Connected");
  } catch (error) {
    logger.error("Database connection error: ", error);
  }
};

export default connectDB;
