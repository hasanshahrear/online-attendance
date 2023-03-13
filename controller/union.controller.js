// internal imports
const Union = require("../models/union.model")

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

// add union
async function addUnion(req, res){
    try {
        const union = new Union({
            ...req.body,
        });       
        await union.save()
        res.status(200).json({
            success: true,
            message: "Union added successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Union did not added"
        })
    }
}

async function getAllUnion(req, res){
    console.log(req.query.sub_district_id)
    try {
        const union = await Union.find({sub_district_id: req.query.sub_district_id})

        res.status(HTTP_OK).json({
            success: true,
            message: "Request successfully",
            data : union,
        })        
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}



module.exports = {
    addUnion,
    getAllUnion,
}