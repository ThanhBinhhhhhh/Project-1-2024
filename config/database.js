const mongoose = require("mongoose");

module.exports.connect = async() => {
    try {
       await mongoose.connect(process.env.MONGO_URL);
       console.log("Success")
    } catch (error) {
        console.log("No Success")
    }
}
mongoose.connect(process.env.MONGO_URL);