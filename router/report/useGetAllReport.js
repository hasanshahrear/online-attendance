// external imports
const express = require("express")

// internal imports
const { allReport, employeeSingleReport, getEmployeeMonthlyReport } = require("../../controller/attendance.controller")
const { checkAdminLogin } = require("../../middlewares/checkLogin")

const router = express.Router()

router.get("/all", checkAdminLogin, allReport)
router.get("/employee", checkAdminLogin, employeeSingleReport)
router.get("/monthly", checkAdminLogin, getEmployeeMonthlyReport)

module.exports = router