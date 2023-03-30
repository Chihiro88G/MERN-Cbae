const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload({ useTempFiles: true }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env"
    })
}

// Route imports
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const payment = require("./routes/PaymentRoute");
const cart = require("./routes/WishListRoute");

app.use("/api/v2", product);

app.use("/api/v2", user);

app.use("/api/v2", order);

app.use("/api/v2", payment);

app.use("/api/v2", cart);

//*** changed path from frontend/build to backend/build to make backend work 20230320 ***/
app.use(express.static(path.join(__dirname, "../backend/build")));

//*** changed path from frontend/build to backend/build/index.html to make backend work 20230320 ***/
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../backend/index.html"));
})

// it's for errorHandeling
app.use(ErrorHandler);

// database setup
let mongoose = require('mongoose');
let DB = require('./db/Database');

// point mongoose to the DB URI
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
    console.log('Connected to MongoDB...');
});

module.exports = app