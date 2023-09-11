// external imports
const express = require("express")

// internal imports
const {addDistrict, getAllDistrict, getDistrict} = require("../controller/district.controller")
const { checkAdminLogin } = require("../middlewares/checkLogin")
const {paginationMiddleware} = require("../middlewares/paginationMiddleware")

const router = express.Router()

router.post("/", checkAdminLogin, addDistrict)
router.get("/get-all", checkAdminLogin, paginationMiddleware("district.model"), getAllDistrict)
router.get("/", checkAdminLogin, getDistrict)

module.exports = router