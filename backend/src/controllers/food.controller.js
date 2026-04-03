const foodModel = require("../models/food.model.js")


async function createFood(req,res){

    console.log(req.user)

    res.send("Anant gupta")
}





module.exports = createFood;


