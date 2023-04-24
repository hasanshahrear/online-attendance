// internal imports
const Attendance = require("../models/attendance.model")
const User = require("../models/user.model")
const cron = require("node-cron");
// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

// Run at 12:00 am every day
cron.schedule("0 0 * * *", async () => {
    const users = await User.find();
    const date = new Date().toLocaleDateString();

    for (const user of users) {
      const attendance = new Attendance({
        user_id: user._id,
        date: date,
        status: false,
        remarks: ""
      });
      await attendance.save();
    }

    console.log(`Attendance marked for ${users.length} users`);
  });


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
            existingRecord.status = "true";
            await existingRecord.save();
            res.status(200).json({
                success: true,
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
                success: true,
                message: "Present successfully"
            })
          }
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
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
                success: true,
                message: "Check Out successfully"
            })
        }else {
            res.status(HTTP_SERVER_ERROR).json({
                success: false,
                message: "You doesn't check in today"
            })
        }
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}


// employee report
async function employeeReport(req, res){
    try{
        const employeeAttendance = await Attendance.find({user_id : req.user.id})
        if (employeeAttendance.length > 0) {
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
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            statusCode: 500,
            message: error.message
        })
    }
}

// employee report
async function allReport(req, res){
    console.log(req.user)
    try{
       const date = new Date().toLocaleDateString();
        Attendance.find({date}).populate('user_id').exec((err, attendanceRecords) => {
            if (err) {
                res.status(HTTP_SERVER_ERROR).json({
                    success: false,
                    statusCode: 500,
                    message: "Can't Find Attendance"
                })
            } else {
                res.status(HTTP_OK).json({
                    success: true,
                    statusCode: 200,
                    message: "All Attendance List",
                    data: attendanceRecords
                })
            }
          });
    }catch(error){
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            statusCode: 500,
            message: error.message
        })
    }
}

module.exports = {
   checkIn,
   checkOut,
   employeeReport,
   allReport
}