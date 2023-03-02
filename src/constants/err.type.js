// 定义错误类型
module.exports = {
  userFormatError: {
    code: '10001',
    message: '用户名账号或密码为空',
    data: ''
  },
  userExistedError: {
    code: '10002',
    message: '用户已存在',
    data: ''
  },
  userRegisterError: {
    code: '10003',
    message: '用户注册错误',
    data: ''
  },
  getUserInfoError: {
    code: '10004',
    message: '获取用户信息错误',
    data: ''
  },
  userDoesNotExistError: {
    code: '10005',
    message: '用户不存在',
    data: ''
  },
  userLoginError: {
    code: '10006',
    message: '用户登录失败',
    data: ''
  },
  invalidPasswordError: {
    code: '10007',
    message: '用户密码错误',
    data: ''
  },
  tokenExpiredError: {
    code: '10101',
    message: 'token已过期',
    data: ''
  },
  invalidTokenError: {
    code: '10102',
    message: '无效的token',
    data: ''
  }
}
