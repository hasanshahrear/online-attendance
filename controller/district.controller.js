const {StatusCodes} = require("http-status-codes")
// internal imports
const District = require("../models/district.model")

// add district
async function addDistrict(req, res){
    try {
        const district = new District({
            ...req.body,
        });       
        await district.save()
        return res.json({
            status: "success",
            statusCode: StatusCodes.OK,
            message: "District added successfully",
            data: null,
        });
    } catch (error) {
        return res.json({
            status: "error",
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
            error: error,
        });
    }
}

// update by Id
async function updateDistrictById(req, res){
    District.findByIdAndUpdate(req.query.id, { $set: { district_name: req.body.district_name } }, { new: true }, (error, document) => {
        if (error) {
            return res.json({
                status: "error",
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error",
                error: error,
            });
        }
        
        if (document) {
            res.json({
                status: "success",
                statusCode: StatusCodes.OK,
                message: "District Updated Successfully",
                data: document,
            });
        } else {
            return res.json({
                status: "error",
                statusCode: StatusCodes.NOT_FOUND,
                message: "District Not Found",
                error: null,
            });
        }
    });  
}

// get all district
async function getAllDistrict(req, res){
    const paginationData = req.pagination;
    res.json(paginationData);
}

// get by Id
async function getDistrictById(req, res){
    try {
        const document = await District.findById(req.query.id);
        if (!document) {
          return res.json({
            status: "error",
            statusCode: StatusCodes.NOT_FOUND,
            message: "District Not Found",
            error: null,
        });
        }
        res.json({
            status: "success",
            statusCode: StatusCodes.OK,
            message: "District Information",
            data: document,
        });
    } catch (error) {
        return res.json({
            status: "error",
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
            error: error,
        });
    }
}

// delete by Id
async function deleteDistrictById(req, res){
    try {
        const document = await District.findByIdAndRemove(req.query.id);
        if (!document) {
          return res.json({
            status: "error",
            statusCode: StatusCodes.NOT_FOUND,
            message: "District Not Found",
            error: null,
        });
        }
        res.json({
            status: "success",
            statusCode: StatusCodes.OK,
            message: "District Delete Successfully",
            data: document,
        });
    } catch (error) {
        return res.json({
            status: "error",
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
            error: error,
        });
    }
}

// status active by Id
async function activeDistrictById(req, res){
    District.findByIdAndUpdate(req.query.id, { $set: { status: true } }, { new: true }, (error, document) => {
        if (error) {
            return res.json({
                status: "error",
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error",
                error: error,
            });
        }
        
        if (document) {
            res.json({
                status: "success",
                statusCode: StatusCodes.OK,
                message: "District Active Successfully",
                data: document,
            });
        } else {
            return res.json({
                status: "error",
                statusCode: StatusCodes.NOT_FOUND,
                message: "District Not Found",
                error: null,
            });
        }
    });
}

// status active by Id
async function inactiveDistrictById(req, res){
    District.findByIdAndUpdate(req.query.id, { $set: { status: false } }, { new: true }, (error, document) => {
        if (error) {
            return res.json({
                status: "error",
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error",
                error: error,
            });
        }
        
        if (document) {
            res.json({
                status: "success",
                statusCode: StatusCodes.OK,
                message: "District InActive Successfully",
                data: document,
            });
        } else {
            return res.json({
                status: "error",
                statusCode: StatusCodes.NOT_FOUND,
                message: "District Not Found",
                error: null,
            });
        }
    });
}

module.exports = {
    addDistrict,
    getDistrictById,
    getAllDistrict,
    deleteDistrictById,
    updateDistrictById,
    activeDistrictById,
    inactiveDistrictById
}