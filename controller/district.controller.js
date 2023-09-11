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

// get all district
async function getAllDistrict(req, res){
    const paginationData = req.pagination;
    res.json(paginationData);
}

// get by Id
async function getDistrict(req, res){
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

module.exports = {
    addDistrict,
    getDistrict,
    getAllDistrict,
}