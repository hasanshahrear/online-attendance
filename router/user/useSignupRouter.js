// external imports
const express = require("express")

// internal imports
const { signup } = require("../../controller/user.controller")

const router = express.Router()

router.post("/", signup)

module.exports = router