//to override the default error handler you should pass err, first with req,res,next
const notFound = (err, req, res, next) => {
    //sometimes we get a 200 as an error so...
    // if error with code 200 then change to 500 or keep it as it
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode).json({
        message: err.message,
        //as long as we are in production/development we will show stack
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}



// if we go to unknown route
const errorHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}



export {notFound,errorHandler} 