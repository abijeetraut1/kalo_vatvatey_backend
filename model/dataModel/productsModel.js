const database = require("../index");

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        name: {                         // product name
            type: Sequelize.STRING,
            // allowNull: false
        },
        companyId: {                    // kun company ko gadi ho ie: honda, pulser etc
            type: Sequelize.INTEGER,    
            // allowNull: false
        },
        boughtYear: {                   // year of vehicle bought
            type: Sequelize.INTEGER,
            // allowNull: false
        },
        price: {                        // estimated price of vehicle
            type: Sequelize.INTEGER,
            // allowNull: false
        },
        modal: {                        // vehicle modal
            type: Sequelize.STRING,
            // allowNull: false
        },
        images: {                       // images of vehicle
            type: Sequelize.JSON,
            // allowNull: false
        },
        location: {                     // location of vehicle uploader
            type: Sequelize.STRING,
            // allowNull: false
        },
        color: {                        // vehicle color
            type: Sequelize.STRING,
            // allowNull: false
        },
        userId: {                       // uploader id
            type: Sequelize.INTEGER,
            // allowNull: false
        },
        kmDriven: {                     // how many KM does uploaded vehicle runned 
            type: Sequelize.INTEGER,
            // allowNull: false
        },
        ownerShip: {                    // was is second hand or third hand
            type: Sequelize.INTEGER,
            // allowNull: false
        },
        engine: {           // vehicle cc's (kati cc ko gadi ho) 
            type: Sequelize.INTEGER,
            // allowNull: false
        },
        mileage: {                       // kati ko milage dinxa uploaded vehicle le
            type: Sequelize.STRING,
            // allowNull: false
        },
        category: {                     // kun category ko gadi ho eg: Naked, Normal, Sports
            type: Sequelize.STRING,
            // allowNull: false
        },
        break:{
            type: Sequelize.STRING,
            // allowNull: false
        },
        isVerifiedByGarage: {           // tied-up garage le verify garako xa ki xaina 
            type: Sequelize.ENUM("unchecked", "verified", "unverified"),
            // allowNull: false
        },
        isDeleteByUser: {               // product delete garera delete garako xa ki xaina
            type: Sequelize.BOOLEAN,
            // allowNull: false
        },
        tireType: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        isNegotiable: {                 // listed price kam hunxa ki hudaina 
            type: Sequelize.BOOLEAN,
            // allowNull: false
        },
        slug:{
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Product;
}

/*
    removed from model:
        1. description 
        2. short description
*/