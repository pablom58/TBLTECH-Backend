const { model , Schema } = require('mongoose')
const User = model('User')

const contactSchema = new Schema({
    user_id: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
})

module.exports = model('Contact',contactSchema)