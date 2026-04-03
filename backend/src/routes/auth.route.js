const express = require("express");
const authController = require("../controllers/auth.controller.js")


const router = express.Router();

//User register /api/auth/register
router.post("/register",authController.registerUser)

//user login api /api/auth/login
router.post("/login",authController.loginUser)

//user logout /api/auth/logout
router.get("/logout",authController.loginUser)










module.exports = router;