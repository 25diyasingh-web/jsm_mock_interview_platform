import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";


dotenv.config({ path: "./.env" });
console.log("JWT_SECRET AT BOOT =", process.env.JWT_SECRET);

connectDB();

const app = express();

// middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
// routes
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
