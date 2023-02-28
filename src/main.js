const Koa = require('koa')
const Router = require('@koa/router')
const { APP_PORT } = require('./config/default.config.js')
const { koaBody } = require('koa-body')
// const bcrypt = require('bcryptjs')

const app = new Koa()
const indexRouter = new Router()

const userRoutes = require('./router/user.route')
const errHandler = require('./handler/errHandler.js')

indexRouter.get('/', (ctx) => {
  ctx.body = '首页'
})

app.use(koaBody())
app.use(indexRouter.routes())
app.use(userRoutes.routes())

// 统一错误处理
app.on('customError', errHandler)

app.listen(APP_PORT, () => {
  console.log(`server is runing`);
})
