import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import "./connectDB/connectDb.js";
import otpRoutes from "./Routes/otpRoutes.js";
import uploadRoutes from "./Routes/uploadRoutes.js";
import { getData } from "./Routes/dataRoutes.js";
import cookieParser from "cookie-parser";
import { protect } from "./middleware/authMiddleware.js";
import { getMe, logoutUser, registerUser, loginUser, updateUserProfile } from "./controllers/userController.js";

dotenv.config();   

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// ✅ Specific routes PEHLE
app.post("/api/auth/register", registerUser);
app.post("/api/auth/login", loginUser);
app.get("/api/auth/me", protect, getMe);      // ← cookie se user fetch
app.post("/api/auth/logout", logoutUser);
app.put("/api/auth/profile", protect, updateUserProfile);
app.use("/api/otp", otpRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/uploads', uploadRoutes);


// ⚠️ Wildcard BAAD MEIN — warna sab kuch yahi catch kar leta hai
app.get("/api/:dataset", getData);

app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`✓ Server started on http://localhost:${PORT}`);
});