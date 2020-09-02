const router = new require('koa-router')()


router.all('/',async ctx=>{
    ctx.body = 'admin loginout'
})

module.exports = router.routes()