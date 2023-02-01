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
        const user = await User.findOne({phone : req.body.phone})
        
        if(user && user._id){
            isValidPassword = await bcrypt.compare(req.body.password, user.password)
            if(isValidPassword){
                const userObject = {
                    phone: user.phone,
                    id: user._id,
                }
                // generate token
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
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

// update location
async function updateLocation(req, res){
    try{
        let isLocationSet = await User.findOne( req.body._id )

        if(isLocationSet.location === false){
            await User.findOneAndUpdate(req.body._id, {office_location: req.body.office_location})
            await User.findOneAndUpdate(req.body._id, {location: true})
            res.status(200).json({
                message: "Location update successfully"
            })
        }else{
            res.status(200).json({
                message: "Location Already Added"
            })
        }
        
        console.log(isLocationSet.location)
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

async function getLocation(req, res){
    try{
        let isLocationSet = await User.findOne( req.body._id )
        res.status(200).json({
            success: true,
            message: "Request successfully",
            data: isLocationSet.office_location
        })
        console.log(isLocationSet.location)
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    signup,
    login,
    updateLocation,
    getLocation,
}