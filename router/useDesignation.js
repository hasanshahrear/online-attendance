// external imports
const express = require("express")

const { checkAdminLogin } = require("../middlewares/checkLogin")
const { addDesignation, getAllDesignation, getDesignationById, updateDesignation, deleteDesignation, getAllDesignationList } = require("../controller/designation.controller")
const { paginationMiddleware } = require("../middlewares/paginationMiddleware")

const router = express.Router()

router.post("/", checkAdminLogin, addDesignation)
router.get("/get-all", checkAdminLogin, paginationMiddleware("designation.model"), getAllDesignation)
router.get("/:id", checkAdminLogin, getDesignationById)
router.put("/:id", checkAdminLogin, updateDesignation)
router.delete("/:id", checkAdminLogin, deleteDesignation)

module.exports = router