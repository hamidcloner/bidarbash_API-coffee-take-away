const {failedResponse} = require("../exceptions/responsesFormat");

module.exports = (err,req,res,next) => {
    const statusCode = ((err?.statusCode) && (200 < err.statusCode < 599) ? err.statusCode : 500)
    const message = err?.message ?? "Internal Server Error";
    res.status(statusCode).json(failedResponse(message,statusCode,err.errors))
}