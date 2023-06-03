const mongoose = require('mongoose');
// internal imports
const Attendance = require("../models/attendance.model")
const User = require("../models/user.model")
const cron = require("node-cron");
const { useCheckHoliday } = require('./isHolidayCheck');
const IsHolidayCheck = require('../models/isHolidayCheck.model');
// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

// Run at 12:00 am every day
cron.schedule("0 0 * * *", async () => {
    await useCheckHoliday();
    try {
      const users = await User.find().exec();
      const day = await IsHolidayCheck.findOne().exec();
      const date = new Date().toLocaleDateString();
  
      if (!day) {
        console.error('Error finding weekly day');
        return;
      }
  
      const attendancePromises = users.map(user => {
        const remarks = day.holyDay ? day.remarks : "Absent";
        const attendance = new Attendance({
          user_id: user._id,
          date: date,
          status: false,
          remarks: remarks,
          leave: false,
          district: user.district,
          upazila: user.upazila,
          union: user.union
        });
        return attendance.save();
      });
  
      await Promise.all(attendancePromises);
    } catch (error) {
      console.error('Error:', error);
    }
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
            existingRecord.status = true;
            existingRecord.remarks = "Present";
            await existingRecord.save();
            res.status(200).json({
                success: true,
                message: "Present Update successfully"
            })
          } else {
            const attendance = new Attendance({
                user_id: req.user.id,
                date: date,
                check_in: {
                    time:time,
                    distance: req.body.distance
                },
                status: true,
                remarks: "Present",
                leave: false,
                district : req.user.district,
                upazila : req.user.upazila,
                union : req.user.union
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
                statusCode: HTTP_SERVER_ERROR,
                message: "Can't Find Attendance"
            })
        }
    }catch(error){
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            statusCode: HTTP_SERVER_ERROR,
            message: error.message
        })
    }
}

// employee report
async function allReport(req, res){
    try{
       const date = new Date().toLocaleDateString();
        
        const { remarks,district, upazila, union, user_id } = req.query; 

        const filter = {}; 

        if (remarks) {
            filter.remarks = { $regex: new RegExp(remarks, 'i') };
        }
        if(district){
            filter.district = { $regex: new RegExp(district, 'i') };
        }
        if(upazila){
            filter.upazila = { $regex: new RegExp(upazila, 'i') };
        }
        if(union){
            filter.union = { $regex: new RegExp(union, 'i') };
        }
        if(user_id){
            filter.user_id = mongoose.Types.ObjectId(user_id);
           
        }
        console.log(filter)
        Attendance.aggregate([
            {
                $match: {
                //   date, 
                  ...filter,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: '$user',
            },
            {
              $group: {
                _id: {
                    upazila: "$upazila",
                    union: "$union"
                  },
                data: { $push: '$$ROOT' },
              },
              
            },
            {
                $group: {
                  _id: "$_id.upazila",
                  unions: {
                    $push: {
                      union: "$_id.union",
                      data: "$data"
                    }
                  }
                }
              },
            
          ]).exec(function (err, result) {
              if (err) {
                res.status(HTTP_SERVER_ERROR).json({
                    success: false,
                    statusCode: 500,
                    message: err.message
                })
              }
              res.status(HTTP_OK).json({
                success: true,
                statusCode: 200,
                message: "All Attendance List",
                data: result
            })
            });

    }catch(error){
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            statusCode: HTTP_SERVER_ERROR,
            message: error.message
        })
    }
}

// single employee report admin view
async function employeeSingleReport(req, res) {
    try{
        const employeeAttendance = await Attendance.find({user_id : req.query.id})
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
                statusCode: HTTP_SERVER_ERROR,
                message: "Can't Find Attendance"
            })
        }
    }catch(error){
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            statusCode: HTTP_SERVER_ERROR,
            message: error.message
        })
    }
}

async function getLeave(req, res) {
    const date = new Date().toLocaleDateString();
    const existingRecord = await Attendance.findOne({
        user_id: req.user.id,
        date: date,
    });
    if (existingRecord) {
        existingRecord.leave = true
        existingRecord.remarks = "Leave"
        await existingRecord.save();
        res.status(HTTP_OK).json({
            success: true,
            message: "Leave successfully"
        })
    }
    console.log(existingRecord)
}

module.exports = {
   checkIn,
   checkOut,
   employeeReport,
   allReport,
   employeeSingleReport,
   getLeave
}