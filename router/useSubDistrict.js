// external imports
const express = require("express")

// internal imports
const {addSubDistrict, getAllSubDistrict, updateSubDistrictById, getSubDistrictById, deleteSubDistrictById,activeSubDistrictById, inactiveSubDistrictById, getSubDistrictByDistrictId} = require("../controller/subDistrict.controller")
const { checkAdminLogin } = require("../middlewares/checkLogin")
const {paginationMiddleware} = require("../middlewares/paginationMiddleware")

const router = express.Router()
const populatedData = ["district_id"]

router.post("/", checkAdminLogin, addSubDistrict)
router.put("/", checkAdminLogin, updateSubDistrictById)
router.get("/get-all", checkAdminLogin, paginationMiddleware("subDistrict.model", populatedData), getAllSubDistrict)
router.get("/", checkAdminLogin, getSubDistrictById)
router.delete("/", checkAdminLogin, deleteSubDistrictById)
router.put("/active", checkAdminLogin, activeSubDistrictById)
router.put("/in-active", checkAdminLogin, inactiveSubDistrictById)
router.get("/get-sub-district-by-district", checkAdminLogin, getSubDistrictByDistrictId)

module.exports = router