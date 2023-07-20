const sendMain = require("../sendMail");
const path = require("path");

const baseUrl = process.env.CORSORIGIN_URL;

const SendOtpCodeInEmail = (res, email, OTP, otpToken, message) => {
  const url = new URL(`${baseUrl}/verifyEmail`);
  url.searchParams.set("token", otpToken);
  url.searchParams.set("email", email);

  const subject = "Verification Code from Kalo Vhatbatay";
  const text = `Your verification code is ${OTP}. Please enter this code to verify your account or clik this like ${url} to verify your email`;

  const chatUrl = `${baseUrl}/chat/tejkarki`;

  const context = {
    OTP: OTP,
    verifyEmailUrl: url,
    chatUrl: chatUrl,
  };

  sendMain(res, email, subject, text, "verifyEmail", context, message);
};

module.exports = SendOtpCodeInEmail;