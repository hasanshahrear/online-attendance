// paginationMiddleware.js

const { StatusCodes } = require("http-status-codes");

const paginationMiddleware = (modelName, populateOptions) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    try {
      const Model = require(`../models/${modelName}`);
      const totalCount = await Model.countDocuments();
      const totalPages = Math.ceil(totalCount / size);
      const startIndex = (page - 1) * size;

      let query = Model.find().sort({'updatedAt': -1}).limit(size).skip(startIndex);

      if (populateOptions) {
        if (Array.isArray(populateOptions)) {
          populateOptions.forEach(option => {
            query = query.populate(option);
          });
        } else {
          query = query.populate(populateOptions);
        }
      }

      const results = await query.exec();

      req.pagination = {
        collection: results,
        page: page,
        size: size,
        totalPages: totalPages,
        totalDocs: totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1,
        startIndex: startIndex+1
      };

      next();
    } catch (error) {
      return res.json({
        status: "error",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message,
        error,
      });
    }
  };
};

module.exports = {paginationMiddleware};
  