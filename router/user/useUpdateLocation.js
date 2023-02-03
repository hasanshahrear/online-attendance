// external imports
const express = require("express")

// internal imports
const { updateLocation } = require("../../controller/user.controller")
const { checkLogin } = require("../../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkLogin, updateLocation)

module.exports = router