const express = require("express")
const foodController = require("../controllers/food.controller.js")
const middleware = require("../middleware/auth.middleware.js")
const uploadVideo = require("../middleware/video.middleware.js")

const router = express.Router()



router.post("/",middleware.foodPatnerVerification,uploadVideo.single("video"),foodController.createFood)

router.get("/food",middleware.userVerification,foodController.getFoodItem)




module.exports = router