const userRouter = require('../components/user/network')
const contactRouter = require('../components/contacts/network')
const authRouter = require('../components/auth/network')

const ensureToken = require('../middlewares/ensureToken')

module.exports = server => {
    server.use('/user',userRouter)
    server.use('/auth',authRouter)
    server.use('/contact', ensureToken ,contactRouter)
}