const multer = require("multer");
const {
    QueryTypes,
    Op
} = require("sequelize");
const catchAsync = require('../utils/catchAsync');
const database = require('./../model/index');
const vehicleCompany = database.brands;
const product = database.products;
const addToCart = database.addToCarts;
const engineDepedsOn = database.engineDependsUpon;

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

const extractorIdBySlug = async (model, field) => {
    let searchedField;
    if (model === "companyName") {
        searchedField = await vehicleCompany.findOne({
            where: {
                companyName: field
            }
        })
    } else if (model === "vehicleCompany") {
        searchedField = await vehicleCompany.findOne({
            where: {
                companyName: field
            }
        })
    } else if (model === "engineRunsOn") {
        searchedField = await engineDepedsOn.findOne({
            where: {
                vehicleRunsOn: field
            }
        })
    } else if (model === "vehicleCategory") {
        searchedField = await database.vehicleCategory.findOne({
            where: {
                vehicleCategory: field
            }
        })
    } else if (model === "garage") {
        searchedField = await database.garage.findOne({
            where: {
                garadgeName: field
            }
        })
    }
    return searchedField.id;
}



exports.create_product = async (req, res) => {
    try {
        const imagesName = [];
        req.files.forEach(ele => {
            imagesName.push(ele.filename)
        });

        console.log(await extractorIdBySlug("companyName", req.body.company));

        const created_product = await product.create({
            name: req.body.name.trim(),
            companyId: await extractorIdBySlug("companyName", req.body.company),
            boughtYear: req.body.year * 1,
            price: req.body.price * 1,
            modal: req.body.modal,
            images: imagesName,
            location: req.body.location,
            userId: res.locals.userData.id,
            vehicleCompanyId: req.body.vehicleCompany * 1,
            color: req.body.color,
            kmDriven: req.body.kmDriven * 1,
            ownerShip: req.body.ownership * 1,
            engine: req.body.engine * 1,
            mileage: req.body.milage * 1,
            engineDepedsOnId: await extractorIdBySlug("engineRunsOn", req.body.engineDependsUpon), // foreginKey
            vehicleCategoryId: await extractorIdBySlug("vehicleCategory", req.body.vehicleCategory), // foreginKey
            garageId: await extractorIdBySlug("garage", req.body.garage), // foreginKey
            isSold: false,
            break: req.body.break,
            tireType: req.body.tireType,
            isDeleteByUser: false,
            isNegotiable: req.body.negotiable,
            isVerifiedByGarage: "unchecked",
            slug: req.body.name.trim().replaceAll(" ", "-")
        })

        console.log(created_product);
        statusFunc(res, 201, created_product);
    } catch (err) {
        if (process.env.ENVIROMENT === "development") {
            statusFunc(res, 500, {
                status: "failed",
                stack: err,
                message: `Please Insert: ${err}`,
            });
        } else {
            statusFunc(res, 500, {
                msg: "SERVER IS UNDER MAINTAINENCE! PLEASE WAIT",
                err
            });
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
        if (vehicleId != '') {
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
            slug: req.params.slug
        }
    });

    if (!showone) {
        return statusFunc(res, 404, "cannot find that product");
    }

    statusFunc(res, 200, showone);
})

// update product
// need to be updated
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
// exports.addToCart = catchAsync(async (req, res) => {
//     console.log("user" + res.locals.userData.id, " product " + req.params.productId);

//     const checkCart = await addToCart.findOne({
//         where: {
//             userId: res.locals.userData.id,
//             productId: req.params.productId * 1
//         }
//     })

//     if (checkCart) {
//         return statusFunc(res, 403, "already added in cart");
//     }

//     const add_to_cart = await addToCart.create({
//         userId: res.locals.userData.id,
//         productId: req.params.productId * 1
//     })

//     statusFunc(res, 201, add_to_cart);
// })

// exports.AddToFavourites = catchAsync(async (req, res) => {
//     const checkFavourite = await favourite.findOne({
//         where: {
//             userId: res.locals.userData.id,
//             productId: req.params.id
//         }
//     })

//     if (checkFavourite) {
//         return statusFunc(res, 403, "already added in favourite");
//     }

//     const add_favourite = await favourite.create({
//         userId: res.locals.userData.id,
//         productId: req.params.id
//     })

//     statusFunc(res, 201, add_favourite)
// })


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
