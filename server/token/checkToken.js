const jwt = require('jsonwebtoken')
// 检查token是否过期
module.exports = async (ctx, next) => {
  const auth = ctx.get('Authorization')
  if (auth === '') {
    ctx.throw(401, 'no token detected in http header')
  }
  const token = auth.split(' ')[1]

  let check = jwt.verify(token, 'totoro', (error, decoded) => {
    if (error) {
      ctx.response.status = 401
      ctx.response.body = {
        message: '登录超时请重新登录'
      }
      return false
    } else {
      return true
    }
  })
  if (check) {
    await next()
  }
}
