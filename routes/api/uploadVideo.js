const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
let router = new Router();
router.all('/',async ctx=>{
    //使用koa-body中间件后，即可通过ctx.request.files获取上传的文件
    const { files:{file} } = ctx.request;
    // 创建可读流
    let filePath = path.join(__dirname, '../../static/upload/') + `/${file.name}`;
    const rs = fs.createReadStream(file.path);
    // 创建可写流
    const ws = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    rs.pipe(ws);
    return  ctx.body = {
        message:000000,
        data:'success'
    }
})

module.exports = router.routes()