// external imports
const express = require("express")

// internal imports
const { addAttendance } = require("../controller/attendance.controller")
const { checkLogin } = require("../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkLogin, addAttendance)

module.exports = router