const statusFunc = require("../utils/statusFunc");

const database = require("../model/index");
const catchAsync = require("../utils/catchAsync");
const products = database.products;
const user = database.users;
const engineDependsOn = database.engineDependsOn;
const category = database.vehicleCategory;
const {
    QueryTypes
} = require("sequelize");


exports.viewUploads = async (req, res) => {
    let price = 0;

    /////Start
    let allProducts
    try {
        allProducts = await database.sequelize.query("SELECT name, boughtYear, price, modal, location, color, userId, kmDriven, ownerShip, engineDisplacement, milage, category, wheelSize, isVerifiedByGarage, isDeleteByUser, isNegotiable, companyName, vehicleType, vehicleCategory, vehicleRunsOn FROM products JOIN vehicleCompanies ON products.companyId = vehicleCompanies.id JOIN vehiclecategories ON products.vehicleCategoryId = vehiclecategories.id JOIN enginedepedsons ON products.engineDepedsOnId = enginedepedsons.id ", {
            type: QueryTypes.SELECT,
        });
    } catch (error) {
        console.log(error)
    }
   
    res.status(200).json({
        status: "success",
        totalWorthOfProduct: price,
        allProducts
    })
}

exports.viewAllUser = async (req, res) => {
    const userLimit = 10;
    const currentPage = 1;
    const allUsers = await user.findAll({
        attributes: {
            exclude: ["password", "verificationCode", "isVerified", "createdAt", "updatedAt"]
        },
        limit: userLimit
    })
    const totalPages = Math.ceil(allUsers.length / userLimit);
    res.status(200).json({
        status: "success",
        length: allUsers.length,
        totalPages,
        currentPage,
        allUsers
    })
}

exports.viewTotalSales = catchAsync(async (req, res) => {
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

    if (alreadyUploaded) {
        return statusFunc(res, 400, "already uploaded");
    }

    await engineDependsOn.create({
        vehicleRunsOn: req.body.runsOn
    })

    statusFunc(res, 200, `uploaded engine ${req.body.vehicleRunsOn}`);
})

// admin can upload, see the request in which type does vehicle runs