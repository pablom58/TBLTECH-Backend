const config = require('../config')

const mongoose = require('mongoose')

mongoose.connect(config.DATABASE_URL,{
	useNewUrlParser: true,
	useUnifiedTopology: true 
})
    .then(response => console.log('Database Connected'))
    .catch(error => console.error(`DB error: ${error}`))