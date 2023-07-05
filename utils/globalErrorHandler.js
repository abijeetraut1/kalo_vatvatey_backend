const statusFunc = require("./statusFunc")
require('dotenv').config();

module.exports = (err, req, res, next) => {
    if (process.env.enviroment === "production") {
        if (err.name === "SyntaxError") {
            return statusFunc(res, 500, "SERVER IS UNDER MAINTAINENCE! PLEASE WAIT COUPLE OF MINUTES")
        }else if(err.name === 'JsonWebTokenError'){
            return statusFunc(res, 400, "PLEASE LOGIN AGAIN");
        }else if(err.name === "TokenExpiredError"){
            return statusFunc(res, 400, "TOKEN EXPIRED! PLEASE LOGIN AGAIN");
        }

    } else if (process.env.enviroment === "development") {
        if (
            err.name === "SyntaxError" ||
            err.name === 'JsonWebTokenError' ||
            err.name === "TokenExpiredError"
        ) {
            console.log(err)
            return statusFunc(res, 400, {
                errorName: err.name,
                errorMessage: err.message
            })
        }else{
        }
    }
    console.log("err.name")
}