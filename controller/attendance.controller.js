// external imports
const jwt = require("jsonwebtoken")

// internal imports
const Attendance = require("../models/attendance.model")

// add union
async function addAttendance(req, res){
    try {
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        const attendance = new Attendance({
            "user_id": req.user.id,
            "date": date,
            "time": time,
            "status": req.body.status,
            "remarks" : req.body.remarks,
        });       
        await attendance.save()
        res.status(200).json({
            message: "Present successfully"
        })

    } catch (error) {
        console.log(error.message)
    }


   
}



module.exports = {
    addAttendance
}