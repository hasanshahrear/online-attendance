// external imports
const express = require("express")

// internal imports

const {  checkLogin } = require("../middlewares/checkLogin")
const { connectionStatus } = require("../controller/connectons.controller")

const router = express.Router()

router.post("/", checkLogin, connectionStatus)

module.exports = router