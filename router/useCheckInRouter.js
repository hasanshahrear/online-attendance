// external imports
const express = require("express")

// internal imports
const { checkIn } = require("../controller/attendance.controller")
const { checkLogin } = require("../middlewares/checkLogin")
const { checkHoliday } = require("../middlewares/checkHoliday")

const router = express.Router()

console.log("asdlkfjasldk")
router.post("/", checkLogin, checkHoliday, checkIn)
module.exports = router