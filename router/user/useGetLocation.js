// external imports
const express = require("express")

// internal imports
const { getLocation } = require("../../controller/user.controller")
const { checkLogin } = require("../../middlewares/checkLogin")

const router = express.Router()

router.get("/", checkLogin, getLocation)

module.exports = router