// external imports
const express = require("express")

// internal imports
const {addHoliday, getAllHolidays, getAllHolidayList, getHolidayById, updateHoliday, deleteHoliday} = require("../controller/holidays.controller")
const { checkAdminLogin } = require("../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkAdminLogin, addHoliday)
router.get("/", checkAdminLogin, getAllHolidays)
//new
router.get("/list", checkAdminLogin, getAllHolidayList)
router.get("/:id", checkAdminLogin, getHolidayById)
router.put("/:id", checkAdminLogin, updateHoliday)
router.delete("/:id", checkAdminLogin, deleteHoliday)

module.exports = router