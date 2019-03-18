const User = require('../mongodb.js').User
// 密码加密
const sha1 = require('sha1')
const createToken = require('../token/createToken.js')
// 数据库操作
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

// 查找所有用户
const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}

// 删除某个用户
const delUser = (id) => {
  return new Promise((resolve, reject) => {
    User.findOneAndRemove({_id: id}, (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

// 登录
const login = async (ctx) => {
  let username = ctx.request.body.username
  let password = sha1(ctx.request.body.password)

  let doc = await findUser(username)
  if (!doc) {
    ctx.status = 200
    ctx.body = {
      success: false,
      info: '用户名不存在'
    }
  } else if (doc.password !== password) {
    ctx.status = 200
    ctx.body = {
      success: false,
      info: '密码错误'
    }
  } else if (doc.password === password) {
    let token = createToken(username)
    doc.token = token
    await new Promise((resolve, reject) => {
      doc.save((err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })

    ctx.status = 200
    ctx.body = {
      success: true,
      username,
      token,
      createTime: doc.createTime
    }
  }
}

// 注册
const register = async (ctx) => {
  let user = new User({
    username: ctx.request.body.username,
    password: sha1(ctx.request.body.password),
    token: createToken(this.username)
  })

  let userData = await findUser(user.username)
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
    let doc = await findUser(user.username)
    let token = createToken(user.username)
    doc.token = token
    await new Promise((resolve, reject) => {
      doc.save((err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
    ctx.status = 200
    ctx.body = {
      success: true,
      username: ctx.username,
      token,
      createTime: doc.createTime
    }
  }
}

// 获得所有用户信息
const getAllUsers = async (ctx) => {
  let doc = await findAllUsers()
  ctx.status = 200
  ctx.body = {
    success: true,
    result: doc
  }
}

// 删除某个用户
const delUsers = async (ctx) => {
  let id = ctx.request.body.id
  await delUser(id)
  ctx.body = {
    success: true,
    info: '删除成功'
  }
}

module.exports = {
  register,
  login,
  getAllUsers,
  delUsers
}
