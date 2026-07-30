import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"],
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Password must be at least 8 characters long"],
      match: [/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
        `Password must contain at least one uppercase letter, one lowercase letter,
         one number, and one special character.`],
      trim: true,
    },
    profilePhoto: {
      type: String,
      optional: true,
      trim: true
    },
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      trim: true
    },
    phone: {
      type: Number,
      required: [true, "Please enter your phone number"],
      trim: true
    },
    birthDate: {
      type: Date,
      required: [true, "Please enter your birth date"],
      trim: true
    },
    preferences: {
      email: Boolean,
      sms: Boolean,
    },
  },
  { timestamps: true, strict: true }
);

export default userSchema