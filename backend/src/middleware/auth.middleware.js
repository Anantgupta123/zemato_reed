const userModel = require("../models/user.model.js");
const foodPatnerModel = require("../models/foodPatner.model.js")
const jwt = require("jsonwebtoken")

async function userVerification(req,res,next){

    const token = req.cookies.token;

    if(!token){
        return res.status(400).json({
            message:"You dont have access token"
        })
    }

    try{

        const decode = await jwt.verify(token,process.env.JWT_SECRET);

        const user = await userModel.findById(decode.id)

        req.user = user

        next()
    } catch(err){
        console.log(err)
        console.log("Erroe on controller")
    }
}

async function foodPatnerVerification(req,res,next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Do not have token"
        })
    }

    try{

        const decode = await jwt.verify(token,process.env.JWT_SECRET)

        const user = await foodPatnerModel.findById(decode.user)

        console.log(decode)

        req.user = user
        
        next()


     } catch(err){
        console.log(err);
        console.log("Nhi hua re")
     }
}


module.exports = {
    userVerification,
    foodPatnerVerification
}