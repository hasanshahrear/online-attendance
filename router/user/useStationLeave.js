// external imports
const express = require("express")

// internal imports
const { stationLeave, stationBack } = require("../../controller/stationLeave.controller")
const { checkLogin } = require("../../middlewares/checkLogin")

const router = express.Router()

router.post("/leave", checkLogin, stationLeave)
router.post("/back", checkLogin, stationBack)

module.exports = router