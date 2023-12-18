// const { hollywood, bollywood } = require("../dummy");
// const {auth}=require('../middleware/auth')
const { bollywoodcon ,login, register} = require("../controller/categoriesController");

const categoryRoute=require("express").Router();

categoryRoute.get("/bollywood",bollywoodcon)

categoryRoute.post("/login",login)
categoryRoute.post("/register",register)
module.exports=categoryRoute
