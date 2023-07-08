const router = require("express").Router();

const dashboardController = require("./../controller/dashboardController");
const authController = require("./../controller/authController");

router.get("/view_all_products",
    // authController.isLoggedIn,
    // authController.givePermissionTo("admin"),
    dashboardController.viewUploads
);

router.get("/view_all_users", dashboardController.viewAllUser)

router.get("/total_sales", 
    authController.isLoggedIn, 
    authController.givePermissionTo("admin"),
    dashboardController.viewTotalSales
);

router.get("/engine_dependson", 
    authController.isLoggedIn, 
    authController.givePermissionTo("admin"),
    dashboardController.engineRunsOn
)

router.post("/upload_engine_dependson", 
    authController.isLoggedIn, 
    authController.givePermissionTo("admin"),
    dashboardController.uploadEngineRunsOn
)

module.exports = router;
