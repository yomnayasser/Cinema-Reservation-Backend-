const mongoose = require("mongoose");

theaterSchema=mongoose.Schema({

    theaterNumber:{
        type:Number,
        require:true,
       // trim:true
    },
    seatsNumber:{
        type:Number,
        require:true,
        // trim:true
    },
    movieID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie",
        require:true
    }
})

theaterSchema.methods.toJSON = function () {
    const theater = this.toObject();
    delete theater.__v;
    return theater;
  };

  const theater=mongoose.model("Theater",theaterSchema)

  module.exports=theater