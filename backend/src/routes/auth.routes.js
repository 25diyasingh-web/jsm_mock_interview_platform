import express from "express";
import jwt from "jsonwebtoken";
import { signUp, signIn } from "../controllers/auth.controller.js";

const router = express.Router();

console.log("✅ auth.routes.js loaded");

router.post("/signup", signUp);
router.post("/signin", signIn);

// ✅ AUTH CHECK (COOKIE → JWT)
router.get("/me", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.json({
      user: {
        id: decoded.id,
      },
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
