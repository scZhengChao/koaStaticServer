const Router = require('koa-router')
const router  = new Router()
router.all('/',async (ctx,next)=>{
    ctx.body = 'hello index'
})

module.exports = router.routes()
