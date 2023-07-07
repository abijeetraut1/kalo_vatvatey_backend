const database = require("../index");

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        name: {
            type: Sequelize.STRING,
        },
        company: { // vehicle manufracturer
            type: Sequelize.INTEGER,
        },
        boughtYear: {
            type: Sequelize.INTEGER,
        },
        price: {
            type: Sequelize.INTEGER,
        },
        description: {
            type: Sequelize.STRING,
        },
        modal: { // vehicle modal
            type: Sequelize.STRING,
        },
        images: {
            type: Sequelize.JSON,
        },
        color: {
            type: Sequelize.STRING,
        },
        shortDescription: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        kmDriven: {
            type: Sequelize.INTEGER,
        },
        ownerShip: {
            type: Sequelize.INTEGER
        },
        engineDisplacement: {
            type: Sequelize.INTEGER
        },
        milage: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING,
        },
        wheelSize: {
            type: Sequelize.INTEGER,
        },
        isSold: {
            type: Sequelize.BOOLEAN
        },
        isDeleteByUser: {
            type: Sequelize.BOOLEAN
        },
        isNegotiable: {
            type: Sequelize.BOOLEAN
        },
    })

    return Product;
}