import jwt from "jsonwebtoken";
import { User } from "../schema/userSchema.js";
import { OTP } from "../schema/otpSchema.js";

// Token banane ka helper
const generateToken = (user) => {
    return jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

export const registerUser = async (req, res) => {
    try {
        const { email, password, FirstName, LastName, phone, BirthDate, preferences } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const user = new User({ email, password, FirstName, LastName, phone, BirthDate, preferences });
        await user.save();

        // ✅ JWT token banao
        const token = generateToken(user);

        // ✅ Cookie mein set karo
        res.cookie("token", token, {
            httpOnly: true,      // JS se access nahi hoga — secure
            secure: false,       // production mein true karna (HTTPS)
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 din
        });

        return res.status(201).json({
            success: true,
            message: "User registered",
            data: {
                _id: user._id,
                email: user.email,
                FirstName: user.FirstName,
                LastName: user.LastName,
                phone: user.phone,
                BirthDate: user.BirthDate,
                preferences: user.preferences,
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Registration failed", error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // ✅ JWT token banao
        const token = generateToken(user);

        // ✅ Cookie mein set karo
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                _id: user._id,
                email: user.email,
                FirstName: user.FirstName,
                LastName: user.LastName,
                phone: user.phone,
                BirthDate: user.BirthDate,
                preferences: user.preferences,
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Login failed", error: error.message });
    }
};

// ✅ Cookie se current user fetch karo
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { profilePhoto, FirstName, LastName, phone, BirthDate, preferences, otp } = req.body;

        if (!otp) {
            return res.status(400).json({ success: false, message: "OTP is required to confirm profile updates." });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isValidOtp = await OTP.findOne({ email: user.email, otp });
        if (!isValidOtp) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
        }

        await OTP.deleteMany({ email: user.email });

        user.profilePhoto = profilePhoto || user.profilePhoto;
        user.FirstName = FirstName || user.FirstName;
        user.LastName = LastName || user.LastName;
        user.phone = phone || user.phone;
        user.BirthDate = BirthDate || user.BirthDate;
        user.preferences = {
            email: preferences?.email ?? user.preferences?.email,
            sms: preferences?.sms ?? user.preferences?.sms,
        };

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                _id: user._id,
                email: user.email,
                FirstName: user.FirstName,
                LastName: user.LastName,
                phone: user.phone,
                BirthDate: user.BirthDate,
                preferences: user.preferences,
                profilePhoto: user.profilePhoto,
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Profile update failed", error: error.message });
    }
};

// ✅ Logout
export const logoutUser = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ success: true, message: "Logged out" });
};