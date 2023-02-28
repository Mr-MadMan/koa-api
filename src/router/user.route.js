const Router = require('@koa/router')

const router = new Router({ prefix: '/users' })

const { userValidator, userVerify, cryptPwd, verifyLogin } = require('../middleware/user.middleware')
const { register, login } = require('../controller/user.controller')

// 注册接口
router.post('/register', userValidator, userVerify, cryptPwd, register)

// 登录接口
router.post('/login', userValidator, verifyLogin, login)

// 修改密码接口
router.patch('/', (ctx) => {
  const { autorization } = ctx.request.header
  ctx.body = '密码修改成功'
})

module.exports = router
