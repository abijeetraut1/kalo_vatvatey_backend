const database = require("../index");
module.exports = (sequelize, Sequelize) => {
    const Favourite = sequelize.define("favourites", {
        userId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        productId:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
    return Favourite;
}