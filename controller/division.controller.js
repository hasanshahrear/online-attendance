// external imports


// internal imports
const Division = require("../models/division.model")


// add todo
async function addDivision(req, res){
    try {
        const division = new Division({
            user: req.user.id,
            ...req.body,
        });       
        await division.save()
        res.status(200).json({
            message: "Division added successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Division did not added"
        })
    }
}



module.exports = {
    addDivision
}