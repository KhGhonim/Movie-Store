import mongoose from "mongoose";
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

const MongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
  }
};

export default MongoDB;
