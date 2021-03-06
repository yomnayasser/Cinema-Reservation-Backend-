const ticketModel = require("../database/models/tickets.model");
const theaterModel = require("../database/models/theater.model");

class Ticket {
  static buyTicket = async (req, res) => {
    try {
      const movieID = req.body.movieID;
      const theaterID = req.body.theaterID;
      const time = req.body.time;
      const date=req.body.date;
      const seatNum=req.body.seatNum
      let price
      let movieIndex;
      let dayIndex;
      let updateMovieIndex;
      const theater = await theaterModel.findById(theaterID);
      theater.movies.map((m, index) => {
        //console.log(m.movieID)
        if (String(m.movieID) == String(movieID)) {
          movieIndex = index;
          m.dayInfo.map((d,index)=>{
            if(d.date==date){
              dayIndex=index
              updateMovieIndex = d.sechudleTime.findIndex((t) => t.time == time);
            }
          })
          
        }
      });
      if (movieIndex != null) {
        const seatNumber =
          theater.movies[movieIndex].dayInfo[dayIndex].sechudleTime[updateMovieIndex].takenSeats.length;
         //console.log(seatNumber)
        if (seatNumber > theater.seatsNumber) {
          throw new Error("No Seats Left");
        } else {
          theater.movies[movieIndex].dayInfo[dayIndex].sechudleTime[
            updateMovieIndex
          ].takenSeats.push({"seatNumber":seatNum})
          
          await theater.save();
          price=theater.movies[movieIndex].dayInfo[dayIndex].sechudleTime[
            updateMovieIndex
          ].price
          const ticketInfo={...req.body, price:price}
          const ticket = new ticketModel(ticketInfo)
          await ticket.save()
          res.status(200).send({
            apiStatus: true,
            data: {theater,ticket},
            message: "Theater updated & Ticket added",
          });
        }
      }
      else throw new Error("No Movie Found");
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };

  static cancelTicket=async(req,res)=>{
   try{
    const ticketID=req.params.id
    const ticket= await ticketModel.findById(ticketID)

    const theaterID=ticket.theaterID
    const movieID=ticket.movieID
    const time= ticket.time
   // console.log("movieID  " + movieID)

    const theater= await theaterModel.findById(theaterID)
   console.log(theater)
    let movieIndex
    let  updateMovieIndex

    theater.movies.map((m, index) => {
      if (String(m.movieID) == String(movieID)) {
        movieIndex = index;
        updateMovieIndex = m.sechudleTime.findIndex((t) => t.time == time);
      }
    });
    if (movieIndex != null) {
      theater.movies[movieIndex].sechudleTime[
        updateMovieIndex
      ].takenSeats-=1
      await theater.save();
      await ticketModel.findByIdAndDelete(ticketID)
      res.status(200).send({
        apiStatus: true,
        message: "Theater updated & Ticket deleted",
      });
    }
    else throw new Error("No Movie Found");
  }
  catch (e) {
    res.status(500).send({ apiStatus: false, error: e, message: e.message });
  }
}
}

module.exports = Ticket;
