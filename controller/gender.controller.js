// internal imports
const Gender = require("../models/gender.model")

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

// add designation
async function addGender(req, res){
    try {
        const designation = new Gender({
            ...req.body,
        });       
        await designation.save()
        res.status(HTTP_OK).json({
            success: true,
            message: "Gender added successfully"
        })
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}

async function getAllGender(req, res){
    try {
        Gender.find({}, function(error, data){
            if(error){
                res.status(HTTP_SERVER_ERROR).json({
                    success: false,
                    message: error.message
                })
            }else{
                res.status(HTTP_OK).json({
                    success: true,
                    message: "Request successfully",
                    data,
                })
            }
        })
        
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}



module.exports = {
    getAllGender,
    addGender,
}