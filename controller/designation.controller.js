// internal imports
const Designation = require("../models/designation.model")

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

// add designation
async function addDesignation(req, res){
    try {
        const designation = new Designation({
            ...req.body,
        });       
        await designation.save()
        res.status(HTTP_OK).json({
            success: true,
            message: "Designation added successfully"
        })
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}

async function getAllDesignation(req, res){
    try {
        Designation.find({}, function(error, data){
            if(error){
                res.status(HTTP_SERVER_ERROR).json({
                    success: false,
                    message: error.message
                })
            }else{
                res.status(HTTP_OK).json({
                    success: true,
                    message: "Request successfully",
                    data,
                })
            }
        })
        
    } catch (error) {
        res.status(HTTP_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}



async function getDesignationById(req, res) {
    try {
      const designationId = req.params.id;
      const designation = await Designation.findById(designationId);
  
      if (!designation) {
        return res.status(404).json({ message: 'Designation not found' });
      }
  
      return res.status(200).json(designation);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
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
  
      return res.status(200).json(updatedDesignation);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteDesignation(req, res) {
    try {
      const designationId = req.params.id;
  
      const deletedDesignation = await Designation.findByIdAndRemove(designationId);
  
      if (!deletedDesignation) {
        return res.status(404).json({ message: 'Designation not found' });
      }
  
      return res.status(204).json(); // No Content - Successfully deleted
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
}
  

async function getAllDesignationList(req, res) {
    try {
      const designations = await Designation.find();
  
      return res.status(200).json(designations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
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