const { Router } = require('express')

const UserController = require('./controller')

const ensureToken = require('../../middlewares/ensureToken')

const response = require('../../network/response')

const router = Router()

//Get user information
router.get('/' , ensureToken , async (req,res) => {
    try{
        let data = await UserController.get(req.user_id)
        response.success(res,data,200,'User Information')
    }catch(error){
        response.error(res,error.statusCode,error.message)
    }
})

//create user
router.post('/' , async (req,res) => {
    try{
        let data = await UserController.add(req.body)
        response.success(res,data,200,'User Created')
    }catch(error){
        response.error(res,error.statusCode,error.message)
    }
})

//login user
router.post('/login' , async (req,res) => {
    try{
        let data = await UserController.login(req.body)
        response.success(res,data,200,'User Logged In')
    }catch(error){
        response.error(res,error.statusCode,error.message)
    }
})

//update user
router.put('/' , ensureToken , async (req,res) => {
    try{
        let data = await UserController.update({
            user_id: req.user_id,
            ...req.body
        })
        response.success(res,data,200,'User Updated')
    }catch(error){
        response.error(res,error.statusCode,error.message)
    }
})

module.exports = router