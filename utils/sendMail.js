const nodemailer = require("nodemailer");
const statusFunc = require("./statusFunc");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

module.exports = async (sendTo, code, verificatonLink, name) => {
    try {
        const send = await transporter.sendMail({
            form: "monjir0 <bebishnewar@gmail.com>",
            to: sendTo,
            subject: "Kalo Bhatbhate",
            html: `
                <h1 style="">Thanks For Signup ${name}</h1>
                <p> you can just click on the link below </p>
                <a href="http://127.0.0.1:800/api/v1/user/verification/${verificatonLink}"><button>Click Here to Verify</button>
            `
        })
        console.log("verification code send");
    } catch (err) {
        return statusFunc(res, 400, "too many request please try again later");
    }
}