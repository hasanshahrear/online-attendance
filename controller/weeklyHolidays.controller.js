// internal imports
const WeeklyHolidays = require("../models/weeklyHolidays.model")

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

// add weekly holidays
async function addWeeklyHolidays(req, res){
    console.log(Date().split(" ")[0])
    try {
        const holidays = new WeeklyHolidays({
            ...req.body,
        });  

        await holidays.save()

        res.status(HTTP_OK).json({
            success: true,
            message: "Holiday added successfully"
        })

    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}

// get all days
async function getAllWeeklyHolidays(req, res){
    try {
        WeeklyHolidays.find({}, function(error, data){
            if(error){
                res.status(HTTP_SERVER_ERROR).json({
                    success: false,
                    message: error.message
                })
            }else{
                res.status(HTTP_OK).json({
                    success: true,
                    message: "Request successfully",
                    data,
                })
            }
        })
        
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}



module.exports = {
    addWeeklyHolidays,
    getAllWeeklyHolidays
}