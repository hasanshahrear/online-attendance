// external imports
const express = require("express")

// internal imports

const { checkAdminLogin } = require("../middlewares/checkLogin")
const {  idleTime } = require("../controller/idleTime.controller")

const router = express.Router()

router.post("/", checkAdminLogin, idleTime)
// router.get("/", checkAdminLogin, getAllDesignation)

module.exports = router