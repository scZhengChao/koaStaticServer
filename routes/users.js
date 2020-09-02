const Router = require('koa-router')
const router  = new Router()
router.all('/',async (ctx,next)=>{
    ctx.body = 'hello users'
})
router.all('/my',async (ctx,next)=>{
    ctx.body = 'my name is zhengchao'
})
router.use('/admin',require('./admin'))

module.exports = router.routes()
