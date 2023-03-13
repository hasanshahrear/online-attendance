// external imports
const express = require("express")

// internal imports
const { signup } = require("../../controller/user.controller")
const { checkAdminLogin } = require("../../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkAdminLogin, signup)

module.exports = router