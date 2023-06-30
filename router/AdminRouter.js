const router = require("express").Router();

const dashboardController = require("./../controller/dashboardController");
const authController = require("./../controller/authController");

router.get("/view_all_uploads",
    authController.isLoggedIn,
    authController.givePermissionTo("admin"),
    dashboardController.viewUploads
);

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

/*
    1. total sales
    2. show all upload product
    3. special offer reduce
    4. add voucher type
    5. loggin verification
    4.  

*/