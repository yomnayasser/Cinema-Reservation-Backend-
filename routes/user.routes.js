const user = require("../controllers/user.controller")
const router = require("express").Router()

router.post("/add",user.Register)

router.get("/login",user.login)

module.exports=router