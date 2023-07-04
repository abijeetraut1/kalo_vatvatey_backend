const statusFunc = require("../utils/statusFunc");

const database = require("../model/index");
const catchAsync = require("../utils/catchAsync");
const products = database.products;
const engineDependsOn = database.engineDependsOn;
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
        price += el.price * 1;
    })
    res.status(200).json({
        status: "success",
        totalWorthOfProduct: price,
        uploadData
    })
}

exports.viewTotalSales = catchAsync(async(req, res) => {
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
})

exports.engineRunsOn = catchAsync(async (req, res) => {
    const engine = await engineDependsOn.findAll({});
    if (!engine) {
        return statusFunc(res, 404, "admin hasn't upload any");
    }
    statusFunc(res, 200, engine);
})

exports.uploadEngineRunsOn = catchAsync(async (req, res) => {
    const alreadyUploaded = await engineDependsOn.findOne({
        where: {
            vehicleRunsOn: req.body.runsOn
        }
    })

    if(alreadyUploaded){
        return statusFunc(res, 400, "already uploaded");
    }

    await engineDependsOn.create({
        vehicleRunsOn: req.body.runsOn
    })

    statusFunc(res, 200, `uploaded engine ${req.body.vehicleRunsOn}`);
})

// admin can upload, see the request in which type does vehicle runs