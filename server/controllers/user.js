const User = require('../mongodb.js').User
// 密码加密
const sha1 = require('sha1')
const createToken = require('../token/createToken.js')

// 注册
const register = async (ctx) => {
  let user = new User({
    username: ctx.request.body.username,
    password: sha1(ctx.request.body.password),
    token: createToken(this.username)
  })

  let userData = await findUser(user.username)
  console.log(userData)
  if (userData) {
    ctx.status = 200
    ctx.body = {
      success: false
    }
  } else {
    await new Promise((resolve, reject) => {
      user.save((err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
    ctx.status = 200
    ctx.body = {
      success: true
    }
  }
}

// 根据用户名查用户
const findUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({username}, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}

module.exports = {
  register,
  findUser
}
