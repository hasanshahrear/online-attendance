// internal imports
const Holidays = require("../models/holidays.model");

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

// add weekly holidays
async function addHoliday(req, res) {
  console.log(req.body);
  try {
    const existingRecord = await Holidays.findOne({
      holyDay: new Date(req.body.holyDay),
    });

    if (existingRecord) {
      return res.status(HTTP_SERVER_ERROR).json({
        success: false,
        message: "Already exists",
      });
    }
    const holidays = new Holidays({
      holyDay: new Date(req.body.holyDay),
      remarks: req.body.remarks,
    });
    await holidays.save();

    res.status(HTTP_OK).json({
      success: true,
      message: "Holiday added successfully",
    });
  } catch (error) {
    res.status(HTTP_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
}

// get all days
async function getAllHolidays(req, res) {
  try {
    // Holidays.find({}, function(error, data){
    //     if(error){
    //         res.status(HTTP_SERVER_ERROR).json({
    //             success: false,
    //             message: error.message
    //         })
    //     }else{
    //         res.status(HTTP_OK).json({
    //             success: true,
    //             message: "Request successfully",
    //             data,
    //         })
    //     }
    // })

    await Holidays.find({
      holyDay: {
        $gte: new Date("2022-04-18"),
        $lte: new Date("2022-04-21"),
      },
    }).then((value) => {
      console.log(value);
    });
  } catch (error) {
    res.status(HTTP_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
}

// async function activeHoliday(req, res){
//     try{
//         WeeklyHolidays.find({_id:req.body.id}, async function(error, data)  {
//             if(error){
//                 res.status(HTTP_SERVER_ERROR).json({
//                     success: false,
//                     message: error.message
//                 })
//             }else {
//                 const {isHoliday} = data[0]
//                 if(isHoliday === true){
//                     await WeeklyHolidays.findOneAndUpdate({_id: req.body.id}, {isHoliday: false})
//                     res.status(HTTP_OK).json({
//                         success: true,
//                         message: "Holiday updated",
//                     })
//                 }else{
//                     await  WeeklyHolidays.findOneAndUpdate({_id: req.body.id}, {isHoliday: true})
//                     res.status(HTTP_OK).json({
//                         success: true,
//                         message: "Holiday updated",
//                     })
//                 }

//             }
//         })

//     }catch (error) {
//         res.status(HTTP_SERVER_ERROR).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

async function getAllHolidayList(req, res) {
  try {
    const holidays = await Holiday.find();
    return res.status(200).json(holidays);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getHolidayById(req, res) {
  try {
    const holidayId = req.params.id;
    const holiday = await Holiday.findById(holidayId);

    if (!holiday) {
      return res.status(404).json({ message: "Holiday not found" });
    }

    return res.status(200).json(holiday);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateHoliday(req, res) {
  try {
    const holidayId = req.params.id;
    const updates = req.body;

    const updatedHoliday = await Holiday.findByIdAndUpdate(holidayId, updates, {
      new: true,
    });

    if (!updatedHoliday) {
      return res.status(404).json({ message: "Holiday not found" });
    }

    return res.status(200).json(updatedHoliday);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteHoliday(req, res) {
  try {
    const holidayId = req.params.id;

    const deletedHoliday = await Holiday.findByIdAndRemove(holidayId);

    if (!deletedHoliday) {
      return res.status(404).json({ message: "Holiday not found" });
    }

    return res.status(204).json(); // No Content - Successfully deleted
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  addHoliday,
  getAllHolidays,
  getHolidayById,
  getAllHolidayList,
  updateHoliday,
  deleteHoliday,
};
