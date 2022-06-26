const multer  = require('multer')
const upload = multer({ dest: 'images/' })

const movie = require("../controllers/movie.controller")
const router = require("express").Router()

router.post('/add',movie.addMovie)

router.patch('/edit/:id',movie.editmovie)

router.delete('/delete/:id',movie.deleteMovie)

router.patch('/addActor/:id',movie.addActor)
router.patch('/addDirector/:id',movie.addDirector)
router.patch('/addWriter/:id',movie.addWriter)
// router.patch('/addDateTime/:id',movie.addDataTime)

router.patch('/addPoster', upload.single('poster'),movie.addImage)

router.get('/allMovies',movie.getAllMovies)
router.get('/getMovie/:id',movie.getMovie)

module.exports=router