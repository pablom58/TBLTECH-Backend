const response = require('./response')

//function to create errors
const error = (errorCode,errorMessage) => {
    let message = errorMessage || 'Internal Error'
    let statusCode = errorCode || 500
    
    let error = new Error(message)
    error.statusCode = statusCode

    return error
}

//middleware to handling errors
const errors = (error,req,res,next) => {
    console.error(`[error]: ${error}`)

    const message = error.message || 'Internal Error'
    const status = error.statusCode || 500

    response.error(res,status,message)
}

module.exports = {
    error,
    errors
}