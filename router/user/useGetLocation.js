// external imports
const express = require("express")

// internal imports
const { getLocation } = require("../../controller/user.controller")

const router = express.Router()

router.get("/", getLocation)

module.exports = router