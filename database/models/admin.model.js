const mongoose = require("mongoose");

const adminSchema=mongoose.Schema({
    username:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        required: true,
        trim:true,
        match:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    }
})