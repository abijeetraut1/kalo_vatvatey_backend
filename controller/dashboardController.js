const statusFunc = require("../utils/statusFunc");

const database = require("../model/index");
const products = database.products;

exports.viewUploads = async (req, res) => {
    const uploadData = await products.findAll({
        attributes: {
            exclude: [
                "createdAt",
                "updatedAt",
                "images",
                "description",
                "shortDescription"
            ]
        }
    });
    statusFunc(res, 200, uploadData);
}

exports.viewTotalSales = async(req, res) => {
    const viewSalesData = await products.findAll({
        where: {
            isSold: true
        },
        attributes: {
            exclude: [
                "createdAt",
                "updatedAt",
                "images",
                "description",
                "shortDescription"
            ]
        }
    });
    statusFunc(res, 200, viewSalesData);
}