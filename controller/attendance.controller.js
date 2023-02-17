// internal imports
const Attendance = require("../models/attendance.model")

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

// add checkIn
async function checkIn(req, res){
    try {
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const existingRecord = await Attendance.findOne({
            user_id: req.user.id,
            date: date,
        });

        if (existingRecord) {
            existingRecord.check_in.push({ time: time, distance: req.body.distance });
            await existingRecord.save();
            res.status(200).json({
                message: "Present Update successfully"
            })
          } else {
            const attendance = new Attendance({
                "user_id": req.user.id,
                "date": date,
                "check_in": {
                    time:time,
                    distance: req.body.distance
                },
                "status": req.body.status,
                "remarks" : req.body.remarks,
            });       
            await attendance.save()
            res.status(HTTP_OK).json({
                message: "Present successfully"
            })
          }
    } catch (error) {
        console.log(error.message)
    }

}

// add checkOut
async function checkOut(req, res){
    try {
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const existingRecord = await Attendance.findOne({
            user_id: req.user.id,
            date: date,
        });

        if (existingRecord) {
            existingRecord.check_out.push({ time: time, distance: req.body.distance });
            await existingRecord.save();
            res.status(HTTP_OK).json({
                message: "Check Out successfully"
            })
          } else {
            res.status(HTTP_SERVER_ERROR).json({
                message: "You doesn't check in today"
            })
          }
    } catch (error) {
        console.log(error.message)
    }
}


// employee report
async function employeeReport(req, res){
    try{
        const employeeAttendance = await Attendance.find({user_id : req.user.id})
        if (employeeAttendance) {
            res.status(HTTP_OK).json({
                success: true,
                statusCode: 200,
                message: "All Attendance List",
                data: employeeAttendance
            })
        }
        else {
            res.status(HTTP_SERVER_ERROR).json({
                success: false,
                statusCode: 500,
                message: "Can't Find Attendance"
            })
          }
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
   checkIn,
   checkOut,
   employeeReport
}