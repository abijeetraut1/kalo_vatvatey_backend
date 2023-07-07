const database = require("../index");
module.exports = (sequelize, Sequelize) => {
    const bikesAndScootyCategory = sequelize.define("vehicleCategory", {
        vehicleCategory:{
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return bikesAndScootyCategory;
}