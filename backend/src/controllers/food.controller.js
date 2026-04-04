const foodModel = require("../models/food.model.js")
const foodPatnerModel = require("../models/foodPatner.model.js")
const storageService = require("../services/storage.service.js")
const {v4:uuid} = require("uuid")



async function createFood(req,res){

    const uploadFilet = await storageService.uploadFile(req.file.buffer,uuid())


    const video = uploadFilet.url
    const {food , description} = req.body
    const foodPatner = req.user._id

    const patnerName = await foodPatnerModel.findById(foodPatner)

    const foodItem = await foodModel.create({
        food,
        video,
        description,
        foodPatner
    })

    res.status(201).json({
        message:"Reel is created",
        reel:foodItem,
        Owner:patnerName.name
    })


    
}

async function getFoodItem(req,res){

    const foodItem = await foodModel.find();

    res.status(200).json({
        message:"Food item fetch successfully",
        FoodItem:foodItem
    })


}





module.exports = {
    createFood,
    getFoodItem
}


