// router  -->生成父路由
const Router = require('koa-router')
const childRouter = new Router()
const articleController = require('../controllers/article.js')
const checkToken = require('../token/checkToken.js')

// 提交文章
childRouter.post('/submit/article', checkToken, articleController.submitArticle)

// 获取文章列表
childRouter.post('/get/list', checkToken, articleController.getArticle)
childRouter.post('/front/get/list', articleController.getArticle)

// 删除文章 单个
childRouter.post('/delArticle', checkToken, articleController.delArticle)
// 删除文章 多个
childRouter.post('/delArticles', checkToken, articleController.delArticles)

module.exports = childRouter
