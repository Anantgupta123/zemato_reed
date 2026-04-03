const mongoose = require("mongoose")

async function connectdb(){

    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database is connected to server ")
    })
    .catch((err)=>{
        console.log("Not connected to server")
        console.log("Your err => ",err)
    })
}

module.exports = connectdb;