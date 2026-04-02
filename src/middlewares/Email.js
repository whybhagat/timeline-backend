import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


/* SEND OTP EMAIL */

export const sendverificationEmail = async (email, otp) => {

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP Verification",
    html: `
      <h2>Your OTP Code</h2>
      <h1>${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
    `
  };

  await transporter.sendMail(mailOptions);

};



/* WELCOME EMAIL */

export const sendWelcomeEmail = async (email) => {

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to Timeline",
    html: `
      <h2>Welcome to Timeline 🎵</h2>
      <p>Your account has been successfully verified.</p>
    `
  };

  await transporter.sendMail(mailOptions);

};
