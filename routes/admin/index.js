const Router = require('koa-router')

let router = new Router();
router.all('/',async ctx=>{
    ctx.body = '请选择 login or  loginout'
})

//引入上面两个路由
router.use('/login', require('./login'))
router.use('/loginout', require('./loginout'))

module.exports = router.routes()