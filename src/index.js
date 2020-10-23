require('./store/mongo')

const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')

const config = require('./config')
const router = require('./network/router')
const { errors } = require('./network/error')

const app = express()

//Setting port
app.set('port',config.PORT)

//setting some middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//routing the server
router(app)

//handling errors
app.use(errors)

//start server
app.listen(app.get('port'),() => console.log(`Server on port: ${app.get('port')}`))