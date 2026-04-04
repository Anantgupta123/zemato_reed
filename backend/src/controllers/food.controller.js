const foodModel = require("../models/food.model.js")
const foodPatnerModel = require("../models/foodPatner.model.js")
const storageService = require("../services/storage.service.js")
const likeModel = require("../models/like.model.js")
const saveFoodModel  = require("../models/save.model.js")
const {v4:uuid} = require("uuid")
const userModel = require("../models/user.model.js")



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


async function likeFood(req,res){

    const {foodId}  = req.body;

    const user = req.user;

    const isAlreadyLike = await likeModel.findOne({
        user:user._id,
        food:foodId
    })

    if(isAlreadyLike){
        await likeModel.deleteOne({
            user:user._id,
            food:foodId
        })

        await foodModel.findByIdAndUpdate(foodId,{
            $inc:{likeCount: -1}
        })

        return res.status(200).json({
            message:"Unlike the food"
        })
    }

    const like = await likeModel.create({
        user:user._id,
        food:foodId
    })

    await foodModel.findByIdAndUpdate(foodId,{
            $inc:{likeCount: 1}
    })

    res.status(200).json({
        message:"Like the food",
        like:like
    })

}


async function saveFoods(req,res){

    const {foodId}  = req.body;
    const user = req.user


    const isAlreadysaveFood = await saveFoodModel.findOne({
        user:user._id,
        food:foodId
    })

    if(isAlreadysaveFood){
        await saveFoodModel.deleteOne({
            user:user._id,
            food:foodId
        })

        await foodModel.findByIdAndUpdate(foodId,{
            $inc:{saveFoodCount: -1}
        })

        return res.status(200).json({
            message:"Unsaved the food"
        })
    }

    const saveFood = await saveFoodModel.create({
        user:user._id,
        food:foodId
    })

    await foodModel.findByIdAndUpdate(foodId,{
            $inc:{saveFoodCount: 1}
    })

    res.status(200).json({
        message:"save the food",
        like:saveFood
    })





}

async function getSaveFood(req,res){

    const user = req.user;

    const saveFood = await saveFoodModel.find({user:user._id}).populated("food");

    if(!saveFood || saveFood.length === 0){

        return res.status(400).json({
            message:"Nothis to save"
        })
    }

    res.status(201).json({
        message:"Ye li bhai tera food",
        save:saveFood
    })

    
}

module.exports = {
    createFood,
    getFoodItem,
    likeFood,
    saveFoods,
    getSaveFood

}


