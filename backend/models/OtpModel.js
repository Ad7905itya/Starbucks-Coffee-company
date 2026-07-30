import mongoose from 'mongoose';
import { otpSchema } from '../schema/otpSchema.js';

export const OTP = mongoose.model("OTP", otpSchema);