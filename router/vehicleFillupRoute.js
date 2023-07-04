const router = require("express").Router();

const database = require("../model/index");
const statusFunc = require("../utils/statusFunc");
const vehicleList = database.vehicleListModel;


router.get('/getvehicles', async (req, res) => {
    const vehicles = await vehicleList.findAll({});
    if(!vehicles){
        return statusFunc(res, 404, "vehicles type not found");
    }
    statusFunc(res, 200, vehicles);
});


router.get('/getvehicles/:type', async (req, res) => {
    const vehicles = await vehicleList.findAll({
        where: {
            vehicleType: req.params.type
        }
    });

    if(vehicles[0] == undefined){
        return statusFunc(res, 404, "vehicles type not found");
    }
    
    statusFunc(res, 200, vehicles);
});


module.exports = router;