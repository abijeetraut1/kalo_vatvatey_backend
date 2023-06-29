const database = require("../index");

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        name: {
            type: Sequelize.STRING,
        },
        company: {   // vehicle manufracturer
            type: Sequelize.INTEGER,
        },
        years: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        engineType: {  // electric / non-electric
            type: Sequelize.STRING
        },
        modal: {  // vehicle modal
            type: Sequelize.STRING,
        },
        images: {
            type: Sequelize.JSON,
        },
        shortDescription: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        isSold:{
            type: Sequelize.BOOLEAN
        },
        isDeleteByUser:{
            type: Sequelize.BOOLEAN
        },
        isNegotiable:{
            type: Sequelize.BOOLEAN
        }
    })

    return Product;
}

// foregin id ko lagi schema ma banai rakhnu pardaina

// ITEMS TO BE ADDED 
// 1. CATEGORY
// 2. BRAND SHOULD BE ID
// 2. 

// category
// EV
// SPORTS
// CLASSIC 
// ADVENTURE
// SCOOTERS
// OFFROAD
// SUPERMOTO