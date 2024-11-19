const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    userId: String,
    company: String,
    productImage: { 
        type: String // Store the Base64 string here
    }
})

module.exports = mongoose.model("products",userSchema)