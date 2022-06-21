require('../database/connect')
const express= require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const movieRoutes=require("../routes/movie.routes")
app.use("/movie",movieRoutes)
module.exports = app
