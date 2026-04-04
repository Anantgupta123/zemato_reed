const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    food:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    foodPatner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FoodPatner"
    },
    likeCount:{
        type:Number,
        default:0
    },
    saveFoodCount:{
        type:Number,
        default:0
    }
    
})

const foodModel = mongoose.model("Food",foodSchema);

module.exports = foodModel;