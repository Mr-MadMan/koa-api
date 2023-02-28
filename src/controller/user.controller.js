const jwt = require('jsonwebtoken')
const { userRegisterError } = require('../constants/err.type');
const { createUser, getUserInfo } = require('../service/user.service')
const { JWT_SECRET } = require('../config/default.config')

class UserController {
  async register(ctx) {
    // 获取请求数据
    const { user_name, password } = ctx.request.body
    try {
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
    } catch (err) {
      console.error('用户注册错误', err);
      ctx.app.emit('customError', userRegisterError, ctx)
      return
    }
  }

  async login(ctx) {
    const { user_name } = ctx.request.body
    // 获取用户信息，在token的payload中记录id, user_name，is_admin
    try {
      // 从返回结果剔除password属性，将剩下的属性放到res对象
      const { password, ...res } = await getUserInfo({ user_name })

      ctx.body = {
        code: 0,
        message: '登录成功',
        data: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
        }
      }
    } catch (err) {
      console.error('登录失败', err)
    }
  }
}

module.exports = new UserController()
