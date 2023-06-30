const database = require("../index");

module.exports = (sequelize, Sequelize) => {
    const engineDependsOn = sequelize.define("engineDepedsOn", {
        vehicleRunsOn: {
            type: Sequelize.STRING,
        }
    })
    return engineDependsOn;
}

// upload garako vehicle ma kun or k halera vehicle run hunxa
// eg:- EV, PETROL, DISEL, GAS or anything like that