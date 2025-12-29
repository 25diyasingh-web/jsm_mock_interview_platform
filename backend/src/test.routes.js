import express from "express";

console.log("🔥 test.routes.js LOADED");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "API working" });
});

export default router;
