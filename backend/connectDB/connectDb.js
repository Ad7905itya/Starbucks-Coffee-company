import mongoose from "mongoose";
import dotenv from "dotenv";
import { genericSchema } from "../schema/genericSchema.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("ERROR: MONGO_URI not defined in .env file");
  process.exit(1);
}

mongoose.connect(MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("✓ Connected to MongoDB successfully");
});

export const getCollection = (name) => {
  const modelName = name.replace(/[-\s]/g, "_");
  return mongoose.models[modelName] || mongoose.model(modelName, genericSchema, name);
};

mongoose.connection.on("error", (err) => {
  console.error("✗ MongoDB connection error:", err.message);
});
