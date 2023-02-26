// external imports
const express = require("express")

// internal imports
const {addUnion} = require("../controller/union.controller")
const { checkAdminLogin } = require("../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkAdminLogin, addUnion)

module.exports = router