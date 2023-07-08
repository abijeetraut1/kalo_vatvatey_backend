const database = require("../index");

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        company: { // vehicle manufracturer
            type: Sequelize.INTEGER,
            allowNull: false
        },
        boughtYear: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false

        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        modal: { // vehicle modal
            type: Sequelize.STRING,
            allowNull: false
        },
        images: {
            type: Sequelize.JSON,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false
        },
        color: {
            type: Sequelize.STRING,
            allowNull: false
        },
        shortDescription: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        kmDriven: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ownerShip: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        engineDisplacement: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        milage: {
            type: Sequelize.STRING,
            allowNull: false
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false
        },
        wheelSize: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        isVerifiedByGarage: {
            type: Sequelize.ENUM("unchecked", "verified", "unverified"),
            allowNull: false
        },
        isDeleteByUser: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        isNegotiable: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
    })

    return Product;
}