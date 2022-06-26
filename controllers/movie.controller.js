const movieModel = require("../database/models/movie.model");
const fs = require("fs");
const path = require("path");
class Movie {
  static addMovie = async (req, res) => {
    try {
      const newMovie = new movieModel(req.body);
      await newMovie.save();
      res.status(200).send({
        apiStatus: true,
        data: newMovie,
        message: "data added",
      });
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };
  static editmovie = async (req, res) => {
    try {
      const movieID = req.params.id;
      const movie = await movieModel.findByIdAndUpdate(movieID, req.body, {
        runValidators: true,
      });
      res.status(200).send({
        apiStatus: true,
        data: movie,
        message: "data editied",
      });
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };
  static deleteMovie = async (req, res) => {
    try {
      const movieID = req.params.id;
      await movieModel.findByIdAndDelete(movieID);
      res.status(200).send({
        apiStatus: true,
        message: "data deleted",
      });
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };
  static addActor = async (req, res) => {
    try {
      const id = req.params.id;
      const newActor = req.body;
      const movie = await movieModel.findById(id);
      movie.actors.push(newActor);
      await movie.save();
      res
        .status(200)
        .send({ data: movie, apiStatus: true, message: "Actor Added" });
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };
  static addDirector = async (req, res) => {
    try {
      const id = req.params.id;
      const newDirector = req.body;
      const movie = await movieModel.findById(id);
      movie.actors.push(newDirector);
      await movie.save();
      res
        .status(200)
        .send({ data: movie, apiStatus: true, message: "Director Added" });
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };
  static addWriter = async (req, res) => {
    try {
      const id = req.params.id;
      const newWriter = req.body;
      const movie = await movieModel.findById(id);
      movie.actors.push(newWriter);
      await movie.save();
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };

  // static addDataTime= async(req,res)=>{
  //   try{
  //     const id=req.params.id
  //     const dateTime=req.body
  //     const movie=await movieModel.findById(id)
  //     movie.dateTime.push(dateTime)
  //     await movie.save();
  //     res
  //       .status(200)
  //       .send({ data: movie, apiStatus: true, message: "Movie updated" });
  //   }
  //   catch (e) {
  //     res.status(500).send({ apiStatus: false, error: e, message: e.message });
  //   }
  // }

  static addImage = (req, res) => {
    const ext = path.extname(req.file.originalname);
    const newName = "images/" + req.file.fieldname + Date.now() + ext;
    fs.rename(req.file.path, newName, () => {});
    return newName;
  };

  static getAllMovies = async (req, res) => {
    try {
      const movies = await movieModel.find();
      res.status(200).send({
        apiStatus: true,
        data: movies,
        message: "All movies",
      });
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };

  static getMovie=async(req,res)=>{
    const id=req.params.id
    try{
      const movie=await movieModel.findById(id)
      res.status(200).send({
        apiStatus: true,
        data: movie,
        message: "movie data",
      });
    }
    catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  }
}

module.exports = Movie;
