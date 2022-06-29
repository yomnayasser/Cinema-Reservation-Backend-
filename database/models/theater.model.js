const mongoose = require("mongoose");

theaterSchema = mongoose.Schema({
  theaterNumber: {
    type: Number,
    require: true,
    // trim:true
  },
  seatsNumber: {
    type: Number,
    require: true,
    // trim:true
  },
  movies: [
    {
      movieID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        require: true,
      },
      sechudleTime: [
        {
          time: {
            type: String,
            require: true,
            trim: true,
          },
          takenSeats: {
            type: Number,
            require: true,
          },
          price:{
            type:Number,
            require:true
          }
        },
      ],
    },
  ],
  movieType: {
    type: String,
    required: true,
    trim: true,
    enum: ["3D", "Front"],
  },
});

theaterSchema.methods.toJSON = function () {
  const theater = this.toObject();
  delete theater.__v;
  return theater;
};

const theater = mongoose.model("Theater", theaterSchema);

module.exports = theater;
