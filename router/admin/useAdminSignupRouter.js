// external imports
const express = require("express")

// internal imports
const { adminSignup } = require("../../controller/superAdmin.controller")

const router = express.Router()

router.post("/", adminSignup)

module.exports = router