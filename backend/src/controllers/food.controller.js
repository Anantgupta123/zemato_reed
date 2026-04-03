const foodModel = require("../models/food.model.js")


async function createFood(req,res){

    console.log(req.user)
    console.log(req.body)

    res.send("Anant gupta")
}





module.exports = createFood;


