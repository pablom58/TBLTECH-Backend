const { Router } = require('express')

const ContactController = require('./controller')

const response = require('../../network/response')

const router = Router()

//Get all contacts
router.get('/list/:page',async (req,res) => {
    try{
        let data = await ContactController.getPage({
            user_id: req.user_id,
            page: req.params.page || 1
        })
        response.success(res,data,200,'Contact List Success')
    }catch(error){
        response.error(res,error.statusCode,error.message)
    }
})

//Create Contact
router.post('/',async (req,res) => {
    try{
        await ContactController.add({
            user_id: req.user_id,
            ...req.body
        })

        let data = await ContactController.getPage({
            user_id: req.user_id,
            page: 1
        })
        response.success(res,data,200,'Contact Created')
    }catch(error){
        response.error(res,error.statusCode,error.message)
    }
})

//Get an specific contact
router.get('/item/:id',async (req,res) => {
    try{
        let data = await ContactController.get({
            contact_id: req.params.id,
        })
        response.success(res,data,200,'Contact Found')
    }catch(error){
        response.error(res,error.statusCode,error.message)
    }
})

//Update contact
router.put('/',async (req,res) => {
    try{
        let data = await ContactController.update({
            user_id: req.user_id,
            ...req.body
        })
        response.success(res,data,200,'Contact Created')
    }catch(error){
        response.error(res,error.statusCode,error.message)
    }
})

//Delete Contact
router.delete('/',async (req,res) => {
    try{
        await ContactController.remove({
            user_id: req.user_id,
            ...req.body
        })

        let data = await ContactController.getPage({
            user_id: req.user_id,
            page: 1
        })
        response.success(res,data,200,'Contact Deleted')
    }catch(error){
        response.error(res,error.statusCode,error.message)
    }
})

module.exports = router