import mongoose from "mongoose";

export const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    unique: true
  },
  otp: {
    type: Number,
    required: [true, "OTP is required"],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300
  }, // 5 min TTL
}, { timestamps: true, strict: true });

