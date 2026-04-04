const express = require("express")
const foodController = require("../controllers/food.controller.js")
const middleware = require("../middleware/auth.middleware.js")
const uploadVideo = require("../middleware/video.middleware.js")
const serchFoodPatner = require("../controllers/serchFoodPatner.controller.js")

const router = express.Router()


//This is for uploading the reel
router.post("/",middleware.foodPatnerVerification,uploadVideo.single("video"),foodController.createFood)


//this is for view the reel
router.get("/food",middleware.userVerification,foodController.getFoodItem)

//this is for like the reel
router.post("/like",middleware.userVerification,foodController.likeFood)


// if user like the food save this
router.post("/save",middleware.userVerification,foodController.saveFoods)

//all user save get form this router
router.get("/save",middleware.userVerification,foodController.getSaveFood)

//serch by _id of food patner
router.get("/:id",middleware.userVerification,serchFoodPatner.getFoodPatnerById)






module.exports = router