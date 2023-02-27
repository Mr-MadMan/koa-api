const { DataTypes } = require('sequelize');
const seq = require('../db/seq')

// 创建模型, 加上前缀表示统一项目标识(Model koa_user -> koa_user)
const User = seq.define('koa_user', {
  // Model attributes are defined here
  // id自增键，会被sequelize自动创建
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名, 唯一' //属性注释
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码'
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为管理员, 0: 不是; 1: 是'
  }
}, {
  // Other model options go here
});

// 强制同步数据库，创建数据表
// User.sync({
//   force: true, // 数据库存在该表，删除旧表，创建新表
// })

module.exports = User