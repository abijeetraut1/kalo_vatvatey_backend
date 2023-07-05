const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const process = require("node:process");
const globalErrorHandler = require('./utils/globalErrorHandler');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productsRouter");
const adminRouter = require("./router/AdminRouter");
const vehicleRouter = require("./router/vehicleFillupRoute");
const statusFunc = require("./utils/statusFunc");


const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
}

app.use(cookieParser());

// page gateway
app.use("/api/v1/user", cors(corsOptions), userRouter);
app.use("/api/v1/products", cors(corsOptions), productRouter);
app.use("/api/v1/admin", cors(corsOptions), adminRouter);  // -> super admin pannel
app.use("/vehicles", cors(corsOptions), vehicleRouter);

app.use(globalErrorHandler)

app.all("*", (req, res, next) => {
    return statusFunc(res, 400, "Cannot Find The Page That You Are Searching For")
})

// server 
const server = app.listen(port, () => {
    console.log("server is running at port : ", port);
})