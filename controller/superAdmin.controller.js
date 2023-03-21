// external imports
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// internal imports
const SuperAdmin = require("../models/superAdmin.model")

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

// signup new user
async function adminSignup(req, res){
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new SuperAdmin({ ...req.body, password: hashedPassword})

    try {
        await user.save();

        res.status(HTTP_OK).json({
            success: true,
            message: "Admin added successfully",
        })

    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}

// login user
async function adminLogin(req, res){
    try {
        const user = await SuperAdmin.findOne({phone : req.body.phone})
        
        if(user && user._id){
            isPasswordValid  = await bcrypt.compare(req.body.password, user.password)
            if(isPasswordValid ){
                const userObject = {
                    phone: user.phone,
                    id: user._id,
                    admin: true,
                }
                // generate token
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY
                })
                res.status(HTTP_OK).json({
                    success: true,
                    message: "Login successful",
                    token,
                })
                console.log(user)
            }else{
                res.status(HTTP_SERVER_ERROR).json({
                    success: false,
                    message: "Not a valid user"
                })
            }
        }else{
            res.status(HTTP_SERVER_ERROR).json({
                success: false,
                message: "Not a valid user"
            })
        }
        
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    adminSignup,
    adminLogin,
}