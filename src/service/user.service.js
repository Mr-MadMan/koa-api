const User = require('../model/user.model') // 导入User模型对象

class UserService {
  // 往数据库创建用户
  async createUser(user_name, password) {
    // 插入数据
    const res = await User.create({ user_name, password, is_admin: 0 });
    return res.dataValues
  }

  async getUserInfo(args) {
    const whereOpt = { ...args }
    // id && Object.assign(whereOpt, { id })

    // 查询传入字段是否在表中已存在且有值
    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt
    })

    return res ? res.dataValues : null
  }
}

module.exports = new UserService()
