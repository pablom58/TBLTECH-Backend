const jwt = require('jsonwebtoken')

const config = require('../config')
const { error } = require('../network/error')

//Middleware to verify the token
const ensureToken = (req,res,next) => {
    let token = req.headers['authorization']

    if(!token)
        throw error(401,'You do not have access to this route')

    token = token.split(' ')[1]

    if(!token)
        throw error(401,'You do not have access to this route')

    const decoded = jwt.verify(token,config.SECRET)

    req.user_id = decoded.user_id
    
    next()
}

module.exports = ensureToken