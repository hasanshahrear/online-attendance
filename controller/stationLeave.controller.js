const StationLeave = require("../models/stationLeave.model");

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;
async function stationLeave(req, res) {
  try {
    console.log(req.date);
    const isLeave = await StationLeave.findOne({
      id: req.user.id,
      end_time: null,
      createdAt: req.date,
    });

    if (isLeave) {
      res.status(HTTP_SERVER_ERROR).json({
        success: false,
        message: "You are already on leave",
      });
    } else {
      const stationLeave = new StationLeave({
        user: req.user.id,
        reason: req.body.reason,
        start_time: req.body.start_time,
      });
      await stationLeave.save();
      res.status(HTTP_OK).json({
        success: true,
        message: "Station leave successful",
      });
    }
  } catch (error) {
    console.error("Error in Station Leave:", error);
  }
}

async function stationBack(req, res) {
  try {
    const isLeave = await StationLeave.findOneAndUpdate(
      { user: req.user.id, end_time: null, createdAt: req.date },
      { end_time: req.body.end_time },
      { new: true }
    );
console.log({isLeave})
    if (isLeave) {
      res.status(HTTP_OK).json({
        success: true,
        message: "Station back successful",
      });
    } else {
      res.status(HTTP_SERVER_ERROR).json({
        success: false,
        message: "You are not on leave",
      });
    }
  } catch (error) {
    console.error("Error in Station Leave:", error);
  }
}

/*
Today All Employee Leave:
Endpoint: GET /leaves/today
Request Parameters: None
Request Body: None
Description: This API should retrieve all leave records for employees that fall within the current day.
*/
async function getTodayAllEmployeeStationLeave(req, res) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const leaves = await StationLeave.find({
      start_time: { $lte: today },
      end_time: { $gte: today },
    }).populate("user");

    return res.status(200).json(leaves);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

/*
Current Month Employee Leave:

Endpoint: GET /leaves/current-month
Request Parameters: None
Request Body: None
Description: This API should retrieve all leave records for employees that fall within the current month.

*/
async function getCurrentMonthEmployeeStationLeave(req, res) {
  try {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const leaves = await StationLeave.find({
      start_time: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    }).populate("user");

    return res.status(200).json(leaves);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

/*
Filter By Upazila | Union | Single Day | 30 Days:

Endpoint: GET /leaves/filter
Request Parameters or Query Parameters:
upazila (optional): The name of the Upazila (SubDistrict) to filter by.
union (optional): The name of the Union to filter by.
singleDay (optional): A date (in ISO format) to filter by a single day.
thirtyDays (optional): A date (in ISO format) to filter by a 30-day range.
Request Body: None
Description: This API should allow filtering leave records based on various criteria such as Upazila, Union, a specific single day, or a 30-day range.

*/
async function filterStationLeaves(req, res) {
  try {
    const { upazila, union, singleDay, thirtyDays } = req.query;
    const filters = {};

    if (upazila) {
      // Add filtering by Upazila (SubDistrict)
      filters["user.district"] = upazila;
    }

    if (union) {
      // Add filtering by Union
      filters["user.union"] = union;
    }

    if (singleDay) {
      // Add filtering by a single day
      const date = new Date(singleDay);
      filters.start_time = { $lte: date };
      filters.end_time = { $gte: date };
    }

    if (thirtyDays) {
      // Add filtering by a 30-day range
      const endDate = new Date(thirtyDays);
      const startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 30);
      filters.start_time = { $gte: startDate };
      filters.end_time = { $lte: endDate };
    }

    const leaves = await StationLeave.find(filters).populate("user");

    return res.status(200).json(leaves);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  stationLeave,
  stationBack,
  getTodayAllEmployeeStationLeave,
  getCurrentMonthEmployeeStationLeave,
  filterStationLeaves,
};
