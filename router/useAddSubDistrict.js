// external imports
const express = require("express")

// internal imports
const {addSubDistrict} = require("../controller/subDistrict.controller")

const router = express.Router()

router.post("/", addSubDistrict)

module.exports = router