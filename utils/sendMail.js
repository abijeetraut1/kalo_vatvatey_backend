const nodemailer = require("nodemailer");
const statusFunc = require("./statusFunc");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "bebishnewar@gmail.com",
        pass: "qszjvbtkyhvlkloo"
    }
})

module.exports = async (sendTo, code) => {
    try{
        const send = await transporter.sendMail({
            form: "monjir0 <bebishnewar@gmail.com>",
            to: sendTo,
            subject: "Kalo Bhatbhate",
            html: `<h1>your verification code is ${code}</h1>`
        })
        console.log("verification code send");
    }catch(err){
        return statusFunc(req, 400, "too many request please try again later");
    }   
}
