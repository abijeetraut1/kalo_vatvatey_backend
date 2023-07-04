const router = require("express").Router();
const productController = require("./../controller/productController");

const authController = require('./../controller/authController')
const reviewController = require("./../controller/reviewController");
const dashboardController = require("../controller/dashboardController");

const { multer, storage } = require("./../servces/multer");
const upload = multer({ storage: storage });

router.post("/create_products",
    authController.isLoggedIn,
    authController.givePermissionTo("seller"),
    upload.array("photo", 5),
    productController.create_product
);

router.get("/show_products",
    productController.show_products
);

router.get("/show_one_product/:id",
    productController.showone
);

router.patch("/update_product/:id",
    authController.isLoggedIn,
    authController.checkuser,
    authController.givePermissionTo("seller"),
    productController.update_products
);

router.delete("/delete_product/:id",
    authController.isLoggedIn,
    authController.checkuser,
    authController.givePermissionTo("seller"),
    productController.delete_products
);


// review
router.post("/:id/review",
    authController.isLoggedIn,
    authController.checkuser,
    reviewController.review_upload
);

router.delete("/:id/review/delete",
    authController.isLoggedIn,
    authController.checkuser,
    reviewController.deleteReview
);

router.patch("/:id/review/update",
    authController.isLoggedIn,
    authController.checkuser,
    reviewController.updateReview
);


// add to cart
router.post("/addtocart/:productId",
    authController.isLoggedIn,
    authController.checkuser,
    productController.addToCart
);


// add to favourite 
router.post("/favourite/:productId",
    authController.isLoggedIn,
    authController.checkuser,
    productController.AddToFavourites
)


// dashboard / tracker seller
router.get("/dashboard/uploads",
    authController.isLoggedIn,
    authController.checkuser,
    dashboardController.viewUploads
);

router.get("/search/:key",productController.searchProduct)



module.exports = router;