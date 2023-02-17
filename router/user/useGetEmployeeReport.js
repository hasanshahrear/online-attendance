// external imports
const express = require("express")

// internal imports
const { employeeReport } = require("../../controller/attendance.controller")
const { checkLogin } = require("../../middlewares/checkLogin")

const router = express.Router()

router.get("/", checkLogin, employeeReport)

module.exports = router