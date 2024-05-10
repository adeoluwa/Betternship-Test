import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DB_url) {
  console.log("DB_URL environment variable is not set")
}

const uri = process.env.DB_URL;

const connectDB = async function () {


  try {
    await mongoose.connect(uri!);
    console.log("Database Module Connected");
  } catch (error) {
    console.log(`Database connection error ${error}`);
  }
};

export default connectDB;
