const mongoose = require("mongoose");
//mongodb+srv://berlioz1188:60h3wLDm11woJbdU@cluster0.kbbt9xs.mongodb.net/?retryWrites=true&w=majority
//mongodb://localhost/cbae

//module.exports={"URI":"mongodb+srv://berlioz1188:60h3wLDm11woJbdU@cluster0.kbbt9xs.mongodb.net/Cbae?retryWrites=true&w=majoritymongodb+srv://berlioz1188:60h3wLDm11woJbdU@cluster0.kbbt9xs.mongodb.net/?retryWrites=true&w=majority"}

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