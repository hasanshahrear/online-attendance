// external imports
const express = require("express")

// internal imports

const { checkAdminLogin } = require("../middlewares/checkLogin")
const { addGender, getAllGender } = require("../controller/gender.controller")

const router = express.Router()

router.post("/", checkAdminLogin, addGender)
router.get("/", checkAdminLogin, getAllGender)

module.exports = router