const nodemailer = require("nodemailer")

const config = require('../config')

const sendMail = async data => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: config.USER_EMAIL,
            pass: config.USER_EMAIL_PASSWORD,
        },
    });

    let email = await transporter.sendMail({
        from: config.USER_EMAIL,
        to: data.email,
        subject: "Added to tbl contacts by pmvs",
        text: "We added you in our contact list. Thank you",
        html: "<p>We added you in our contact list. Thank you</p>",
    })

    return email
}

module.exports = sendMail