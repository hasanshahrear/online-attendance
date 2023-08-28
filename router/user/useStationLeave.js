// external imports
const express = require("express")

// internal imports
const { stationLeave } = require("../../controller/stationLeave.controller")
const { checkLogin } = require("../../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkLogin, stationLeave)

module.exports = router