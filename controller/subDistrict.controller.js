const {StatusCodes} = require("http-status-codes")
const SubDistrict = require("../models/subDistrict.model")

// add subDistrict
async function addSubDistrict(req, res){
    try{
        const subDistrict = new SubDistrict({
            "district_id": req.body.district_id,
           "sub_district_name": req.body.sub_district_name,
        })            
        await subDistrict.save()
        return res.json({
            status: "success",
            statusCode: StatusCodes.OK,
            message: "Sub District added successfully",
            data: null,
        });
    }catch (error) {
        return res.json({
            status: "error",
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
            error,
        });
    }
}

// update by Id
async function updateSubDistrictById(req, res){
    SubDistrict.findByIdAndUpdate(req.query.id, { $set: {district_id: req.body.district_id , sub_district_name: req.body.sub_district_name } }, { new: true }, (error, document) => {
        if (error) {
            return res.json({
                status: "error",
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                message: error.message,
                error: error,
            });
        }
        
        if (document) {
            res.json({
                status: "success",
                statusCode: StatusCodes.OK,
                message: "Sub District Updated Successfully",
                data: document,
            });
        } else {
            return res.json({
                status: "error",
                statusCode: StatusCodes.NOT_FOUND,
                message: "Sub District Not Found",
                error: null,
            });
        }
    });  
}

// get all sub district
async function getAllSubDistrict(req, res){
    const paginationData = req.pagination;
    res.json(paginationData);
}

// get by Id
async function getSubDistrictById(req, res){
    try {
        const document = await SubDistrict.findById(req.query.id).populate("district_id");
        if (!document) {
          return res.json({
            status: "error",
            statusCode: StatusCodes.NOT_FOUND,
            message: "Sub District Not Found",
            error: null,
        });
        }
        res.json({
            status: "success",
            statusCode: StatusCodes.OK,
            message: "Sub District Information",
            data: document,
        });
    } catch (error) {
        return res.json({
            status: "error",
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
            error: error,
        });
    }
}

// delete by Id
async function deleteSubDistrictById(req, res){
    try {
        const document = await SubDistrict.findByIdAndRemove(req.query.id);
        if (!document) {
          return res.json({
            status: "error",
            statusCode: StatusCodes.NOT_FOUND,
            message: "Sub District Not Found",
            error: null,
        });
        }
        res.json({
            status: "success",
            statusCode: StatusCodes.OK,
            message: "Sub District Delete Successfully",
            data: document,
        });
    } catch (error) {
        return res.json({
            status: "error",
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
            error: error,
        });
    }
}

// status active by Id
async function activeSubDistrictById(req, res){
    SubDistrict.findByIdAndUpdate(req.query.id, { $set: { status: true } }, { new: true }, (error, document) => {
        if (error) {
            return res.json({
                status: "error",
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                message: error.message,
                error: error,
            });
        }
        if (document) {
            res.json({
                status: "success",
                statusCode: StatusCodes.OK,
                message: "Sub District Active Successfully",
                data: document,
            });
        } else {
            return res.json({
                status: "error",
                statusCode: StatusCodes.NOT_FOUND,
                message: "Sub District Not Found",
                error: null,
            });
        }
    });
}

// status active by Id
async function inactiveSubDistrictById(req, res){
    SubDistrict.findByIdAndUpdate(req.query.id, { $set: { status: false } }, { new: true }, (error, document) => {
        if (error) {
            return res.json({
                status: "error",
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                message: error.message,
                error: error,
            });
        }
        
        if (document) {
            res.json({
                status: "success",
                statusCode: StatusCodes.OK,
                message: "Sub District InActive Successfully",
                data: document,
            });
        } else {
            return res.json({
                status: "error",
                statusCode: StatusCodes.NOT_FOUND,
                message: "Sub District Not Found",
                error: null,
            });
        }
    });
}

async function getSubDistrictByDistrictId(req, res){
    try {
        const document = await SubDistrict.find({district_id:req.query.district_id})
        if (!document) {
            return res.json({
              status: "error",
              statusCode: StatusCodes.NOT_FOUND,
              message: "Sub District Not Found",
              error: null,
          });
        }
        res.json({
            status: "success",
            statusCode: StatusCodes.OK,
            message: "Sub District Information",
            data: document,
        });
        
    } catch (error) {
        return res.json({
            status: "error",
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
            error: error,
        });
    }
}

module.exports = {
    addSubDistrict,
    updateSubDistrictById,
    getAllSubDistrict,
    getSubDistrictById,
    deleteSubDistrictById,
    activeSubDistrictById,
    inactiveSubDistrictById,
    getSubDistrictByDistrictId,
}