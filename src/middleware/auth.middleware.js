const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/default.config')
const { tokenExpiredError, invalidTokenError } = require('../constants/err.type')

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  const token = authorization.replace('Bearer ', '')

  try {
    // 返回结果包含payload的信息(id, user_name, is_admin)
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (err) {
    console.log(err);
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token过期', err);
        return ctx.app.emit('customError', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效token', err);
        return ctx.app.emit('customError', invalidTokenError, ctx)
    }
  }

  await next()
}

module.exports = {
  auth
}
