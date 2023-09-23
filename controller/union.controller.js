// internal imports
const { StatusCodes } = require("http-status-codes");
const Union = require("../models/union.model")

// add union
async function addUnion(req, res){
    try {
        const union = new Union({
            ...req.body,
        });       
        await union.save()
        res.status(200).json({
            success: true,
            status: "success",
            statusCode: StatusCodes.OK,
            message: "Union added successfully",
            data: null,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}


// get all sub district
async function getAllUnion(req, res){
    const paginationData = req.pagination;
    res.json(paginationData);
}

// update by Id
async function updateUnionById(req, res){
    Union.findByIdAndUpdate(req.query.id, { $set: {district_id: req.body.district_id , sub_district_id: req.body.sub_district_id , union_name: req.body.union_name } }, { new: true }, (error, document) => {
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
                data: null,
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

// delete by Id
async function deleteUnionById(req, res){
    try {
        const document = await Union.findByIdAndRemove(req.query.id);
        if (!document) {
          return res.json({
            status: "error",
            statusCode: StatusCodes.NOT_FOUND,
            message: "Union Not Found",
            error: null,
        });
        }
        res.json({
            status: "success",
            statusCode: StatusCodes.OK,
            message: "Union Delete Successfully",
            data: null,
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
    addUnion,
    getAllUnion,
    updateUnionById,
    deleteUnionById
}