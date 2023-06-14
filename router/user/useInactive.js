// external imports
const express = require("express")

// internal imports
const {updateInactive} = require("../../controller/attendance.controller")
const { checkLogin } = require("../../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkLogin, updateInactive)

module.exports = router