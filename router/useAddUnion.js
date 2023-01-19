// external imports
const express = require("express")

// internal imports
const {addUnion} = require("../controller/union.controller")

const router = express.Router()

router.post("/", addUnion)

module.exports = router