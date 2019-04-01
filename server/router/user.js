// router  -->生成父路由
const Router = require('koa-router')
const childRouter = new Router()
const userController = require('../controllers/user.js')
const checkToken = require('../token/checkToken.js')

childRouter.post('/user/login', userController.login)
childRouter.post('/user/register', userController.register)

// 用户其它操作如删除用户等

childRouter.post('/getUsers', checkToken, userController.getAllUsers)
childRouter.post('/delUser', checkToken, userController.delUsers)
childRouter.get('/checkToken', checkToken, userController.checkToken)

module.exports = childRouter
