const database = require("../index");
module.exports = (sequelize, Sequelize) => {
    const addToCarts = sequelize.define("addToCarts", {
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        userId:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },

    })
    return addToCarts;
}