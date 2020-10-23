const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config')

//Encrypting password using bcryptjs
const encryptPassword = async password => {
    let salt = await bcrypt.genSalt(12)
    return bcrypt.hash(password,salt)
}

//Validate user password
const validatePassword = (dbPassword,password) => bcrypt.compare(password,dbPassword)

//Generating token
const generateToken = data => jwt.sign(
    data,
    config.SECRET,
    {
        expiresIn: 60 * 60 * 24
    }
)

module.exports = {
    encryptPassword,
    validatePassword,
    generateToken,
}