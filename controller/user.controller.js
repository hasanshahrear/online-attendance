// external imports
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// internal imports
const User = require("../models/user.model")

// signup new user
async function signup(req, res){
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({ ...req.body, password: hashedPassword})

    try {
        await user.save();

        res.status(200).json({
            success: true,
            message: "User added successfully",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// login user
async function login(req, res){
    try {
        const user = await User.findOne({email : req.body.email})
        
        if(user && user._id){
            isValidPassword = await bcrypt.compare(req.body.password, user.password)
            if(isValidPassword){
                const userobject = {
                    email: user.email,
                    id: user._id,
                }
                // generate token
                const token = jwt.sign(userobject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY
                })
                res.status(200).json({
                    success: true,
                    message: "Login successful",
                    token
                })
            }
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



module.exports = {
    signup,
    login
}