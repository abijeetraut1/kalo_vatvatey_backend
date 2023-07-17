const sendMain = require("../sendMail");
const path = require("path");
const ejs = require("ejs");

const baseUrl = process.env.CORSORIGIN_URL;
const SendForgetPasswordTokenInEmail = (res, email, token) => {
  const url = new URL(`${baseUrl}/reset-password`);
  url.searchParams.set("token", token);
  const subject = "Password reset";
  const text = `clik this link ${url} to reset your password.`;
  const templatePath = path.join(
    __dirname,
    "views",
    "resetPasswordEmailTemplate.ejs"
  );

  const chatUrl = `${baseUrl}/chat/tejkarki`;

  // const resetPasswordUrl = `${baseUrl}/reset-password?${token}`;

  const html = ejs.renderFile(templatePath, { resetPasswordUrl: url, chatUrl });

  sendMain(res, email, subject, text, html, message);
};
module.exports = SendForgetPasswordTokenInEmail;
