// router  -->生成父路由
const Router = require('koa-router')
const childRouter = new Router()
const userController = require('../controllers/user.js')
const checkToken = require('../token/checkToken.js')
const fs = require('fs')

childRouter.post('/user/login', userController.login)
childRouter.post('/user/register', userController.register)

const multer = require('koa-multer')// 加载koa-multer模块
// 文件上传
// 配置
var storage = multer.diskStorage({
  // 文件保存路径
  destination: function (req, file, cb) {
    let path = ''
    'dist/path'.split('/').forEach(p => {
      if (p && !fs.existsSync(path += p + '/')) {
        fs.mkdirSync(path)
      }
    })
    cb(null, 'dist/uploads/')
  },
  // 修改文件名称
  filename: function (req, file, cb) {
    console.log(file, 'xxxxxxx')
    var fileFormat = (file.originalname).split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})
// 加载配置
var upload = multer({ storage })
// 路由
childRouter.post('/upload', upload.single('file'), async ctx => {
  console.log('22222')
  // ctx.body = {
  //   filename: ctx.req.file.filename// 返回文件名
  // }
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

module.exports = childRouter
