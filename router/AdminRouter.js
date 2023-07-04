const router = require("express").Router();

const dashboardController = require("./../controller/dashboardController");
const authController = require("./../controller/authController");

router.get("/view_all_uploads", 
    authController.isLoggedIn,
    authController.givePermissionTo("admin"),
    dashboardController.viewUploads
);

module.exports = router;