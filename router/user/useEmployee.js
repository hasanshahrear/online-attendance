// external imports
const express = require("express");

// internal imports
const {
  getEmployeeById,
  handleUpdateEmployee,
  handleDeleteEmployee,
  getAllEmployeeList,
} = require("../../controller/user.controller");
const { checkAdminLogin } = require("../../middlewares/checkLogin");
const { paginationMiddleware } = require("../../middlewares/paginationMiddleware");
const populatedData = ["district", "upazila", "union", "designation"]
const router = express.Router();

router.get("/get-all", checkAdminLogin, paginationMiddleware("user.model", populatedData), getAllEmployeeList);
router.get("/:id", checkAdminLogin, getEmployeeById);
router.put("/:id", checkAdminLogin, handleUpdateEmployee);
router.delete("/:id", checkAdminLogin, handleDeleteEmployee);

module.exports = router;

/*
[GET] api/employees/:id  
[PUT] api/employees/:id   {
  {
  "first_name": "Updated First Name",
  "last_name": "Updated Last Name",
  "phone": "Updated Phone Number",
  "email": "updated.email@example.com",
  "designation": "Updated Designation",
  "office_address": "Updated Office Address",
  "avatar": "Updated Avatar URL",
  "gender": "male", // "male", "female", or "other"
  "district": "Updated District",
  "upazila": "Updated Upazila",
  "union": "Updated Union",
  "location": true, // or false
  "office_location": {
    "latitude": 123.456,
    "longitude": 78.901
  }
}

}
[DELETE] api/employees/:id  
[GET] api/employees/list  


*/
