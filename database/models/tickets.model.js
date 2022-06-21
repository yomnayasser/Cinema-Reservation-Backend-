const mongoose = require("mongoose");

const ticketSchema=mongoose.Schema({

    time:{
        type:String,
        require:true,
        trim:true
    },
    price:{
        type:Number,
        require:true,
        // trim:true
    },
    movieID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie",
        require:true
    },
    theaterID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Theater",
        require:true
    }
})

ticketSchema.methods.toJSON = function () {
    const ticket = this.toObject();
    delete ticket.__v;
    return ticket;
  };

  const ticket=mongoose.model("Ticket",ticketSchema)

  module.exports=ticket