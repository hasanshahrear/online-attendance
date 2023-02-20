// internal imports
const District = require("../models/district.model");
const SubDistrict = require("../models/subDistrict.model")

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

// add subDistrict
async function addSubDistrict(req, res){
    try {
        District.find({}, async function(err, result) {
            if (err) {
                res.status(HTTP_SERVER_ERROR).json({
                    success: false,
                    message: err.message
                })
            } else {
                // try{
                    const subDistrict = new SubDistrict({
                        "district_id": result[0]._id.toString(),
                        ...req.body,
                    });    
                      
                    await subDistrict.save()
                    res.status(HTTP_OK).json({
                        success: true,
                        message: "SubDistrict added successfully"
                    })
                // }catch (error) {
                //     res.status(HTTP_SERVER_ERROR).json({
                //         success: false,
                //         message: error.message
                //     })
                // }
            }})
            
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    addSubDistrict
}