const { createUser } = require('../service/user.service')

class UserController {
  async register(ctx) {
    // 获取请求数据
    const { user_name, password } = ctx.request.body
    // 操作数据库，传递username&password
    const res = await createUser(user_name, password)
    // 返回结果
    ctx.body = {
      code: 0,
      message: '注册成功',
      data: {
        id: res.id,
        user_name: res.user_name,
        password: res.password
      }
    }
  }

  async login(ctx) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()