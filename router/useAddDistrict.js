// external imports
const express = require("express")

// internal imports
const {addDistrict} = require("../controller/district.controller")
const { checkAdminLogin } = require("../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkAdminLogin, addDistrict)

module.exports = router