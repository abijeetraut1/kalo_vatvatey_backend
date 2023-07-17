const sendMain = require("../sendMail");
const path = require("path");
const ejs = require("ejs");

const baseUrl = process.env.CORSORIGIN_URL;

const SendOtpCodeInEmail = (res, email, OTP, otpToken, message) => {
  const url = new URL(`${baseUrl}/verifyEmail`);
  url.searchParams.set("token", otpToken);
  url.searchParams.set("email", email);

  const subject = "Verification Code from Kalo Vhatbatay";
  const text = `Your verification code is ${OTP}. Please enter this code to verify your account or clik this like ${url} to verify your email`;
  const templatePath = path.join(__dirname, "views", "accountVerification.ejs");

  const chatUrl = `${baseUrl}/chat/tejkarki`;

  // console.log("verifyemailUrl", url);
  // console.log("chaturl", chatUrl);

  const verifyEmailUrl = `${baseUrl}/verifyEmail/?token=${otpToken}&email=${email}`;

  const html = ejs.renderFile(templatePath, {
    OTP: OTP,
    verifyEmailUrl: verifyEmailUrl,
    chatUrl: chatUrl,
  });

  sendMain(res, email, subject, text, html, message);
};

module.exports = SendOtpCodeInEmail;
