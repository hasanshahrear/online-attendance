// internal imports
const Designation = require("../models/designation.model")

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

// add designation
async function addDesignation(req, res){
    console.log(req.body);
    // try {
    //     const designation = new Designation({
    //         ...req.body,
    //     });       
    //     await designation.save()
    //     res.status(HTTP_OK).json({
    //         success: true,
    //         message: "Designation added successfully"
    //     })
    // } catch (error) {
    //     res.status(HTTP_SERVER_ERROR).json({
    //         success: false,
    //         message: error.message
    //     })
    // }
}

async function getAllDesignation(req, res){
    try {
        Designation.find({}, function(error, data){
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
    addDesignation,
    getAllDesignation
}