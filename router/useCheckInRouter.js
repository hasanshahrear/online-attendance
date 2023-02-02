// external imports
const express = require("express")

// internal imports
const { checkIn } = require("../controller/attendance.controller")
const { checkLogin } = require("../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkLogin, checkIn)

module.exports = router