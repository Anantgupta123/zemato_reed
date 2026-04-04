const foodPatnerModel = require("../models/foodPatner.model");
const foodModel = require("../models/food.model.js")

async function getFoodPatnerById(req,res){

    const foodPatnerId = req.params.id;

    const foodPatner = await foodPatnerModel.findById(foodPatnerId);

    const foods = await foodModel.find({foodPatner:foodPatnerId})

    if(!foodPatner){
        return res.status(401).json({
            message:"Does not have any food patner",

        })
    }

    res.status(201).json({
        message:"successfully find your patner",
        ptner:foodPatner.contactName,
        allFood:foods
    })
}

module.exports = {
    getFoodPatnerById
}
