module.exports = (res, statusCode, message) => {
    return res.status(statusCode).json({
        status: statusCode <= 203 ? "success" : "failed",
        length: message.length === 0 ? " " : message.length,
        message: message
    })
}