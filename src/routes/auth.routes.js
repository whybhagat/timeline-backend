import express from "express";

const router = express.Router();

router.post("/send-otp", (req, res) => {
  res.json({ message: "OTP sent" });
});

router.post("/verify-otp", (req, res) => {
  res.json({ message: "OTP verified" });
});

export default router;
