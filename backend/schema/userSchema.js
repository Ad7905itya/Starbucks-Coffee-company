import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    profilePhoto: String,
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    profilePhoto: { type: String },
    FirstName: String,
    LastName: String,
    phone: String,
    BirthDate: String,           // ← naya
    preferences: {               // ← naya
      email: Boolean,
      sms: Boolean,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);