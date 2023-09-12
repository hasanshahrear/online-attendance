// external imports
const express = require("express")

// internal imports
const {addDistrict, getAllDistrict, getDistrictById, deleteDistrictById, updateDistrictById, activeDistrictById, inactiveDistrictById} = require("../controller/district.controller")
const { checkAdminLogin } = require("../middlewares/checkLogin")
const {paginationMiddleware} = require("../middlewares/paginationMiddleware")

const router = express.Router()

router.post("/", checkAdminLogin, addDistrict)
router.put("/", checkAdminLogin, updateDistrictById)
router.get("/get-all", checkAdminLogin, paginationMiddleware("district.model"), getAllDistrict)
router.get("/", checkAdminLogin, getDistrictById)
router.delete("/", checkAdminLogin, deleteDistrictById)
router.put("/active", checkAdminLogin, activeDistrictById)
router.put("/in-active", checkAdminLogin, inactiveDistrictById)

module.exports = router