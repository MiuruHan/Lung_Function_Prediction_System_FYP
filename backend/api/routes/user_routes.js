const router = require('express').Router()
const {addUser, login}  = require('../controllers/user_controller')
router.post('/addUser',addUser)
router.post('/login',login)
module.exports =  router