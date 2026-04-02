import { sendverificationEmail, sendWelcomeEmail } from "../middlewares/email.js";
import { generateTokenAndSetCookies } from "../middlewares/generateToken.js";
import { Usermodel } from "../models/User.js";


/* SEND OTP */

const Register = async (req, res) => {

  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await Usermodel.findOneAndUpdate(
      { email },
      {
        email,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000
      },
      { upsert: true, new: true }
    );

    await sendverificationEmail(user.email, verificationToken);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};



/* VERIFY OTP */

const VerifyEmail = async (req, res) => {

  try {

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP required"
      });
    }

    const user = await Usermodel.findOne({
      email,
      verificationToken: otp,
      verificationTokenExpiresAt: { $gt: Date.now() }
    });

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP"
      });

    }

    user.isverified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    generateTokenAndSetCookies(res, user._id);

    await sendWelcomeEmail(user.email);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};


export { Register, VerifyEmail };
