const express  = require("express");
const cookieparser = require("cookie-parser")




const app = express();


app.use(express.json());
app.use(cookieparser())


const authRouter = require("./routes/auth.route.js")

app.use("/api/auth",authRouter)

app.get("/",(req,res)=>{

    res.send("This is annat gupta site")
})









module.exports = app;