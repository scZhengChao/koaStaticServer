const Router = require('koa-router')
const router = new Router()

router.all('/',async ctx=>{
    ctx.body = 'admin login'
})

module.exports = router.routes()