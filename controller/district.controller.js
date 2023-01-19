// internal imports
const District = require("../models/district.model")

// add district
async function addDistrict(req, res){
    try {
        const district = new District({
            ...req.body,
        });       
        await district.save()
        res.status(200).json({
            message: "District added successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "District did not added"
        })
    }
}



module.exports = {
    addDistrict
}