// router  -->生成父路由
const Router = require('koa-router')
const childRouter = new Router()
const userController = require('../controllers/user.js')
const checkToken = require('../token/checkToken.js')

childRouter.post('/user/login', userController.login)
childRouter.post('/user/register', userController.register)

// 用户其它操作如删除用户等

// 获得用户
childRouter.post('/getUsers', checkToken, userController.getAllUsers)
// 删除用户 单个
childRouter.post('/delUser', checkToken, userController.delUser)
// 删除用户 多个
childRouter.post('/delUsers', checkToken, userController.delUsers)
// 检查用户token
childRouter.get('/checkToken', checkToken, userController.checkToken)

// 搜索用户
childRouter.post('/searchUser', checkToken, userController.searchUser)

module.exports = childRouter
