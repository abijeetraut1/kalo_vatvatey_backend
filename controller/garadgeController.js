const database = require("./../model/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const catchAsync = require("../utils/catchAsync");
const products = database.products;
const garadge = database.garadge;

exports.addGaradge = async (req, res, next) => {
	const data = req.body;
	const findGaradge = await garadge.findOne({
		where: { garadgeName: data.garadgeName, contact: data.contact },
	});
	if (findGaradge) {
		return res.status(409).json({ message: "Garage already exists" });
	}

	const createGaradge = await garadge.create({
		garadgeName: data.garadgeName,
		location: data.location,
		city: data.city,
		contact: data.contact,
	});
	res
		.status(201)
		.json({ success: true, message: "create", garadge: createGaradge });
};

exports.displayAllGaradge = async (req, res, next) => {
	const allGaradge = await garadge.findAll();

	if (allGaradge == 0) {
		return res.json({
			message: "No Garadge",
		});
	}
	return res.json({ status: "success", allGaradge });
};

exports.displayOneGaradge = async (req, res, next) => {
	const data = req.body;
	const findGaradge = await garadge.findOne({
		where: { garadgeName: data.garadgeName, contact: data.contact },
	});
	res.json({
		status: "sucess",
		garadge: findGaradge,
	});
};
