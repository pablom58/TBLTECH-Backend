const userRouter = require('../components/user/network')

module.exports = server => {
    server.use('/user',userRouter)
}