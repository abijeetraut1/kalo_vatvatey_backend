const database = require("../index");

module.exports = (sequelize, Sequelize) => {
    const brands = sequelize.define("vehicleCompany", {
        companyName:{
            type: Sequelize.STRING,
            allowNull: false
        },
        vehicleType:{
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return brands;
} 