// external imports
const express = require("express")

// internal imports
const {addDistrict, getAllDistrict} = require("../controller/district.controller")
const { checkAdminLogin } = require("../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkAdminLogin, addDistrict)
router.get("/", checkAdminLogin, getAllDistrict)

module.exports = router