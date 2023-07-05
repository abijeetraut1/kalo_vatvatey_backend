const database = require("../index");

module.exports = (sequelize, Sequelize) => {
    const order = sequelize.define("order", {
        userId: {
            type: Sequelize.INTEGER
        },
        productId: {
            type: Sequelize.INTEGER
        },
        address: {
            type: Sequelize.STRING
        },
        province:{
            type: Sequelize.STRING
        },
        street:{
            type: Sequelize.STRING
        }
    })
    return order;
}