// router  -->生成父路由
const Router = require('koa-router')
const router = new Router()

const user = require('../controllers/user')

router.post('/user/login', user.login)
router.get('/user/profile', user.profile)

module.exports = router
