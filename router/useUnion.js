// external imports
const express = require("express")

// internal imports
const {addUnion, getAllUnion, updateUnionById, deleteUnionById} = require("../controller/union.controller")
const { checkAdminLogin } = require("../middlewares/checkLogin")
const { paginationMiddleware } = require("../middlewares/paginationMiddleware")

const router = express.Router()
const populatedData = ["district_id", "sub_district_id"]
router.post("/", checkAdminLogin, addUnion)
router.put("/", checkAdminLogin, updateUnionById)
router.delete("/", checkAdminLogin, deleteUnionById)
router.get("/", checkAdminLogin, getAllUnion)
router.get("/get-all", checkAdminLogin, paginationMiddleware("union.model", populatedData), getAllUnion)

module.exports = router