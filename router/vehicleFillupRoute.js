const router = require("express").Router();

const database = require("../model/index");
const statusFunc = require("../utils/statusFunc");
const vehicleList = database.brands;


router.get('/getvehicles', async (req, res) => {
    // const vehicles = await vehicleList.findAll({});
    
    // if(!vehicles){
    //     return statusFunc(res, 404, "vehicles type not found");
    // }
    statusFunc(res, 200, code);
});

const sequelizeQuery = async(model, schemaItem, queryValue) => {
    const vehicles = await model.findAll({
        where: {
            schemaItem: queryValue
        }
    });
    return vehicles;
}

router.get('/getvehicles/:type', async (req, res) => {
    let vehicles;
    if(req.params.type === "electric" || req.params.type === "non-electric"){
        vehicles = await vehicleList.findAll({
            where:{
                engineType: req.params.type
            }
        })
    }else if(req.params.type === "scooty" || req.params.type === "bike"){
        vehicles = await vehicleList.findAll({
            where:{
                vehicleType: req.params.type
            }
        })
    }

    if(vehicles[0] == undefined){
        return statusFunc(res, 404, "vehicles type not found");
    }
    
    statusFunc(res, 200, vehicles);
});

router.get('/getvehicles/:vehicletype/:enginetype', async (req, res) => {
    const vehicles = await vehicleList.findAll({
        where: {
            vehicleType: req.params.vehicletype,
            engineType: req.params.enginetype,
        }
    });

    if(vehicles[0] == undefined){
        return statusFunc(res, 404, "vehicles type not found");
    }
    
    statusFunc(res, 200, vehicles);
});


module.exports = router;