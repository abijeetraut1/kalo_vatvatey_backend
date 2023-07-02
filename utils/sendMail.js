const nodemailer = require("nodemailer");
const statusFunc = require("./statusFunc");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "bebishnewar@gmail.com",
        pass: "qszjvbtkyhvlkloo"
    }
})

module.exports = async (sendTo, code, verificatonLink) => {
    try{
        const send = await transporter.sendMail({
            form: "monjir0 <bebishnewar@gmail.com>",
            to: sendTo,
            subject: "Kalo Bhatbhate",
            html: `
                <h1>your verification code is ${code}</h1>
                <br> or <br>
                <h1> you can just click on the link below </h1>
                <p> http://127.0.0.1:800/api/v1/user/verifyaccount/${verificatonLink} </p>
                `
        })
        console.log("verification code send");
    }catch(err){
        return statusFunc(req, 400, "too many request please try again later");
    }   
}
