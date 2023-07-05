const database = require("../index");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        firstName: {
            type: Sequelize.STRING,
        },
        lastName:{
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        phone:{
            type: Sequelize.BIGINT
        },
        role: {
            type: Sequelize.STRING,
        },
        isVerified: {
            type: Sequelize.BOOLEAN   
        },
        verificationCode:{
            type: Sequelize.INTEGER
        }

    })

    return User;
}