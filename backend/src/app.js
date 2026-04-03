const express  = require("express");
const cookieparser = require("cookie-parser")




const app = express();


app.use(express.json());
app.use(cookieparser())

//All routes require here 
const authRouter = require("./routes/auth.route.js")
const foodRouter = require("./routes/food.route.js")


//Use of all routes
app.use("/api/auth",authRouter)
app.use("/api/food",foodRouter)


// This is for check working or not
app.get("/",(req,res)=>{
    res.send("This is annat gupta site")
})









module.exports = app;