import jwt from "jsonwebtoken";
import AWS from "aws-sdk";
import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { OTP } from "../models/OtpModel.js";

const s3 = process.env.AWS_S3_BUCKET_NAME ? new AWS.S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
}) : null;

const bucketName = process.env.AWS_S3_BUCKET_NAME;

const getS3KeyFromUrl = (url) => {
    try {
        const parsed = new URL(url);
        const hostname = parsed.hostname;
        const pathname = parsed.pathname.replace(/^\//, '');
        const regionHost = `s3.${process.env.AWS_REGION}.amazonaws.com`;
        const globalHost = 's3.amazonaws.com';
        const virtualHost = `${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com`;
        const legacyVirtualHost = `${bucketName}.s3.amazonaws.com`;

        if (hostname === virtualHost || hostname === legacyVirtualHost) {
            return pathname;
        }

        if ((hostname === regionHost || hostname === globalHost) && pathname.startsWith(`${bucketName}/`)) {
            return pathname.replace(`${bucketName}/`, '');
        }

        if (hostname.includes(`${bucketName}.s3`) && pathname) {
            return pathname;
        }

        return null;
    } catch {
        return null;
    }
};

const deleteS3Object = async (key) => {
    if (!s3 || !bucketName || !key) return;
    await s3.deleteObject({ Bucket: bucketName, Key: key }).promise();
};

const generateToken = (user) => {
    return jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

const mapUserForResponse = (user) => ({
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    FirstName: user.firstName,
    LastName: user.lastName,
    phone: user.phone,
    birthDate: user.birthDate,
    BirthDate: user.birthDate,
    preferences: user.preferences,
    profilePhoto: user.profilePhoto,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});

const setAuthCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};

export const registerUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone, birthDate, preferences } = req.body;


        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const user = await User.create({
            email,
            password: await bcrypt.hash(password, 10),
            firstName,
            lastName,
            phone,
            birthDate: birthDate ? new Date(birthDate) : undefined,
            preferences,
            profilePhoto: ""
        })


        const token = generateToken(user);

        setAuthCookie(res, token);

        return res.status(201).json({
            success: true,
            message: "User registered",
            data: mapUserForResponse(user)
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

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }


        const token = generateToken(user);

        setAuthCookie(res, token);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: mapUserForResponse(user)
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
        return res.status(200).json({ success: true, data: mapUserForResponse(user) });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { profilePhoto, FirstName, LastName, phone, BirthDate, preferences } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Parse BirthDate safely
        const parsedBirthDate = BirthDate ? new Date(BirthDate) : user.birthDate;
        if (BirthDate && Number.isNaN(parsedBirthDate.getTime())) {
            return res.status(400).json({ success: false, message: "Invalid birth date format" });
        }

        const oldProfilePhoto = user.profilePhoto;
        const isNewPhoto = profilePhoto && profilePhoto !== oldProfilePhoto;

        // Update User details
        user.profilePhoto = profilePhoto || user.profilePhoto;
        user.firstName = FirstName || user.firstName;
        user.lastName = LastName || user.lastName;
        user.phone = phone || user.phone;
        user.birthDate = parsedBirthDate;
        user.preferences = {
            email: preferences?.email ?? user.preferences?.email ?? false,
            sms: preferences?.sms ?? user.preferences?.sms ?? false,
        };

        await user.save();

        // Agar nayi photo upload hui hai toh puraani S3 se delete kar do
        if (isNewPhoto && oldProfilePhoto) {
            const oldKey = getS3KeyFromUrl(oldProfilePhoto);
            if (oldKey) {
                try {
                    await deleteS3Object(oldKey);
                } catch (deleteError) {
                    console.error('Failed to delete old profile photo:', deleteError);
                }
            }
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: mapUserForResponse(user)
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