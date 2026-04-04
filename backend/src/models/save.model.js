const mongoose = require("mongoose");

const saveFoodSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Food"
    }
},{
    timestamps:true
})

const saveFoodModel = mongoose.model("SaveFood",saveFoodSchema);

module.exports = saveFoodModel;