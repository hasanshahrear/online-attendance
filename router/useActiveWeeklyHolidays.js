// external imports
const express = require("express")

// internal imports
const {activeHoliday} = require("../controller/weeklyHolidays.controller")
const { checkAdminLogin } = require("../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkAdminLogin, activeHoliday)

module.exports = router