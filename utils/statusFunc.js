const statusFunc = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: statusCode <= 203 ? "success" : "failed",
    length: message.length,
    message: message,
  });
};
module.exports = statusFunc;
