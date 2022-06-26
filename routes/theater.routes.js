const theater = require("../controllers/theater.controller")
const router = require("express").Router()

router.post('/add',theater.addTheater)

router.patch('/edit/:id',theater.editTheater)
router.patch('/addMovie/:id',theater.addMovie)

router.delete('/delete/:id',theater.deleteTheater)

router.get('/allTheaters',theater.getAllTheater)
router.get('/movieTheater/:id',theater.getMovieTheater)

module.exports=router