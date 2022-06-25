
exports.globalErrorHandler = (err,req,res,next)=> {
    let statusCode = err.statusCode || 500,
        message = err.message,
        status = err.status;
    res.status(statusCode).json({message,status})  
  }
