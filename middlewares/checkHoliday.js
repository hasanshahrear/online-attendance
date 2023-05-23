// external imports

const IsHolidayCheck = require("../models/isHolidayCheck.model");

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

// checkWeeklyHoliday Gard
const checkHoliday = async (req, res, next)=>{
    const holiday = await IsHolidayCheck.findOne().exec();
    if(!holiday.holyDay){
        next();
    }else{
        res.status(HTTP_OK).json({
            success: false,
            message: holiday.remarks
        })
    }
    
}




module.exports ={
    checkHoliday
}
