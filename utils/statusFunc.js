module.exports = (res, status, message) => {
    return res.status(status).json({
        status,
        message
    })
}
