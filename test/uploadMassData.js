const scooty_list = [{
        "company": "Honda",
        "type": "Non-electric"
    },
    {
        "company": "TVS",
        "type": "Non-electric"
    },
    {
        "company": "Suzuki",
        "type": "Non-electric"
    },
    {
        "company": "Yamaha",
        "type": "Non-electric"
    },
    {
        "company": "Hero",
        "type": "Non-electric"
    },
    {
        "company": "Vespa",
        "type": "Non-electric"
    },
    {
        "company": "Mahindra",
        "type": "Non-electric"
    },
    {
        "company": "Aprilia",
        "type": "Non-electric"
    },
    {
        "company": "SYM",
        "type": "Non-electric"
    },
    {
        "company": "Benelli",
        "type": "Non-electric"
    },
    {
        "company": "Keeway",
        "type": "Non-electric"
    },
    {
        "company": "LML",
        "type": "Non-electric"
    },
    {
        "company": "Bajaj",
        "type": "Non-electric"
    },
    {
        "company": "NIU",
        "type": "Electric"
    },
    {
        "company": "Haojue",
        "type": "Non-electric"
    },
    {
        "company": "Jagadamba",
        "type": "Non-electric"
    },
    {
        "company": "Agni",
        "type": "Electric"
    },
    {
        "company": "Yatri",
        "type": "Electric"
    },
    {
        "company": "KTM",
        "type": "Non-electric"
    },
    {
        "company": "UM",
        "type": "Non-electric"
    },
    {
        "company": "Eco Infinity",
        "type": "Electric"
    },
    {
        "company": "Okapi",
        "type": "Electric"
    },
    {
        "company": "Eco Voltz",
        "type": "Electric"
    },
    {
        "company": "Energica",
        "type": "Electric"
    },
    {
        "company": "Super Soco",
        "type": "Electric"
    },
    {
        "company": "Evolet",
        "type": "Electric"
    }
]

const bike_list = [{
        "company": "Honda",
        "type": "Non-electric"
    },
    {
        "company": "Yamaha",
        "type": "Non-electric"
    },
    {
        "company": "Bajaj",
        "type": "Non-electric"
    },
    {
        "company": "TVS",
        "type": "Non-electric"
    },
    {
        "company": "Suzuki",
        "type": "Non-electric"
    },
    {
        "company": "Royal Enfield",
        "type": "Non-electric"
    },
    {
        "company": "Hero",
        "type": "Non-electric"
    },
    {
        "company": "KTM",
        "type": "Non-electric"
    },
    {
        "company": "CFMoto",
        "type": "Non-electric"
    },
    {
        "company": "Benelli",
        "type": "Non-electric"
    },
    {
        "company": "Mahindra",
        "type": "Non-electric"
    },
    {
        "company": "UM",
        "type": "Non-electric"
    },
    {
        "company": "Aprilia",
        "type": "Non-electric"
    },
    {
        "company": "Bimota",
        "type": "Non-electric"
    },
    {
        "company": "Ducati",
        "type": "Non-electric"
    },
    {
        "company": "Harley-Davidson",
        "type": "Non-electric"
    },
    {
        "company": "Indian",
        "type": "Non-electric"
    },
    {
        "company": "Kawasaki",
        "type": "Non-electric"
    },
    {
        "company": "Kymco",
        "type": "Non-electric"
    },
    {
        "company": "MV Agusta",
        "type": "Non-electric"
    },
    {
        "company": "Piaggio",
        "type": "Non-electric"
    },
    {
        "company": "SWM",
        "type": "Non-electric"
    },
    {
        "company": "Triumph",
        "type": "Non-electric"
    },
    {
        "company": "Vespa",
        "type": "Non-electric"
    },
    {
        "company": "Zero",
        "type": "Electric"
    },
    {
        "company": "Energica",
        "type": "Electric"
    }
]


// const engineDependsOn = require("../model/dataModel/engineDependsOn");
const database = require("./../model/index");
const scooty = database.brands;
const engineDepends = database.engineDependsUpon;
const vehicleCategory = database.vehicleCategory;
const garage = database.garage;

const uploadScooty = async (data, type) => {
    await scooty.create({
        companyName: data.company.toLowerCase(),
        vehicleType: type
    })
}

const engineDependsOn = async (item) => {
    await engineDepends.create({
        vehicleRunsOn: item
    })
}



scooty_list.forEach(ele => {
    uploadScooty(ele, "scooty");
});

bike_list.forEach(ele => {
    uploadScooty(ele, "bike");
})

const list = ["diesel", "electric power", "biofuels", "hydrogen", "petrol"];
list.forEach(el => {
    engineDependsOn(el)
})


const bikeCategory = [
    "super bike",
    "normal",
    "cruiser bike",
    "Naked bike",
    "Adventure bike",
    "Touring bike",
    "dual-sports bike",
    "Motocross bike"
]


const linkedGarage = [{
        name: "santi garage",
        location: "itahari",
        contact: "kheti khola",
        contact: "9800000000",
        city: "anywhere"
    }, {
        name: "asnti garage",
        location: "belbari",
        contact: "kesala khola",
        contact: "9800000000",
        city: "anywhere"
    },
    {
        name: "basanti garage",
        location: "kerabari",
        contact: "kerabari khola",
        contact: "9800000000",
        city: "anywhere"
    }
]

const uploadGarage = async(el) => {
    await garage.create({
        garadgeName: el.name,
        location: el.location,
        city: el.city,
        contact: el.contact
    })
}

linkedGarage.forEach(el => {
    uploadGarage(el);
})


const vehicleCate = async (el) => {
    await vehicleCategory.create({
        vehicleCategory: el
    })
}

bikeCategory.forEach(el => {
    vehicleCate(el);
})
