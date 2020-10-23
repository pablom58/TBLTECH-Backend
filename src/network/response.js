//Response for good request
const success = (res,data,statusCode,responseMessage) => {
    let status = statusCode || 200
    let message = responseMessage || 'Request Success'

    return res.status(status).json({
        status,
        message,
        data
    })
}

//Response when error ocurred
const error = (res,statusCode,responseMessage) => {
    let status = statusCode || 500
    let message = responseMessage || 'Internal Error'

    return res.status(status).json({
        status,
        message
    })
}

module.exports = {
    success,
    error
}