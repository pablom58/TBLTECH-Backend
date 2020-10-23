const User = require('./store')

const auth = require('../../auth')
const { error } = require('../../network/error')

//Get user information
const get = async user_id => {
    if(!user_id)
        throw error(400,'An error ocurred please logout and try again')
    
    const user = await User.findOne({_id: user_id})

    return {
        user
    }
}

//create user
const add = async data => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password
    } = data

    if(!firstName || !lastName || !email || !phoneNumber || !password)
        throw error(403,'Bad Reques: You must provide all required data')

    const verifyEmail = await User.findOne({email})

    if(verifyEmail)
        throw error(400,`${email} is already registed`)

    const user = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password
    })

    user.password = await auth.encryptPassword(user.password)

    await user.save()

    let token = auth.generateToken({
        user_id: user._id,
    })

    return {
        token: `Bearer ${token}`
    }
}

//verify login
const login = async data => {
    const {
        email,
        password
    } = data

    if(!email || !password)
        throw error(403,'Bad Reques: You must provide all required data')

    const user = await User.findOne({email})

    if(!user)
        throw error(400,`No se encontro ${email}`)

    const verify = await auth.validatePassword(user.password,password)

    if(!verify)
        throw error(400,'Datos Incorrectos')

    const token = auth.generateToken({
        user_id: user._id
    })

    return {
        token: `Bearer ${token}`
    }
}

//update user
const update = async data => {
    let {
        user_id,
        firstName,
        lastName,
        email,
        phoneNumber,
    } = data

    if(!user_id)
        throw error(401,'You do not have access to this route')

    const user = await User.findOne({_id: user_id})

    if(!user)
        throw error(400,'An error ocurred please logout and try again')

    let newData = {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        email: email || user.email,
        phoneNumber: phoneNumber || user.phoneNumber,
    }

    await User.updateOne({_id: user_id}, newData)

    return newData
}

module.exports = {
    get,
    add,
    login,
    update
}