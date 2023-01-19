// external imports
const express = require("express")

// internal imports
const {addDistrict} = require("../controller/district.controller")

const router = express.Router()

router.post("/", addDistrict)

module.exports = router