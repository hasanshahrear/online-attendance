// external imports
const express = require("express")

// internal imports
const {addSubDistrict} = require("../controller/subDistrict.controller")
const { checkAdminLogin } = require("../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkAdminLogin, addSubDistrict)

module.exports = router