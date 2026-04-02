import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import DbCon from "./db.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());

// database connect
DbCon();

// routes
app.use("/auth", authRoutes);

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
