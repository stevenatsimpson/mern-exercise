const notFound = (req,res,next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    //if the error status code is 200, make it 500, else just use the normal status code
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;


    res.status(statusCode).json({
        message,
        //if this is production, make it null, or else show the full stack
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export{notFound, errorHandler};