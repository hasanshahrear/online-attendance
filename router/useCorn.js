// external imports
const express = require("express")

// internal imports
// corn
const { corn } = require("../controller/corn")

const router = express.Router()

router.get("/", corn)

module.exports = router