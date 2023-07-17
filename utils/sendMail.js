const nodemailer = require("nodemailer");
const statusFunc = require("./statusFunc");
const EMAIL = process.env.EMAIL
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: EMAIL,
        pass: process.env.PASSWORD
    }
})


module.exports = async (sendTo, subject, text, html, message) => {
    try {
        const mailOptions = {
            from: `Kalo Vhatbatay <${EMAIL}>`,
            to: sendTo,
            subject: subject,
            text: text,
            html: html
        }
        await transporter.sendMail(mailOptions);
        console.log("email send");
        res.status(201).json({ message})
    } catch (err) {
        return statusFunc(res, 400, "too many request please try again later");
    }
}