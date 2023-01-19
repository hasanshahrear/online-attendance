// external imports
const express = require("express")

// internal imports
const { getAllTotods } = require("../controller/todo.controller")
const { checkLogin } = require("../middlewares/checkLogin")


const router = express.Router()

router.get("/", checkLogin,  getAllTotods)

module.exports = router