// external imports
const express = require("express")

// internal imports

const { checkAdminLogin } = require("../middlewares/checkLogin")
const { addDesignation, getAllDesignation } = require("../controller/designation.controller")

const router = express.Router()

router.post("/", checkAdminLogin, addDesignation)
router.get("/", checkAdminLogin, getAllDesignation)

module.exports = router