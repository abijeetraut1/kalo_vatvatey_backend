const DBconfig = require("./../config/config");
const bcrypt = require("bcrypt");

// env files
require("dotenv").config();

const {
    Sequelize,
    DataTypes
} = require("sequelize");

const sequelize = new Sequelize(DBconfig.db, DBconfig.USER, DBconfig.PASS, {
    host: DBconfig.HOST,
    dialect: DBconfig.dialect,
    operatirAlias: false,
    loggin: false,
    port: DBconfig.POST,
    pool: {
        max: DBconfig.max,
        min: DBconfig.min,
        accurate: DBconfig.accurate,
        idle: DBconfig.idle
    }
})

sequelize.authenticate().then(() => {
    console.log("connected to database")
}).catch(err => {
    console.log("error" + err)
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./dataModel/userModel")(sequelize, DataTypes);
db.products = require("./dataModel/productsModel")(sequelize, DataTypes);
db.reviews = require("./dataModel/reviewModel")(sequelize, DataTypes);
db.favourites = require("./dataModel/favourite")(sequelize, DataTypes);
db.addToCarts = require("./dataModel/addToCart")(sequelize, DataTypes);
db.brands = require("./dataModel/vehicleCompany")(sequelize, DataTypes);
db.engineDependsUpon = require("./dataModel/engineDependsOn")(sequelize, DataTypes);
db.orders = require("./dataModel/orderModel")(sequelize, DataTypes);
db.vehicleCategory = require("./dataModel/vehicleCategory")(sequelize, DataTypes);
db.garage = require("./dataModel/garageModel")(sequelize, DataTypes);


// relation reviews
db.users.hasMany(db.reviews);
db.reviews.belongsTo(db.users);

// relation uploads product
db.users.hasMany(db.products);
db.products.belongsTo(db.users);

// relation to favourite
db.users.hasMany(db.favourites);
db.favourites.belongsTo(db.users);

// relation to add to cart 
db.users.hasMany(db.addToCarts);
db.addToCarts.belongsTo(db.users);

// bike models
db.brands.hasMany(db.products);
db.products.belongsTo(db.brands);

// vehicle run on model
db.engineDependsUpon.hasMany(db.products);
db.products.belongsTo(db.engineDependsUpon);

// order
db.users.hasMany(db.orders);
db.orders.belongsTo(db.users);

db.vehicleCategory.hasMany(db.products);
db.products.belongsTo(db.vehicleCategory);

// garage relation
db.garage.hasMany(db.products);
db.products.belongsTo(db.garage);

db.sequelize.sync({
    force: true
}).then(async () => {
    console.log("yes! sync done");
    await db.users.findOrCreate({
        where: {
            email: process.env.EMAIL
        },
        defaults: {
            firstName: process.env.FIRST_NAME,
            lastName: process.env.LAST_NAME,
            role: process.env.ROLE,
            contact: process.env.CONTACT,
            isVerified: 0,
            verificationCode: 123456,
            email: process.env.EMAIL,
            password: await bcrypt.hash(process.env.PASSWORD, 12)
        }
    }).then(() => {
        console.log("Admin Successfully seeded");
    }).catch(err => {
        return console.log(" error " + err);
    })  
})

module.exports = db;
