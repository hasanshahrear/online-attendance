// internal imports
const { StatusCodes } = require("http-status-codes");
const Designation = require("../models/designation.model")

// add designation
async function addDesignation(req, res){
  try {
    const designation = new Designation({
      ...req.body,
    });
    await designation.save();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Designation added successfully",
      status: "success",
      statusCode: StatusCodes.OK,
      data: null,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    });
  }
}

// get all designation
async function getAllDesignation(req, res){
  const paginationData = req.pagination;
  res.json(paginationData);
}

async function getDesignationById(req, res) {
    try {
      const designationId = req.params.id;
      const designation = await Designation.findById(designationId);
  
      if (!designation) {
        return res.status(404).json({ message: 'Designation not found' });
      }
  
      return res.status(StatusCodes.OK).json(designation);
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

/*
Postman: /api_endpoint/:id
{
  "designation_name": "Updated Designation Name",
  "status": false
}

*/

async function updateDesignation(req, res) {
    try {
      const designationId = req.params.id;
      const updates = req.body;
  
      const updatedDesignation = await Designation.findByIdAndUpdate(
        designationId,
        updates,
        { new: true }
      );
  
      if (!updatedDesignation) {
        return res.status(404).json({ message: 'Designation not found' });
      }
  
      return res.status(StatusCodes.OK).json({
        status: "success",
        statusCode: StatusCodes.OK,
        message: "Designation Updated Successfully",
        data: null,
      });
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

async function deleteDesignation(req, res) {
    try {
      const designationId = req.params.id;
  
      const deletedDesignation = await Designation.findByIdAndRemove(designationId);
  
      if (!deletedDesignation) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Designation not found' });
      }
  
      return res.status(StatusCodes.OK).json(
        {
          status: "success",
          statusCode: StatusCodes.OK,
          message: "Designation Updated Successfully",
          data: null,
        }
      );
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}
  

async function getAllDesignationList(req, res) {
    try {
      const designations = await Designation.find();
  
      return res.status(StatusCodes.OK).json(designations);
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

module.exports = {
    addDesignation,
    getAllDesignation,
    getDesignationById,
    updateDesignation,
    deleteDesignation,
    getAllDesignationList
}