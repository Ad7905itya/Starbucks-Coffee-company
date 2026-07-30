import nodemailer from "nodemailer";
import { OTP } from "../models/OtpModel.js";


const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTP = async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    const otp = generateOTP();

    await OTP.findOneAndUpdate(
      { $or: [{ email }, { phone }] }, 
      { email, phone, otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    await transporter.sendMail({
      from: `"Tata Starbucks" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Starbucks Registration",
      html: `
        <div style="font-family: sans-serif; max-width: 400px; padding: 20px;">
          <h2 style="color: #00754a;">Verify your account</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing: 8px; color: #1e3932;">${otp}</h1>
          <p>This OTP is valid for <strong>5 minutes</strong>.</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: "OTP sent successfully" });

  } catch (error) {
    console.error("sendOTP error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!otp || !email) {
      return res.status(400).json({ success: false, message: "Email aur OTP required" });
    }

    // Email ko trim/lowercase karke dhundho (case-sensitivity se bachne ke liye)
    const cleanEmail = email.trim().toLowerCase();
    const record = await OTP.findOne({ email: cleanEmail });

    if (!record) {
      return res.status(400).json({ success: false, message: "OTP expired or not found" });
    }

    // 1. Explicit Expiry Check (5 minutes = 300,000 ms)
    const otpAge = Date.now() - new Date(record.createdAt).getTime();
    if (otpAge > 5 * 60 * 1000) {
      await OTP.deleteOne({ _id: record._id }); // Expired OTP clean up
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // 2. Safe String Comparison
    if (String(record.otp).trim() !== String(otp).trim()) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Success: Delete OTP after verification
    await OTP.deleteOne({ _id: record._id });

    return res.status(200).json({ success: true, message: "OTP verified successfully" });

  } catch (error) {
    console.error("verifyOTP error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};