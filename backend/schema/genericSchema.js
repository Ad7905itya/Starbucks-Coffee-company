import mongoose from "mongoose";

export const genericSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
