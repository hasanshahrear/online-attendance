// external imports
const express = require("express")

// internal imports
const {addHoliday, getAllHolidays} = require("../controller/holidays.controller")
const { checkAdminLogin } = require("../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkAdminLogin, addHoliday)
router.get("/", checkAdminLogin, getAllHolidays)

module.exports = router