// external imports
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// internal imports
const User = require("../models/user.model")

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

// signup new user
async function signup(req, res){
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({ ...req.body, password: hashedPassword})

    try {
        await user.save();

        res.status(HTTP_OK).json({
            success: true,
            message: "User added successfully",
        })

    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}

// login user
async function login(req, res){
    try {
        const user = await User.findOne({phone : req.body.phone})
        const {location, first_name, last_name, phone, designation, office_address} = user
        if(user && user._id){
            isPasswordValid  = await bcrypt.compare(req.body.password, user.password)
            if(isPasswordValid ){
                const userObject = {
                    phone: user.phone,
                    id: user._id,
                }
                // generate token
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY
                })
                res.status(HTTP_OK).json({
                    success: true,
                    message: "Login successful",
                    token,
                    location: location,
                    user: {
                        first_name,
                        last_name,
                        phone,
                        designation,
                        office_address
                    }
                })
            }
        }
        
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}

// update location
async function updateLocation(req, res){
    try{
        const {location} = await User.findOne( {_id: req.user.id} )

        if(location === false){
            await User.findOneAndUpdate(
                {_id: req.user.id}, 
                {
                    office_location: {
                        "longitude" :    Number(req.body.longitude),
                        "latitude" : Number(req.body.latitude),
                    }
                })

            await User.findOneAndUpdate({_id: req.user.id}, {location: true})

            res.status(HTTP_OK).json({
                message: "Location update successfully"
            })
        }else{
            res.status(HTTP_SERVER_ERROR).json({
                message: "Location Already Added"
            })
        }
        
    }catch(error){
        res.status(HTTP_SERVER_ERROR).json({
            message: error.message
        })
    }
}

async function getLocation(req, res){

    try{
        let isLocationSet = await User.findOne( {_id: req.user.id} )
        console.log("get-location-called")

        res.status(HTTP_OK).json({
            success: true,
            statusCode: 200,
            message: "Request successfully",
            data: isLocationSet.office_location
        })
    }catch(error){
        res.status(HTTP_SERVER_ERROR).json({
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