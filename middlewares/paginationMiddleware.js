// paginationMiddleware.js

const paginationMiddleware = (modelName) => {
    return async (req, res, next) => {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;

      try {
        const Model = require(`../models/${modelName}`);
        const totalCount = await Model.countDocuments();
        const totalPages = Math.ceil(totalCount / size);
        const startIndex = (page - 1) * size;
  
        const results = await Model.find()
          .limit(size)
          .skip(startIndex)
          .exec();
  
        req.pagination = {
          collection: results,
          page: page,
          size: size,
          totalPages: totalPages,
          totalDocs: totalCount,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        };
  
        next();
      } catch (error) {
        return res.json({
          status: "error",
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: "Internal Server Error",
          error,
        });
       
      }
    };
  };
  
  module.exports = {paginationMiddleware};
  