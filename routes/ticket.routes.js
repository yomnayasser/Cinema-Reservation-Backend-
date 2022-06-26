const ticket = require("../controllers/ticket.controller")
const router = require("express").Router()

router.post('/add',ticket.buyTicket)

router.delete('/delete/:id',ticket.cancelTicket)


module.exports=router