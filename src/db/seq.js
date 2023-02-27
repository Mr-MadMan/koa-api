const { Sequelize } = require('sequelize');
const { MYSQL_HOST, MYSQL_USER, MYSQL_DB, MYSQL_PWD } = require('../config/default.config')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
  timezone: '+08:00'
});

// 验证sql是否连接成功
// seq.authenticate().then(() => { console.log('success'); })

module.exports = seq