const express = require("express");
const router = express.Router();
const userController = require("../controller/authController");

router.post("/signup", userController.signup);

router.post("/login", userController.login);
router.post("/verification",
    userController.checkVerificationCode
);

// change role
router.patch("/change_role",
    userController.isLoggedIn,
    userController.checkVerifiedUser,
    userController.changeRole
);

router.post('/forgetPassword', userController.forgetPassword);
router.post("/resetPassword", userController.resetPassword);
router.patch("/update_password", userController.isLoggedIn, userController.updatePassword);


module.exports = router;