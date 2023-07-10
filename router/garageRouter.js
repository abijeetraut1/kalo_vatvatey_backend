const router = require("express").Router();
const {
    addGaradge,
    displayAllGaradge,
    displayOneGaradge,
} = require("../controller/garageController");

router.post("/register-garadge", addGaradge);
// router.get("/all-garadge", displayAllGaradge);   this should be admin pannel
router.post("/view-garadge", displayOneGaradge);    

module.exports = router;