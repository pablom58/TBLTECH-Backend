const Contact = require('./store')

const { error } = require('../../network/error')

//Get page of Contacts
const getPage = async data => {
    const { user_id , page } = data

    if(!user_id)
        throw error(400,'An error ocurred, please logout and try again')

    let contactsPerPage = 10;

    const contacts = await Contact.find({user_id})
                                    .skip((contactsPerPage * page) - contactsPerPage)
                                    .limit(contactsPerPage)

    const pages = await Contact.countDocuments()
    
    return {
        currentPage: page,
        prevPage: parseInt(page) - 1,
        nextPage: parseInt(page) + 1,
        pages: Math.ceil(pages / contactsPerPage),
        contacts,
    }
}

//Get an specific contact
const get = async data => {
    const { contact_id } = data

    if(!contact_id)
        throw error(400,'An error ocurred please try later')

    const contact = await Contact.findOne({_id: contact_id})

    if(!contact)
        throw error(400,'Cannot find the contact that you want')
    
    return contact
}

//Create contact
const add = async data => {
    const {
        user_id,
        firstName,
        lastName,
        email,
        phoneNumber,
    } = data

    if(!user_id)
        throw error(400,'An error ocurred, please logout and try again')

    if(!firstName || !lastName || !email || !phoneNumber)
        throw error(403,'Bad Reques: You must provide all required data')

    const contact = new Contact({
        user_id,
        firstName,
        lastName,
        email,
        phoneNumber,
    })

    await contact.save()

    return true
}

//update contact
const update = async data => {
    let {
        user_id,
        contact_id,
        firstName,
        lastName,
        email,
        phoneNumber,
    } = data

    if(!user_id)
        throw error(401,'You do not have access to this route')

    if(!contact_id)
        throw error(400,'An error ocurred please try later')

    const contact = await Contact.findOne({_id: contact_id})

    if(!contact)
        throw error(400,'An error ocurred please try later')

    let newData = {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        email: email || user.email,
        phoneNumber: phoneNumber || user.phoneNumber,
    }

    await Contact.updateOne({_id: contact_id}, newData)

    return newData
}

//delete contact
const remove = async data => {
    let { user_id , contact_id } = data

    if(!user_id)
        throw error(401,'You do not have access to this route')

    if(!contact_id)
        throw error(400,'An error ocurred please try later')

    await Contact.deleteOne({_id: contact_id})

    return true
}

module.exports = {
    getPage,
    get,
    add,
    update,
    remove
}