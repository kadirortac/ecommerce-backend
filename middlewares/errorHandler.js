// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Stack trace sadece geliştirici ortamında gösterilir.
    });
  };
  
  module.exports = errorHandler;