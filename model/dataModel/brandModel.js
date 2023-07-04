const database = require("../index");

module.exports = (sequelize, Sequelize) => {
    const brands = sequelize.define("vehicleBrands", {
        companyName:{
            type: Sequelize.STRING,
            allowNull: false
        },
        engineType: {
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