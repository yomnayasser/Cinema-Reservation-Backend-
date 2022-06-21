const mongoose = require("mongoose");

const userSchema=mongoose.Schema({

    name:{
        type:String,
        require:true,
        trim:true
    },
    age:{
        type:Number,
        require:true,
        // trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    address:{
        type:String,
        trim:true
    },
   
})

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.__v;
    return user;
  };

  const user=mongoose.model("User",userSchema)

  module.exports=user