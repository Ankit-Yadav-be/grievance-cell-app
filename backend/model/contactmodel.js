const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    studentid:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = new mongoose.model("contact",contactSchema);