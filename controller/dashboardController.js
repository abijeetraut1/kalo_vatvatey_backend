const statusFunc = require("../utils/statusFunc");

const database = require("../model/index");
const products = database.products;
// const 

exports.viewUploads = async (req, res) => {
    let price = 0;
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

    uploadData.forEach(el => {
        price+=el.price * 1;
    })
    res.status(200).json({
        status: "success",
        totalWorthOfProduct: price,
        uploadData
    })
}

exports.viewTotalSales = async(req, res) => {
    let price = 0;
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
    viewSalesData.forEach(el => {
        price += el.price * 1;
    })

    res.status(200).json({
        status: "success",
        totalSoldProduct: price,
        viewSalesData
    })
}

exports.engineRunsOn = async(req, res) => {
    
}

exports.uploadEngineRunsOn = async(req, res) => {
    
}

// admin can upload, see the request in which type does vehicle runs