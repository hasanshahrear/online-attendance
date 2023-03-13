// external imports
const express = require("express")

// internal imports
const {addUnion, getAllUnion} = require("../controller/union.controller")
const { checkAdminLogin } = require("../middlewares/checkLogin")

const router = express.Router()

router.post("/", checkAdminLogin, addUnion)
router.get("/", checkAdminLogin, getAllUnion)

module.exports = router