const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    patner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Food",
        required:true
    }
},{
    timestamps:true
})

const likeModel = mongoose.model("Like",linkSchema)

module.exports = likeModel