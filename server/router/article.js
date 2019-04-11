// router  -->生成父路由
const Router = require('koa-router')
const childRouter = new Router()
const articleController = require('../controllers/article.js')
const checkToken = require('../token/checkToken.js')

// 检查用户token
childRouter.get('/checkToken', checkToken, articleController.checkToken)

// 搜索用户
childRouter.post('/searchUser', checkToken, articleController.searchUser)

module.exports = childRouter
