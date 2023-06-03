// external imports
const express = require("express")

// internal imports
const {getLeave} = require("../../controller/attendance.controller")
const { checkLogin } = require("../../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkLogin, getLeave)

module.exports = router