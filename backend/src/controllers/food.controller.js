const foodModel = require("../models/food.model.js")
const storageService = require("../services/storage.service.js")
const {v4:uuid} = require("uuid")



async function createFood(req,res){

    const uploadFilet = await storageService.uploadFile(req.file.buffer,uuid())

    console.log(uploadFilet)



    
}





module.exports = createFood;


