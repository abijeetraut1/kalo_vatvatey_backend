const database = require("../index");


module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        brand: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        years: {
            type: Sequelize.STRING,  
            allowNull: true
        },
        price: {
            type: Sequelize.STRING,
            allowNull: true
        },
        description:{
            type: Sequelize.STRING,
            allowNull: true
        },
        modal:{
            type: Sequelize.STRING,
            allowNull: true
        },
        images:{
            type: Sequelize.JSON,
            allowNull: true
        },
        shortDescription:{
            type: Sequelize.STRING,
            allowNull: true
        },
        userId:{
            type: Sequelize.INTEGER,
            // allowNull: true
        }
    })

    return Product;
}


/*
    STRING = 250 WORDS
    TEXT = 500 W0RDS
*/


// ITEMS TO BE ADDED 
// 1. CATEGORY
// 2. BRAND SHOULD BE ID
// 2. 
