// external imports
const express = require("express")

// internal imports
const {addHoliday, getAllHolidayList, getHolidayById, updateHoliday, deleteHoliday} = require("../controller/holidays.controller")
const { checkAdminLogin } = require("../middlewares/checkLogin")
const { paginationMiddleware } = require("../middlewares/paginationMiddleware")
const router = express.Router()

router.post("/", checkAdminLogin, addHoliday)
router.get("/get-all", checkAdminLogin, paginationMiddleware("holidays.model"), getAllHolidayList)
//new
router.get("/:id", checkAdminLogin, getHolidayById)
router.put("/:id", checkAdminLogin, updateHoliday)
router.delete("/:id", checkAdminLogin, deleteHoliday)

module.exports = router