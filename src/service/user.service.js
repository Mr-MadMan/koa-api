const User = require('../model/user.model') // 导入User模型对象

class UserService {
  // 往数据库创建用户
  async createUser(user_name, password) {
    // 插入数据

    try {
      const res = await User.create({ user_name, password, is_admin: 0 });

    } catch (error) {

    }

    return res.dataValues
  }
}

module.exports = new UserService()