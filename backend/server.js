const app = require("./app");
const connectDatabase = require("./db/Database.js");
const cloudinary = require("cloudinary");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for Handling uncaught Exception`);
})

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env"
    })
}

// connect database used for local connection
// connectDatabase();

cloudinary.config({
    cloud_name: 'dvfdufp3n',
    api_key: '959872493144847',
    api_secret: '6cbGG_6Evgrp92KAruN665B8fvs'
})

const port = 4000;

// create server
const server = app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
})

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down server for ${err.message}`);
    console.log(`Shutting down the server due to Unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    });
});