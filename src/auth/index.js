const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

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

//Generating Hash
const generateHash = data => crypto.createHmac('sha256',config.SECRET_HASH)
                                    .update(data)
                                    .digest('hex')

module.exports = {
    encryptPassword,
    validatePassword,
    generateToken,
    generateHash
}