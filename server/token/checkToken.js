const jwt = require('jsonwebtoken')
// 检查token是否过期
module.exports = async (ctx, next) => {
  const auth = ctx.get('Authorization')
  if (auth === '') {
    ctx.throw(401, 'no token detected in http header')
  }
  const token = auth.split(' ')[1]
  let tokenContent
  try {
    tokenContent = await jwt.verify(token, 'totoro')
  } catch (error) {
    ctx.throw(401, 'invalid token')
  }
  await next()
}
