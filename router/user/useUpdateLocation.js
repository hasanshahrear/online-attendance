// external imports
const express = require("express")

// internal imports
const { updateLocation } = require("../../controller/user.controller")

const router = express.Router()

router.post("/", updateLocation)

module.exports = router