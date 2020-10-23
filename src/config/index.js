require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 8000,
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/tbl_contacts',
    SECRET: process.env.SECRET || 'UE1WU19UQkxURUNIX1NFQ1JFVA'
}