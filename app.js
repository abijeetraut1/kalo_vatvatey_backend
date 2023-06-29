const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const process = require("node:process");

const app = express();
const port = 800;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routers
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productsRouter");
const adminRouter = require("./router/AdminRouter");
const vehicleRouter = require("./router/vehicleFillupRoute");


const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}

app.use(cookieParser());

// page gateway
app.use("/api/v1/user", cors(corsOptions), userRouter);
app.use("/api/v1/products", cors(corsOptions), productRouter);
app.use("/api/v1/admin", cors(corsOptions), adminRouter);  // -> super admin pannel
app.use("/vehicles", cors(corsOptions), vehicleRouter);


// server 
const server = app.listen(port, () => {
    console.log("server is running at port : ", port);
})

process.on('unhandledRejection', (err) => {
    console.log("unhandeled promise rejection");
    server.close(() => {
        process.exit(1);
    })
})
