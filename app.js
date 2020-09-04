const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const static = require('koa-static')
const Router = require('koa-router')
const router  = new Router()
const koaBody = require('koa-body');

// error handler
onerror(app)

/**
 * 下面是各种各样的middlewares
 */
// 提供 HTTP 静态托管服务
app.use(static(__dirname+'/public'))  

// 解析 Post 类 HTTP 动词的 body 内容，加上 bodyparser 后就可以处理所有请求了
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// 更好的支持 JSON
app.use(json())
// 开发阶段的日志
app.use(logger())
//文件上传  https://www.jianshu.com/p/34d0e1a5ac70
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));

// 自定义中间件，输出接口总耗时
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // 这边输出了个总耗时
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



// routes
router.use('/users',require('./routes/users'))
router.use('/home',require('./routes/home'))
router.use('/wechat',require('./routes/wechat'))
router.use('/api',require('./routes/apiMethod'))

/**
 * 启动路由
*/
app.use(router.routes()); 
app.use(router.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
