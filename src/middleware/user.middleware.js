const bcrypt = require('bcryptjs')
const {
  userFormatError,
  userExistedError,
  getUserInfoError,
  userDoesNotExistError,
  userLoginError,
  invalidPasswordError
} = require('../constants/err.type');
const { getUserInfo } = require('../service/user.service');

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body

  // 合法性
  if (!user_name || !password) {
    console.error('用户名账号或密码为空', ctx.request.body);
    // 提交错误对象
    ctx.app.emit('customError', userFormatError, ctx)
    return
  }

  await next()
}

const userVerify = async (ctx, next) => {
  const { user_name } = ctx.request.body

  try {
    if (await getUserInfo({ user_name })) {
      console.error('用户名已存在', ctx.request.body);
      ctx.app.emit('customError', userExistedError, ctx)
      return
    }
  }
  catch (err) {
    console.error('获取用户信息错误', err);
    ctx.app.emit('customError', getUserInfoError, ctx)
    return
  }

  await next()
}

const cryptPwd = async (ctx, next) => {
  const { password } = ctx.request.body
  // 加盐加密
  const salt = bcrypt.genSaltSync(10)
  // hash保存密文
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash
  await next()
}

const verifyLogin = async (ctx, next) => {
  // 1.用户是否存在
  const { user_name, password } = ctx.request.body

  try {
    const res = await getUserInfo({ user_name })
    if (!res) {
      console.error(`用户名不存在, ${user_name}`);
      ctx.app.emit('customError', userDoesNotExistError, ctx)
      return
    }
    // 2.密码匹配校验
    // 密码解密
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('customError', invalidPasswordError, ctx)
      return
    }
  } catch (err) {
    console.error('用户登录失败');
    return ctx.app.emit('customError', userLoginError, ctx)
  }

  await next()
}

module.exports = {
  userValidator,
  userVerify,
  cryptPwd,
  verifyLogin
}
