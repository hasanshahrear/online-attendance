// external imports
const express = require("express")

// internal imports
const {addWeeklyHolidays, getAllWeeklyHolidays} = require("../controller/weeklyHolidays.controller")
const { checkAdminLogin } = require("../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkAdminLogin, addWeeklyHolidays)
router.get("/", checkAdminLogin, getAllWeeklyHolidays)

module.exports = router