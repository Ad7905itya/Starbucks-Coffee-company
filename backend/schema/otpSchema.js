import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String },
  phone: { type: String },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // 5 min TTL
});

export const OTP = mongoose.model("OTP", otpSchema);