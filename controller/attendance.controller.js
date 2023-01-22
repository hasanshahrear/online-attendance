// internal imports
const Attendance = require("../models/attendance.model")

// add union
async function addAttendance(req, res){
    try {
        const attendance = new Attendance({
            ...req.body,
        });       
        await attendance.save()
        res.status(200).json({
            message: "Present successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



module.exports = {
    addAttendance
}