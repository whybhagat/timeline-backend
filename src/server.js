import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import DbCon from "./db.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "https://timelinesports.in",
    "https://www.timelinesports.in"
  ],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

app.use(express.json());

DbCon();

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Timeline Backend API is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
