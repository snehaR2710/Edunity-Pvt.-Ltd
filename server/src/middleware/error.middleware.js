
const errorMiddleware = (err, _req, res, _next) => {
    err.stausCode = err.statusCode || 500
    err.message = err.message || "Opps!!, Somthing is happning"
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack
    })
}

export { errorMiddleware }