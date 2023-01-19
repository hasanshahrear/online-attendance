// internal imports
const Division = require("../models/division.model")


// add division
async function addDivision(req, res){
    try {
        console.log(req.body)
        const division = new Division({
            ...req.body,
        });       
        await division.save()
        res.status(200).json({
            message: "Division added successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Division did not added"
            // message: error.message
        })
    }
}



module.exports = {
    addDivision
}