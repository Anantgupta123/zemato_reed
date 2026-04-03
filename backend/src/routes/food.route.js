const express = require("express")
const foodController = require("../controllers/food.controller.js")
const middleware = require("../middleware/auth.middleware.js")

const router = express.Router()



router.post("/",middleware.foodPatnerVerification,foodController)




module.exports = router