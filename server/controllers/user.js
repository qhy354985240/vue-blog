const moment = require('moment')

const User = require('../mongodb.js').User
// 密码加密
const sha1 = require('sha1')
const createToken = require('../token/createToken.js')
// 判断是否过期
const checkToken = async (ctx) => {
  ctx.status = 200
  ctx.body = {
    success: true,
    info: '已经登录'
  }
}
// 数据库操作
// 根据用户名查用户
const findUser = (userName) => {
  return new Promise((resolve, reject) => {
    User.findOne({userName}, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}

// 查找所有用户分页查询
const findAllUsers = (size, current) => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    }).limit(size).skip(--current * size)
  })
}

// 查询总的条数
const findTotal = () => {
  return new Promise((resolve, reject) => {
    User.countDocuments({}, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}

// 删除某个用户
const delUser = (userName) => {
  return new Promise((resolve, reject) => {
    User.findOneAndDelete({userName: userName}, (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}

// 登录
const login = async (ctx) => {
  let userName = ctx.request.body.userName
  let passWord = sha1(ctx.request.body.passWord)

  let doc = await findUser(userName)
  if (!doc) {
    ctx.status = 200
    ctx.body = {
      success: false,
      info: '用户名不存在'
    }
  } else if (doc.passWord !== passWord) {
    ctx.status = 200
    ctx.body = {
      success: false,
      info: '密码错误'
    }
  } else if (doc.passWord === passWord) {
    let token = createToken(userName)
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
      userName,
      token,
      userType: doc.userType,
      createTime: doc.createTime
    }
  }
}

// 注册
const register = async (ctx) => {
  let user = new User({
    nickName: ctx.request.body.nickName,
    email: ctx.request.body.email,
    userName: ctx.request.body.userName,
    passWord: sha1(ctx.request.body.passWord),
    createTime: moment().format('YYYY-MM-DD'),
    token: createToken(this.userName),
    userType: ctx.request.body.userType
  })
  let userData = await findUser(user.userName)
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
    let doc = await findUser(user.userName)
    let token = createToken(user.userName)
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
      userName: doc.userName,
      userType: doc.userType,
      token,
      createTime: doc.createTime
    }
  }
}

// 获得所有用户信息
const getAllUsers = async (ctx) => {
  let size = ctx.request.body.pageSize
  let current = ctx.request.body.pageCurrent
  let doc = []
  let total = 0
  let result = []
  await Promise.all([findAllUsers(size, current), findTotal()]).then(results => {
    doc = results[0]
    total = results[1]
    if (doc.length > 0) {
      doc.map(item => {
        result.push({
          userName: item.userName,
          nickName: item.nickName,
          createTime: item.createTime,
          email: item.email,
          userType: item.userType
        })
      })
    }
  }).catch(err => {
    console.log(err)
  })
  ctx.status = 200
  ctx.body = {
    success: true,
    result: result,
    total: total
  }
}

// 删除某个用户
const delUsers = async (ctx) => {
  let userName = ctx.request.body.userName
  let doc = await delUser(userName)
  console.log(doc)
  if (doc) {
    ctx.body = {
      success: true,
      info: '删除成功'
    }
  } else {
    ctx.body = {
      success: false,
      info: '删除失败'
    }
  }
}

module.exports = {
  register,
  login,
  getAllUsers,
  delUsers,
  checkToken
}
