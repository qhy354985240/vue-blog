// router  -->生成父路由
const Router = require('koa-router')
const childRouter = new Router()
const userController = require('../controllers/user.js')
const checkToken = require('../token/checkToken.js')
const fs = require('fs')
const config = require('../config/config.js')

childRouter.post('/login', userController.login)
childRouter.post('/register', userController.register)

const multer = require('koa-multer')// 加载koa-multer模块
// 文件上传
var storage = multer.diskStorage({
  // 文件保存路径
  destination: function (req, file, cb) {
    let path = ''
    config.upPath.split('/').forEach(p => {
      if (p && !fs.existsSync(path += p + '/')) {
        fs.mkdirSync(path)
      }
    })
    cb(null, config.upPath)
  },
  // 修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})
// 加载配置
var upload = multer({ storage })
// 路由
childRouter.post('/upload', checkToken, upload.single('file'), async ctx => {
  const { filename } = ctx.req.file
  let fullPath = config.domain + config.upPath.replace('dist/', '/') + filename
  ctx.body = {
    success: true,
    filename: ctx.req.file.filename,
    fullPath: fullPath
  }
})

// 用户其它操作如删除用户等

// 获得用户
childRouter.post('/getUsers', checkToken, userController.getAllUsers)
// 删除用户 单个
childRouter.post('/delUser', checkToken, userController.delUser)
// 删除用户 多个
childRouter.post('/delUsers', checkToken, userController.delUsers)
// 检查用户token
childRouter.get('/checkToken', checkToken, userController.checkToken)

// 搜索用户
childRouter.post('/searchUser', checkToken, userController.searchUser)

// 更新用户
childRouter.post('/update/user', checkToken, userController.updateUser)

module.exports = childRouter
