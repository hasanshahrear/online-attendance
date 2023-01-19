// external imports
const express = require("express")

// internal imports
const { login } = require("../../controller/user.controller")

const router = express.Router()

router.post("/", login)

module.exports = router