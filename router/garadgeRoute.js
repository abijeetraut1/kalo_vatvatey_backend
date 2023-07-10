const router = require("express").Router();
const {
	addGaradge,
	displayAllGaradge,
	displayOneGaradge,
} = require("../controller/garadgeController");

router.post("/create-garadge", addGaradge);
router.get("/all-garadge", displayAllGaradge);
router.post("/view-garadge", displayOneGaradge);

module.exports = router;
