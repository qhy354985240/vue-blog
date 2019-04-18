const moment = require('moment')
const fs = require('fs')
const path = require('path')

const User = require('../mongodb.js').User
// 密码加密
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

// 根据用户名模糊查询用户
const findUsers = (query, searchType) => {
  let reg = new RegExp(query, 'i')
  return new Promise((resolve, reject) => {
    User.find({[searchType]: reg}, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}

// 查找所有用户分页查询
const findAllUsers = (size, current, filter) => {
  return new Promise((resolve, reject) => {
    User.find(filter, null, {sort: [{_id: -1}]}, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    }).limit(size).skip(--current * size)
  })
}

// 查询总的条数
const findTotal = (filter) => {
  return new Promise((resolve, reject) => {
    User.countDocuments(filter, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
// 删除某个用户
const deleteUser = (userName) => {
  return new Promise((resolve, reject) => {
    User.findOneAndDelete({userName: userName}, (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}
// 删除多个用户
const deleteUsers = (selection) => {
  return new Promise((resolve, reject) => {
    User.remove({userName: {$in: selection}}, (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}
// 更新用户数据
const update = (where, data) => {
  return new Promise((resolve, reject) => {
    User.update(where, data, (err, user) => {
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
  let passWord = ctx.request.body.passWord
  let doc = await findUser(userName)
  console.log(doc)
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
      createTime: doc.createTime,
      userPath: doc.imgPath || '',
      nickName: doc.nickName
    }
  }
}

// 注册
const register = async (ctx) => {
  let user = new User({
    nickName: ctx.request.body.nickName,
    email: ctx.request.body.email,
    userName: ctx.request.body.userName,
    passWord: ctx.request.body.passWord,
    createTime: moment().format('YYYY-MM-DD'),
    token: createToken(this.userName),
    userType: ctx.request.body.userType,
    imgPath: ''
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
      createTime: doc.createTime,
      userPath: doc.imgPath,
      nickName: doc.nickName
    }
  }
}

// 获得所有用户信息
const getAllUsers = async (ctx) => {
  let size = ctx.request.body.pageSize
  let current = ctx.request.body.pageCurrent
  let filter = ctx.request.body.filter
  let doc = []
  let total = 0
  let result = []
  Object.keys(filter).map(item => {
    if (filter[item] === '') {
      delete filter[item]
    }
  })
  await Promise.all([findAllUsers(size, current, filter), findTotal(filter)]).then(results => {
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
const delUser = async (ctx) => {
  let userName = ctx.request.body.userName
  let doc = await deleteUser(userName)
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

// 删除多个用户
const delUsers = async (ctx) => {
  let selection = ctx.request.body.selection
  let doc = await deleteUsers(selection)
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

// 搜索用户
const searchUser = async (ctx) => {
  let query = ctx.request.body.query
  let type = ctx.request.body.type
  let doc = await findUsers(query, type)
  let result = []
  if (doc) {
    if (type === 'email') {
      doc.map(item => {
        result.push({
          label: item.userName,
          value: item.email
        })
      })
    } else {
      doc.map(item => {
        result.push({
          label: item.nickName,
          value: item.userName,
          type: item.userType
        })
      })
    }
  }
  ctx.status = 200
  ctx.body = {
    success: true,
    result: result
  }
}

// 更新用户头像
const updateUser = async (ctx) => {
  let userName = ctx.request.body.userName
  let imgPath = ctx.request.body.imgUrl
  let user = await findUser(userName)

  let userpath = user.imgPath
  let img = path.resolve(__dirname, '../../dist/upImg' + userpath.slice(userpath.lastIndexOf('/')))
  if (userpath) {
    fs.unlink(img, function (err) {
      if (err) return console.log(err)
      console.log('文件删除成功')
    })
  }
  let doc = await update({userName}, {imgPath})
  if (doc) {
    ctx.status = 200
    ctx.body = {
      success: true
    }
  } else {
    ctx.status = 200
    ctx.body = {
      success: false
    }
  }
}

module.exports = {
  register,
  login,
  getAllUsers,
  delUser,
  delUsers,
  searchUser,
  checkToken,
  updateUser
}
