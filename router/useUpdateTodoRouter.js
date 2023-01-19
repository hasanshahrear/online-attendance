// external imports
const express = require("express")

// internal imports
const { updateTodo } = require("../controller/todo.controller")
const { checkLogin } = require("../middlewares/checkLogin")

const router = express.Router()

router.patch("/", checkLogin, updateTodo)

module.exports = router