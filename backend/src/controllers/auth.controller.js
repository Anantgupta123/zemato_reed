const userModel = require("../models/user.model.js")
const foodPatnerModel = require("../models/foodPatner.model.js")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {

    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

async function loginUser(req, res) {

    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

async function logoutUser(req, res) {

     const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "No token found"
            })
        }


     try{

        const decode = await jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findById(decode.id)

        req.user = user 

        res.clearCookie("token");

        res.status(200).json({
        user:user.fullName,
        message: "User logged out successfully"
    })
     } catch(err){
        console.log(err);
        console.log("Nhi hua re")
     }


    
}


async function foodPatnerRegister(req,res){

    const {name , contactName , phone , address , email , password} = req.body;

    const patnerUser = await foodPatnerModel.findOne({email});

    if(patnerUser){
        return res.status(400).json({
            message:"This is alreat exist btother",
            user:patnerUser.name
        })
    }

    const hash = await bcrypt.hash(password,10)

    const foodPatner = await foodPatnerModel.create({
        name,
        contactName,
        phone,
        address,
        email,
        password:hash

    })

    const token = jwt.sign({user:foodPatner._id},process.env.JWT_SECRET,{expiresIn:"4d"})

    res.cookie("token",token)

    res.status(200).json({
        message:"Your account create successfully",
        patner:foodPatner
    })

}


async function foodPatnerLogin(req,res){

    const {email , password} = req.body;

    const patnerUser = await foodPatnerModel.findOne({email});

    if(!patnerUser){
        return res.status(400).json({
            message:"invalid email plese check your email"
        })
    }

    const checkPassword = await bcrypt.compare(password,patnerUser.password)

    if(!checkPassword){
        return res.status(402).json({
            message:"Wrong password"
        })
    }

    const token = jwt.sign({user:patnerUser._id},process.env.JWT_SECRET,{expiresIn:"4d"})

    res.cookie("token",token)

    res.status(201).json({
        message:"User login successfully",
        user:patnerUser.name,
        email:patnerUser.email
    })


}

async function foodPatnerLogout(req,res){

    const token = req.cookies

    if(!token){

        return res.status(401).json({
            message:"You dont have token"
        })
    }

    
    res.clearCookie("token")

    res.status(201).json({
        messag:"User logout successfully"
    })

    
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    foodPatnerRegister,
    foodPatnerLogin,
    foodPatnerLogout

}