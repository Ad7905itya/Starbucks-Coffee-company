import nodemailer from "nodemailer";
import { OTP } from "../schema/otpSchema.js";

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST /api/otp/send
export const sendOTP = async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    const otp = generateOTP();

    await OTP.deleteMany({ email });
    await OTP.create({ email, phone, otp });

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

// POST /api/otp/verify
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!otp || !email) {
      return res.status(400).json({ success: false, message: "Email aur OTP required" });
    }

    const record = await OTP.findOne({ email });

    if (!record) {
      return res.status(400).json({ success: false, message: "OTP expired or not found" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    await OTP.deleteOne({ _id: record._id });

    return res.status(200).json({ success: true, message: "OTP verified" });

  } catch (error) {
    console.error("verifyOTP error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};