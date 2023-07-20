require("dotenv").config();

if (process.env.ENVIROMENT === "development") {
    console.log("running on development");
    module.exports = {
        HOST: "localhost",
        USER: "root",
        PASS: "",
        POST: 3306,

        // database identification
        db: "second_hand",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            accurate: 30000,
            idle: 10000
        }
    }

} else if (process.env.ENVIROMENT === "production") {
    console.log("running on prodction");
    module.exports = {
        HOST: process.env.DB_HOST,
        USER: process.env.DB_USER,
        PASS: process.env.DB_PASS,
        POST: process.env.DB_PORT,

        // database identification
        db: process.env.DB_COLLECTION,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            accurate: 30000,
            idle: 10000
        }
    }
}
