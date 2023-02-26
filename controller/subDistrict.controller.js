// internal imports
const SubDistrict = require("../models/subDistrict.model")

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

// add subDistrict
async function addSubDistrict(req, res){
    try{
        const subDistrict = new SubDistrict({
            "district_id": req.body.district_id,
           "sub_district_name": req.body.sub_district_name,
        })  
        
        console.log(subDistrict)
          
        await subDistrict.save()
        res.status(HTTP_OK).json({
            success: true,
            message: "SubDistrict added successfully"
        })
    }catch (error) {
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}

async function getAllSubDistrict(req, res){
    try {
        console.log(req.query.district_id)
        SubDistrict.find({district_id:req.query.district_id}, function(error, data){
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
    addSubDistrict,
    getAllSubDistrict
}