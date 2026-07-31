import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import "./connectDB/connectDb.js";
import otpRoutes from "./Routes/otpRoutes.js";
import dataRoutes from "./Routes/dataRoutes.js";
import uploadRoutes from "./Routes/uploadRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { protect } from "./middleware/authMiddleware.js";
import { getMe, logoutUser, updateUserProfile } from "./controllers/userController.js";
import { error } from "console";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
    process.env.CLIENT_ORIGIN,
    "http://localhost:3000",
    "http://localhost:5173",
    "https://starbuckclone1.netlify.app/"
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use('/user/', userRoutes);
app.get("/api/auth/me", protect, getMe);
app.post("/api/auth/logout", logoutUser);
app.put("/api/auth/profile", protect, updateUserProfile);
app.use("/api/otp", otpRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/uploads', uploadRoutes);
app.use("/api", dataRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

app.use((error, req, res, next) => {
    if (error.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Invalid token" })
    }

    if (error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Token expired" })
    }

    console.log(error)

    if (!error) {
        next();
    } else {
        next(error);
    }
})



app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`✓ Server started on https://starbucks-coffee-company-git-main-storage2.vercel.app`);
});


export default app;