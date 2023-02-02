// external imports
const express = require("express")

// internal imports
const { checkOut } = require("../controller/attendance.controller")
const { checkLogin } = require("../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkLogin, checkOut)

module.exports = router