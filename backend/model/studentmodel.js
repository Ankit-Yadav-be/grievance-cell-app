const mongoose = require("mongoose");


const studentSchema = mongoose.Schema({
    name:{
     type:String,
     required:true     
    },
    studentid:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
     branch:[
        {
            type:String,
            required:true
        }
     ],
     section:[
        {
            type:String,
            required:true
        }
     ],
     semester:[
        {

            type:String,
            required:true
        }
     ]
},{timestamps:true})


module.exports = new mongoose.model("student",studentSchema);