// external imports
const express = require("express")

// internal imports

const { checkAdminLogin } = require("../middlewares/checkLogin")
const { addDesignation, getAllDesignation, getDesignationById, updateDesignation, deleteDesignation, getAllDesignationList } = require("../controller/designation.controller")

const router = express.Router()

router.post("/", checkAdminLogin, addDesignation)
router.get("/", checkAdminLogin, getAllDesignation)
//-
router.get("/:id", checkAdminLogin, getDesignationById)
router.put("/:id", checkAdminLogin, updateDesignation)
router.delete("/:id", checkAdminLogin, deleteDesignation)
router.get("/list", checkAdminLogin, getAllDesignationList)

module.exports = router