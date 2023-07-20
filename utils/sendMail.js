const nodemailer = require("nodemailer");
const statusFunc = require("./statusFunc");
const hbs = require("nodemailer-express-handlebars");
const path = require('path');
const EMAIL = process.env.MAIL_USERNAME;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};

// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));

module.exports = async (
  res,
  sendTo,
  subject,
  text,
  template,
  context,
  message
) => {
  try {
    const mailOptions = {
      from: `Kalo Vhatbatay <${EMAIL}>`,
      to: sendTo,
      subject: subject,
      text: text,
      template: template,
      context: context,
    };
    // console.log(mailOptions);
    await transporter.sendMail(mailOptions);
    console.log("email send");
    res.status(201).json({ message });
  } catch (err) {
    return statusFunc(res, 400, err, "too many request please try again later");
  }
};
