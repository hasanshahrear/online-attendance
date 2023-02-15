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
        const isLocationSet = await User.findOne( {phone : req.body.phone}, 'location' )
        
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
                    token,
                    location: isLocationSet.location
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
        const isLocationSet = await User.findOne( {_id: req.user.id} )

        if(isLocationSet.location === false){
            await User.findOneAndUpdate(
                {_id: req.user.id}, 
                {
                    office_location: {
                        "longitude" :    Number(req.body.longitude),
                        "latitude" : Number(req.body.latitude),
                    }
                })

            await User.findOneAndUpdate({_id: req.user.id}, {location: true})

            res.status(200).json({
                message: "Location update successfully"
            })
        }else{
            res.status(500).json({
                message: "Location Already Added"
            })
        }
        
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

async function getLocation(req, res){

    try{
        let isLocationSet = await User.findOne( {_id: req.user.id} )
        console.log("get-location-called")

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Request successfully",
            data: isLocationSet.office_location
        })
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