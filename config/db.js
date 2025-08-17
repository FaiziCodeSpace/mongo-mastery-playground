import mongoose from "mongoose";
import dotenv from "dotenv";
import { watchStudents } from "../controllers/changeStream";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected!");
    watchStudents();
  } catch (err) {
    console.log("Failed to connect MongoDB, Reason:", err);
    process.exit(1);
  }
};

export default connectDB;
