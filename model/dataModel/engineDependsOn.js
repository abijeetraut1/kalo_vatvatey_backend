const database = require("../index");

module.exports = (sequelize, Sequelize) => {
    const engineDepends = sequelize.define("engineDepedsOn", {
        vehicleRunsOn: {
            type: Sequelize.STRING,
        }
    })
    return engineDepends;
}

// upload garako vehicle ma kun or k halera vehicle run hunxa
// eg:- EV, PETROL, DISEL, GAS or anything like that