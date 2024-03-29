'use strict'

const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser') // 处理Post请求
const Router = require('koa-router')
const userRouter = require('./router/user') // 引入用户子路由
const articleRouter = require('./router/article') // 引入文章子路由
const logUtil = require('./utils/log_util') // log工具
// const resFormat = require('./middlewares/resFormat')
const server = require('koa-static')
const path = require('path')

const router = new Router()

app.use(bodyParser())

// logger
app.use(async (ctx, next) => {
  // 响应开始时间
  const start = new Date()
  // 响应间隔时间
  var ms
  try {
    // 开始进入到下一个中间件
    await next()

    ms = new Date() - start
    // 记录响应日志
    logUtil.logResponse(ctx, ms)
  } catch (error) {
    ms = new Date() - start
    // 记录异常日志
    logUtil.logError(ctx, error, ms)
  }
})

// 格式化响应结果的中间件
// app.use(resFormat)

// 装载子路由
router.use('/api/user', userRouter.routes(), userRouter.allowedMethods())
router.use('/api/article', articleRouter.routes(), articleRouter.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
// 加载静态资源
app.use(server(path.resolve('dist')))

app.listen(3004)
console.log('服务已经启动在3004.....')
