const Router = require('@koa/router')

const router = new Router({ prefix: '/users' })

const { register, login } = require('../controller/user.controller')

// GET /users/
router.get('/', (ctx) => {
  ctx.body = 'users page'
})

// 注册接口
router.post('/register', register)

// 登录接口
router.post('/login', login)

module.exports = router