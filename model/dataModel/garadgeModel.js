const database = require("../index");
// const { DataTypes } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
	const Garadge = sequelize.define("garadge", {
		garadgeName: {
			type: DataTypes.STRING,
		},
		location: {
			type: DataTypes.STRING,
		},
		city: {
			type: DataTypes.STRING,
		},
		contact: {
			type: DataTypes.STRING,
		},
	});

	return Garadge;
};
