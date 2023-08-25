// internal imports
const District = require("../models/district.model")

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;
// add district
async function addDistrict(req, res){
    try {
        const district = new District({
            ...req.body,
        });       
        await district.save()
        res.status(HTTP_OK).json({
            success: true,
            message: "District added successfully"
        })
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}

// get all district
async function getAllDistrict(req, res){
    try {
        District.find({}, function(error, data){
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
    addDistrict,
    getAllDistrict
}