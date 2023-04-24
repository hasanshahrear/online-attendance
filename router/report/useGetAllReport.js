// external imports
const express = require("express")

// internal imports
const { allReport } = require("../../controller/attendance.controller")
const { checkAdminLogin } = require("../../middlewares/checkLogin")

const router = express.Router()

router.get("/", checkAdminLogin, allReport)

module.exports = router