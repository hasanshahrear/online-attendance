// external imports
const express = require("express")

// internal imports
const { adminLogin } = require("../../controller/superAdmin.controller")

const router = express.Router()

router.post("/", adminLogin)

module.exports = router