const Koa = require('koa')
const app = new Koa()

const router = require('./router/routers')

// log工具
const logUtil = require('./utils/log_util')

// 处理Post请求
const bodyParser = require('koa-bodyparser')

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
app.use(async (ctx, next) => {
  console.log(ctx.req.url)
  await next()
})

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3004)
console.log('服务已经启动在3004.....')
