const theaterModel = require("../database/models/theater.model");
const movieModel = require("../database/models/movie.model");

class Theater {
  static addTheater = async (req, res) => {
    try {
      const newTheater = new theaterModel(req.body);
      await newTheater.save();
      res.status(200).send({
        apiStatus: true,
        data: newTheater,
        message: "data added",
      });
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };

  static editTheater = async (req, res) => {
    try {
      const id = req.params.id;
      const editData = req.body;
      const theater = await theaterModel.findByIdAndUpdate(id, editData, {
        runValidators: true,
      });
      res.status(200).send({
        apiStatus: true,
        data: theater,
        message: "data editied",
      });
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };

  static deleteTheater = async (req, res) => {
    try {
      const id = req.params.id;
      await theaterModel.findByIdAndDelete(id);
      res.status(200).send({
        apiStatus: true,
        message: "data deleted",
      });
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };

  static getAllTheater = async (req, res) => {
    try {
      const theaters = await theaterModel.find();
      res.status(200).send({
        apiStatus: true,
        data: theaters,
        message: "all theaters",
      });
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };

  static addMovie = async (req, res) => {
    try {
      const theaterID = req.params.id;
      const movieID = req.body;
      const theater = await theaterModel.findById(theaterID);
      theater.movies.push(movieID);
      await theater.save();
      res.status(200).send({
        apiStatus: true,
        data: theater,
        message: "movie added",
      });
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };

  static getMovieTheater = async (req, res) => {
    try {
      const movieID = req.params.id;
      const theaterID= await theaterModel.findOne({'theaters.movies':movieID})
      res.status(200).send({
            apiStatus: true,
            data: theaterID._id,
            message: "Theater ID",
          });
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };

  static getTheater=async(req,res)=>{
   try{
    const theaterID=req.params.id;
    const theater=await theaterModel.findById(theaterID)
    res.status(200).send({
      apiStatus: true,
      data: theater,
      message: "Theater",
    });
   }
   catch (e) {
    res.status(500).send({ apiStatus: false, error: e, message: e.message });
  }
  }

  static getMovieSchudleTime=async(req,res)=>{
    try{
      const theaterID=req.params.theaterID;
      const movieID=req.params.movieID;
      const date=req.params.date
      let sechudleTime
      const theater=await theaterModel.findById(theaterID)
      //console.log(theater)
      let seatsNumber=theater.seatsNumber
      theater.movies.map((m, index) => {
       // console.log(m.movieID)
        if (String(m.movieID) == String(movieID)) {
          m.dayInfo.map((d)=>{
            if(d.date==date){
              sechudleTime = d.sechudleTime;
            }
          })
         
        }
      });
      res.status(200).send({
        apiStatus: true,
        data: {sechudleTime,seatsNumber},
        message: " Movie's Theater sechudleTime",
      });
     }
     catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
    }

   
      static getMovieDates=async(req,res)=>{
        try{
          const theaterID=req.params.theaterID;
          const movieID=req.params.movieID;
          let dates=[]
          const theater=await theaterModel.findById(theaterID)
          theater.movies.map((m, index) => {
           // console.log(m.movieID)
            if (String(m.movieID) == String(movieID)) {
              m.dayInfo.map((d)=>{
               dates.push(d.date)
              })
             
            }
          });
          res.status(200).send({
            apiStatus: true,
            data: {dates},
            message: " Movie's Theater Dates",
          });
         }
         catch (e) {
          res.status(500).send({ apiStatus: false, error: e, message: e.message });
        }
        
    }
}


module.exports = Theater;
