const nodemailer = require("nodemailer");
const statusFunc = require("./statusFunc");
const EMAIL = process.env.MAIL_USERNAME;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

module.exports = async (res, sendTo, subject, text, html, message) => {
  try {
    const mailOptions = {
      from: `Kalo Vhatbatay <${EMAIL}>`,
      to: sendTo,
      subject: subject,
      text: text,
      html: html, // this html code which is ejs format is not working but if we add directly html file over here it will work but if we do that the html file will not be dynamic
    };
    console.log(mailOptions);
    await transporter.sendMail(mailOptions);
    console.log("email send");
    res.status(201).json({ message });
  } catch (err) {
    return statusFunc(res, 400, err, "too many request please try again later");
  }
};
