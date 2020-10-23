const User = require('../user/store')

const sendEmail = require('../../utils/email')

const config = require('../../config')
const { error } = require('../../network/error')
const sendMail = require('../../utils/email')
const auth = require('../../auth')

//generate authentication link to change the password
const generateResetLink = async data => {
    const { email , host } = data

    if(!email || !host)
        throw error(500,'Internal Error')

    const user = await User.findOne({email})

    if(!user)
        throw error(400,'Email not found')

    await sendMail({
        email,
        subject: 'TBL Contacs by PMVS Reset Password',
        text: `You can reset your password following the link: http://${host}:${config.PORT}/password/reset/${user.hash}`
    })
}

//reset password
const resetPassword = async data => {
    const { hash , password } = data

    if(!hash || !password)
        throw error(500,'Internal Error')

    const user = await User.findOne({hash})

    if(!user)
        throw error(400,'User not found')

    let newPassword = await auth.encryptPassword(password)

    await User.updateOne({_id: user._id},{
        password: newPassword
    })

    return true
}

module.exports = {
    generateResetLink,
    resetPassword
}