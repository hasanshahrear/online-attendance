// external imports
const express = require("express")

// internal imports
const { signup, updateUser } = require("../../controller/user.controller")
const { checkAdminLogin } = require("../../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkAdminLogin, signup)
router.put("/", checkAdminLogin, updateUser)
module.exports = router