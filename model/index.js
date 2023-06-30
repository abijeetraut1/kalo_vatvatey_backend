const DBconfig = require("./../config/config");

const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(DBconfig.db, DBconfig.USER, DBconfig.PASS,{
    host: DBconfig.HOST,
    dialect: DBconfig.dialect,
    operatirAlias: false,
    loggin: false,
    pool:{
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
db.engineDependsOn = require("./dataModel/engineDependsOn")(sequelize, DataTypes);

// relation reviews
db.users.hasMany(db.reviews);
db.reviews.belongsTo(db.users );

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
db.products.hasMany(db.engineDependsOn);
db.engineDependsOn.belongsTo(db.products);

db.sequelize.sync({
    force: false
}).then(() => {
    console.log("yes! sync done");
})

module.exports = db;