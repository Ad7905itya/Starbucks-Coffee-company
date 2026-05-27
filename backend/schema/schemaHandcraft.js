import mongoose from "mongoose";

export const handcraftSchema = new mongoose.Schema({
    image: String,
    mainCategory: String,
    subCategory: String,
}, { timestamps: true });
