const statusFunc = require("../utils/statusFunc");

const database = require("../model/index");
const products = database.products;

exports.viewUploads = async(req, res) => {
    const uploadedUserId = res.locals.userData.id;
    const uploadData = await products.findAll({userId: uploadedUserId});
    statusFunc(res, 200, uploadData);
}