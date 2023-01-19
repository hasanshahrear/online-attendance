// external imports
const express = require("express")

// internal imports
const { addTodo } = require("../controller/todo.controller")
const { checkLogin } = require("../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkLogin, addTodo)

module.exports = router