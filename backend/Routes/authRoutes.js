import { User } from "../schema/userSchema.js";

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

    const userData = {
      _id: user._id,
      email: user.email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      phone: user.phone,
      BirthDate: user.BirthDate,
      preferences: user.preferences,
    };

    return res.status(201).json({ success: true, message: "User registered", data: userData });
  } catch (error) {
    console.error("Error registering user:", error);
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

    const userData = {
      _id: user._id,
      email: user.email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      phone: user.phone,
    };

    return res.status(200).json({ success: true, message: "Login successful", data: userData });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ success: false, message: "Login failed", error: error.message });
  }
};
