const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  language: {
    type: String,
    required: true,
    trim: true,
  },
  category: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  time: {
    type: String,
    required: true,
    trim: true,
  },
  descreption: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    trim: true,
  },
  trailer: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
    enum: ["Playing","Coming Soon"],
  },
  image:{
    type: String,
    required: true,
    trim: true,
  },
  actors: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  directors: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  writers: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

movieSchema.methods.toJSON = function () {
  const movie = this.toObject();
  delete movie.__v;
  return movie;
};

const movie = mongoose.model("Movie", movieSchema);

module.exports = movie;
