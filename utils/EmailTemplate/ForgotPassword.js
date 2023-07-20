const sendMain = require("../sendMail");

const baseUrl = process.env.CORSORIGIN_URL;
const SendForgetPasswordTokenInEmail = (res, email, token, message) => {
  const url = new URL(`${baseUrl}/reset-password`);
  url.searchParams.set("token", token);
  const subject = "Password reset";
  const text = `clik this link ${url} to reset your password.`;

  const chatUrl = `${baseUrl}/chat/tejkarki`;
  
  const context = {
    resetPasswordUrl: url,
    chatUrl: chatUrl,
  };

  sendMain(res, email, subject, text, "resetPassword", context, message);
};
module.exports = SendForgetPasswordTokenInEmail;
