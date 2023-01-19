// internal imports
const SubDistrict = require("../models/subDistrict.model")

// add subDistrict
async function addSubDistrict(req, res){
    try {
        const subDistrict = new SubDistrict({
            ...req.body,
        });       
        await subDistrict.save()
        res.status(200).json({
            message: "SubDistrict added successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "SubDistrict did not added"
        })
    }
}



module.exports = {
    addSubDistrict
}