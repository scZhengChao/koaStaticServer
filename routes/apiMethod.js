const Router = require('koa-router')
const router  = new Router()
// 上传视频
router.use('/uploadVideo',require('./api/uploadVideo'))
// 上传 分片后的视频
router.use('/handleUpload',require('./api/handleUpload'))
// 收到请求 通知合并
router.use('/handleMerge',require('./api/handleMerge'))
module.exports = router.routes()
