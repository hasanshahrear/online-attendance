// external imports
const express = require("express")

// internal imports
const { deleteTodo } = require("../controller/todo.controller")
const { checkLogin } = require("../middlewares/checkLogin")

const router = express.Router()

router.delete("/", checkLogin, deleteTodo)

module.exports = router