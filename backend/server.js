const dotenv = require("dotenv")
const app = require("./src/app.js");
const connectdb = require("./src/db/db.js")


dotenv.config()
connectdb()

const port = process.env.PORT


app.listen(port || 3000,()=>{
    console.log("Server is connected to db")
})