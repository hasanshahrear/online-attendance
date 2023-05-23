// external imports
const express = require("express")

// internal imports
const { allReport, employeeSingleReport } = require("../../controller/attendance.controller")
const { checkAdminLogin } = require("../../middlewares/checkLogin")

const router = express.Router()

router.get("/all", checkAdminLogin, allReport)
router.get("/employee", checkAdminLogin, employeeSingleReport)

module.exports = router