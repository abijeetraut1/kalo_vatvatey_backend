const database = require("../index");
// const { DataTypes } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Garage = sequelize.define("garage", {
        garadgeName: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        contact: {
            type: DataTypes.STRING,
        },
    });

    return Garage;
};