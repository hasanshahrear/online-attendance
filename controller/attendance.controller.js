const mongoose = require('mongoose');
// internal imports
const Attendance = require("../models/attendance.model")
const User = require("../models/user.model")
const District = require("../models/district.model")
const cron = require("node-cron");
const { useCheckHoliday } = require('./isHolidayCheck');
const IsHolidayCheck = require('../models/isHolidayCheck.model');
// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

// Run at 12:00 am every day
// cron.schedule("0 0 * * *", async () => {
//     await useCheckHoliday();
//     try {
//       const users = await User.find().exec();
//       const day = await IsHolidayCheck.findOne().exec();
//       const date = new Date().toLocaleDateString();
  
//       if (!day) {
//         console.error('Error finding weekly day');
//         return;
//       }
  
//       const attendancePromises = users.map(user => {
//         const remarks = day.holyDay ? day.remarks : "Absent";
//         const attendance = new Attendance({
//           user_id: user._id,
//           date: date,
//           status: false,
//           remarks: remarks,
//           leave: false,
//           district: user.district,
//           upazila: user.upazila,
//           union: user.union
//         });
//         return attendance.save();
//       });
  
//       await Promise.all(attendancePromises);
//     } catch (error) {
//       console.error('Error:', error);
//     }
// });


// add checkIn
async function checkIn(req, res){
    console.log(req.body.distance)
    try {
        if(Number(req.body.distance) <= 100){
            // const date = new Date().toLocaleDateString();
            // const time = new Date().toLocaleTimeString();
            const currentTime = new Date();
            const time = currentTime.toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka' });

            const date = currentTime.toLocaleDateString();
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
        }else{
            res.status(HTTP_SERVER_ERROR).json({
                success: false,
                message: "Out of 100M from office"
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
                message: "You didn't check in today"
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
        
        const { remarks, district, upazila, union, user_id, date } = req.query; 

        const filter = {}; 
        
        const dateQuery = date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString();

        if (remarks !== undefined) {
            filter.remarks = { $regex: new RegExp(remarks, 'i') };
        }
        if(district !== undefined) {
            filter.district = mongoose.Types.ObjectId(district);
        }
        if(upazila !== undefined) {
            filter.upazila = mongoose.Types.ObjectId(upazila);
        }
        if(union){
            filter.union = mongoose.Types.ObjectId(union);
        }
        if(user_id !== undefined) {
            filter.user_id = mongoose.Types.ObjectId(user_id);
        }
        console.log("report filter",filter)
        console.log("report date",date)
        Attendance.aggregate([
            {
                $match: {
                  date: dateQuery, 
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
                $lookup: {
                    from: "districts",
                    localField: 'user.district',
                    foreignField: '_id',
                    as: 'district',
                },
            },
            {
                $unwind: '$district',
            },
            {
                $lookup: {
                    from: "subdistricts",
                    localField: 'user.upazila',
                    foreignField: '_id',
                    as: 'upazila',
                },
            },
            {
                $unwind: '$upazila',
            },
            {
                $lookup: {
                    from: "unions",
                    localField: 'user.union',
                    foreignField: '_id',
                    as: 'union',
                },
            },
            {
                $unwind: '$union',
            },
            {
                $lookup: {
                    from: "designations",
                    localField: 'user.designation',
                    foreignField: '_id',
                    as: 'designation',
                },
            },
            {
                $unwind: '$designation',
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

            console.log({result})
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

// update inactive 
async function updateInactive(req, res){
    try{
        console.log(req.body.time)
        const date = new Date().toLocaleDateString();
        const time = new Date();
        const existingRecord = await Attendance.findOne({
            user_id: req.user.id,
            date: date,
        });

        if (existingRecord) {
            existingRecord?.inactive.push({ time: time });
            await existingRecord.save();
            res.status(HTTP_OK).json({
                success: true,
                message: "Check Out successfully"
            })
        }else {
            res.status(HTTP_SERVER_ERROR).json({
                success: false,
                message: "You didn't check in today"
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

async function getEmployeeMonthlyReport(req, res){
    try{
        
        const { remarks, district, upazila, union, user_id, fromDate, toDate } = req.query; 

        const filter = {}; 
        
        const fromDateQuery = fromDate ? new Date(fromDate).toLocaleDateString() : new Date().toLocaleDateString();
        const toDateQuery = toDate ? new Date(toDate).toLocaleDateString() : new Date().toLocaleDateString();

        if (remarks !== undefined) {
            filter.remarks = { $regex: new RegExp(remarks, 'i') };
        }
        if(district !== undefined) {
            filter.district = mongoose.Types.ObjectId(district);
        }
        if(upazila !== undefined) {
            filter.upazila = mongoose.Types.ObjectId(upazila);
        }
        if(union){
            filter.union = mongoose.Types.ObjectId(union);
        }
        if(user_id !== undefined) {
            filter.user_id = mongoose.Types.ObjectId(user_id);
        }
        console.log("report filter",filter)
        console.log("report date",date)
        Attendance.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(fromDateQuery),
                        $lte: new Date(toDateQuery),
                    },
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
                $lookup: {
                    from: "districts",
                    localField: 'user.district',
                    foreignField: '_id',
                    as: 'district',
                },
            },
            {
                $unwind: '$district',
            },
            {
                $lookup: {
                    from: "subdistricts",
                    localField: 'user.upazila',
                    foreignField: '_id',
                    as: 'upazila',
                },
            },
            {
                $unwind: '$upazila',
            },
            {
                $lookup: {
                    from: "unions",
                    localField: 'user.union',
                    foreignField: '_id',
                    as: 'union',
                },
            },
            {
                $unwind: '$union',
            },
            {
                $lookup: {
                    from: "designations",
                    localField: 'user.designation',
                    foreignField: '_id',
                    as: 'designation',
                },
            },
            {
                $unwind: '$designation',
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
            {
                $group: {
                    _id: "$user_id",
                    data: { $push: '$$ROOT' },
                },
            },
            
          ]).exec(function (err, result) {

            console.log({result})
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

async function getLeave(req, res) {
    console.log("called")
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
    }else{
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            statusCode: HTTP_SERVER_ERROR,
            message: "Something Went Wrong"
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
   getLeave,
   updateInactive,
   getEmployeeMonthlyReport
}