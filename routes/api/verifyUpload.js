const Router = require('koa-router')
let router = new Router();
const fs = require('fs');
const path = require('path')

router.all('/',async ctx=>{
    const { hash,index } = ctx.request.body
    const chunkPath = path.resolve(__dirname,hash)
    if(fs.existsSync(chunkPath)){
        const chunkList = await fs.readdirSync(chunkPath)
        return ctx.body = {
            code:000000,
            message:'当前文件已存在',
            data:{
                shouldUpload:false,
                uploadedList:chunkList
            }
        }
    }
    return ctx.body = {
        code:00001,
        message:'当前文件不存在',
        data:{
            shouldUpload:true,
            uploadedList:[]

        }
    }
})


module.exports = router.routes()