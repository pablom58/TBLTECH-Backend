const { Router } = require('express')

const AuthController = require('./controller')

const response = require('../../network/response')

const router = Router()

router.post('/request/reset',async (req,res) => {
    try{
        await AuthController.generateResetLink({
            host: req.hostname,
            ...req.body
        })

        response.success(res,{},200,'Link Sent')
    }catch(error){
        response.error(res,error.statusCode,error.message)
    }
})

router.post('/reset/password',async (req,res) => {
    try{
        await AuthController.resetPassword({
            ...req.body
        })

        response.success(res,{},200,'Updated password')
    }catch(error){
        response.error(res,error.statusCode,error.message)
    }
})

module.exports = router