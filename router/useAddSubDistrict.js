// external imports
const express = require("express")

// internal imports
const {addSubDistrict, getAllSubDistrict} = require("../controller/subDistrict.controller")
const { checkAdminLogin } = require("../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkAdminLogin, addSubDistrict)
router.get("/", checkAdminLogin, getAllSubDistrict)

module.exports = router