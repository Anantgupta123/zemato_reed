const express  = require("express");
const authRouter = require("./routes/auth.route.js")



const app = express();


app.use(express.json());



app.get("/",(req,res)=>{

    res.send("This is annat gupta site")
})









module.exports = app;