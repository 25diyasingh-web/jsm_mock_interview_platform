import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import testRoutes from "./test.routes.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", testRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 5000;
console.log("🔥 server.js mounted /api");
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
