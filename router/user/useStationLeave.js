// external imports
const express = require("express")

// internal imports
const { stationLeave, stationBack, getTodayAllEmployeeStationLeave, getCurrentMonthEmployeeStationLeave, filterStationLeaves } = require("../../controller/stationLeave.controller")
const { checkLogin } = require("../../middlewares/checkLogin")

const router = express.Router()

router.post("/leave", checkLogin, stationLeave)
router.post("/back", checkLogin, stationBack)
//new
router.get("/today", checkLogin, getTodayAllEmployeeStationLeave)
router.get("/current-month", checkLogin, getCurrentMonthEmployeeStationLeave)
router.get("/filter", checkLogin, filterStationLeaves)
// api/station/filter?upazila=Dhaka, api/station/filter?union=ABC Union, api/station/filter?singleDay=2023-09-15, api/station/filter?thirtyDays=2023-09-15
// api/station/filter?upazila=Dhaka&union=ABC%20Union&singleDay=2023-09-15



module.exports = router