// internal imports
const Union = require("../models/union.model")

// add union
async function addUnion(req, res){
    try {
        const union = new Union({
            ...req.body,
        });       
        await union.save()
        res.status(200).json({
            message: "Union added successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Union did not added"
        })
    }
}



module.exports = {
    addUnion
}