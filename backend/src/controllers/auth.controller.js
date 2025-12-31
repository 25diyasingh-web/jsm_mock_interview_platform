import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

/* =======================
   SIGN UP
======================= */
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =======================
   SIGN IN
======================= */
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔴 HARD FAIL if JWT_SECRET missing
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // ✅ COOKIE-BASED AUTH (THIS IS THE FIX)
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production
        sameSite: "lax",
        path: "/", 
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
