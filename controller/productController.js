const multer = require("multer");
const {
    QueryTypes,
    Op
} = require("sequelize");
const catchAsync = require('../utils/catchAsync');
const database = require('./../model/index');
const vehicleCompany = require("../model/dataModel/vehicleCompany");
const product = database.products;
const addToCart = database.addToCarts;
const favourite = database.favourites;
const statusFunc = require("./../utils/statusFunc");

const multerStorage = multer.memoryStorage();
require("dotenv").config();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        console.log("image not found");
        process.exit(1);
    }
}

const upload = {
    storage: multerStorage,
    fileFilter: multerFilter
}



exports.create_product = async (req, res) => {
    try {
        const imagesName = [];
        req.files.forEach(ele => {
            imagesName.push(ele.filename)
        });

        const created_product = await product.create({
            name: req.body.name,
            companyId: req.body.company * 1,
            boughtYear: req.body.year * 1,
            price: req.body.price * 1,
            description: req.body.description,
            modal: req.body.modal,
            images: imagesName,
            location: req.body.location,
            shortDescription: req.body.shortDescription,
            userId: res.locals.userData.id,
            vehicleCompanyId: req.body.vehicleCompany * 1,
            color: req.body.color,
            kmDriven: req.body.kmDriven * 1,
            ownerShip: req.body.ownership * 1,
            engineDisplacement: req.body.engineDisplacement * 1,
            milage: req.body.milage * 1,
            wheelSize: req.body.wheelsize * 1,
            engineDepedsOnId: req.body.engineDependsUpon * 1,   // foreginKey
            vehicleCategoryId: req.body.vehicleCategory * 1,    // foreginKey
            garageId: req.body.garageId * 1,    // foreginKey
            category: req.body.category,    // foreginKey
            isSold: false,
            isDeleteByUser: false,
            isNegotiable: req.body.negotiable,
            isVerifiedByGarage: "unchecked"
        })
        statusFunc(res, 201, created_product);
    } catch (err) {
        if (process.env.ENVIROMENT === "development") {
            statusFunc(res, 500, {
                status: "failed",
                message: `Please Insert: ${err.errors[0].path}`,
                stack: err.stack
            });
        } else if (process.env.ENVIROMENT === "production") {
            statusFunc(res, 500, "SERVER IS UNDER MAINTAINENCE! PLEASE WAIT");
        }
    }
}

exports.checkSold = catchAsync(async (req, res) => {
    const listedProduct = await product.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!listedProduct) {
        return statusFunc(res, 404, "item not found");
    }

    listedProduct.isSold = listedProduct.isSold ? false : true;
    listedProduct.save();

    statusFunc(res, 200, listedProduct.isSold ? "congrulations! on selling your product" : "ooh! haven't sold yet");
})

exports.show_products = catchAsync(async (req, res) => {
    const showed_products = await database.products.findAll({
        where: {
            isDeleteByUser: false
        }
    });
    statusFunc(res, 200, showed_products);
})

exports.show_filter_product = catchAsync(async (req, res) => {
    const {
        minPrice,
        maxPrice,
        vehicleId,
        color
    } = req.query;

    const filter = {};

    console.log(req.query)

    filter.price = {
        [Op.between]: [minPrice * 1, maxPrice * 1]
    }

    if (vehicleId !== undefined) {
        if(vehicleId != ''){
            filter.vehicleCompanyId = vehicleId * 1;
        }
    }

    if (color !== undefined) {
        if (color != '') {
            filter.color = color;
        }
    }

    const filteredProducts = await product.findAll({
        where: filter
    });

    statusFunc(res, 200, filteredProducts);
});

exports.delete_products = catchAsync(async (req, res) => {
    const deleteProduct = await product.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!deleteProduct) {
        return statusFunc(res, 404, "cannot find the item you are trying to delete");
    }

    deleteProduct.isDeleteByUser = true;
    deleteProduct.save();
    statusFunc(res, 200, "item delete successfully");
})

exports.showone = catchAsync(async (req, res) => {
    const showone = await product.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!showone) {
        return statusFunc(res, 404, "cannot find that product");
    }

    statusFunc(res, 200, showone);
})

// update product
exports.update_products = catchAsync(async (req, res) => {
    const {
        name,
        brand,
        years,
        description,
        price,
        modal
    } = req.body;
    
    const update_product = await product.findOne({
        where: {
            id: req.params.id
        }
    });

    console.log(update_product);
    if (!update_product) {
        return statusFunc(res, 404, "cannot find the product you are searching");
    }
    update_product.name = name;
    update_product.brand = brand;
    update_product.years = years;
    update_products.description = description;
    update_products.price = price;
    update_products.modal = modal;
    update_product.save();

    statusFunc(res, 200, update_product);
})


// add to cart
exports.addToCart = catchAsync(async (req, res) => {
    console.log("user" + res.locals.userData.id, " product " + req.params.productId);

    const checkCart = await addToCart.findOne({
        where: {
            userId: res.locals.userData.id,
            productId: req.params.productId * 1
        }
    })

    if (checkCart) {
        return statusFunc(res, 403, "already added in cart");
    }

    const add_to_cart = await addToCart.create({
        userId: res.locals.userData.id,
        productId: req.params.productId * 1
    })

    statusFunc(res, 201, add_to_cart);
})

exports.AddToFavourites = catchAsync(async (req, res) => {
    const checkFavourite = await favourite.findOne({
        where: {
            userId: res.locals.userData.id,
            productId: req.params.id
        }
    })

    if (checkFavourite) {
        return statusFunc(res, 403, "already added in favourite");
    }

    const add_favourite = await favourite.create({
        userId: res.locals.userData.id,
        productId: req.params.id
    })

    statusFunc(res, 201, add_favourite)
})


exports.searchProducts = catchAsync(async (req, res, next) => {
    const searchQuery = `%${req.params.key}%`
    console.log(searchQuery)
    let search;

    let color = [];
    let type = [];
    let ownerShip = [];
    let company = [];
    let modal = [];

    try {
        search = await database.sequelize.query("SELECT * FROM products JOIN vehicleCompanies ON products.company = vehicleCompanies.id  WHERE products.name LIKE ? OR vehicleCompanies.companyName LIKE ? OR products.modal LIKE ? ", {
            type: QueryTypes.SELECT,
            replacements: [searchQuery, searchQuery, searchQuery]
        });

        search.forEach(item => {

            // color
            if (color.includes(item.color)) {
                return;
            } else if (!color.includes(item.color)) {
                color.push(item.color);
            }

            // vehicleType
            if (type.includes(item.vehicleType)) {
                return;
            } else if (!type.includes(item.vehicleType)) {
                type.push(item.vehicleType);
            }

            // ownership
            if (ownerShip.includes(item.ownerShip)) {
                return;
            } else if (!ownerShip.includes(item.ownerShip)) {
                ownerShip.push(item.ownerShip);
            }

            // company
            if (company.includes(item.companyName)) {
                return;
            } else if (!company.includes(item.companyName)) {
                company.push(item.companyName);
            }

            // modal
            if (modal.includes(item.modal)) {
                return;
            } else if (!modal.includes(item.modal)) {
                modal.push(item.modal);
            }

            // category


        })
    } catch (error) {
        console.log(error);
    }

    console.log(color)
    return res.status(200).json({
        status: "sucess",
        length: search.length,
        company,
        modal,
        color,
        type,
        ownerShip,
        search
    })

})

// order product
