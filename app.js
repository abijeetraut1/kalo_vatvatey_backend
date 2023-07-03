const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productsRouter");
const adminRouter = require("./router/AdminRouter");
const vehicleRouter = require("./router/vehicleFillupRoute");


const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200

}

app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("FRom helo page")
})

// page gateway
app.use("/api/v1/user", cors(corsOptions), userRouter);
app.use("/api/v1/products", cors(corsOptions), productRouter);
app.use("/api/v1/admin", cors(corsOptions), adminRouter);  // -> super admin pannel
app.use("/vehicles", cors(corsOptions), vehicleRouter);


// server 
const server = app.listen(port, () => {
    console.log("server is running at port : ", port);
})
