// external imports
const express = require("express")

// internal imports
const {addDivision} = require("../controller/division.controller")

const router = express.Router()

router.post("/", addDivision)

module.exports = router