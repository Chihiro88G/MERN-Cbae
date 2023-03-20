const mongoose = require("mongoose");


const connectDatabase = () => {
    // need to create "cbae" on local first
    mongoose.connect("mongodb://localhost/cbae", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data) => {
        console.log(`mongodb is connected with server: ${data.connection.host}`);
    })
}

module.exports = connectDatabase