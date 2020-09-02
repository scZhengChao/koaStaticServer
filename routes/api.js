const Router = require('koa-router')
const router  = new Router()

router.use('/uploadVideo',require('./api/uploadVideo'))


module.exports = router.routes()
