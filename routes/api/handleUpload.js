const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
let router = new Router();
router.all('/',async ctx=>{
    const splitExt=(filename='')=>{
        let name= filename.slice(0,filename.lastIndexOf('.'));
        let ext=filename.slice(filename.lastIndexOf('.')+1,filename.length);
        return {name,ext};
    }
 
    const {hash,nameHash,filename,index}=ctx.request.body;
    const { files:{file} } = ctx.request;
    //   创建 存放 chunk 的文件夹  以hash 命名
    const chunkPath=path.resolve(__dirname,`${nameHash}`);
    if(!fs.existsSync(chunkPath)){
       fs.mkdirSync(chunkPath);
    }
    const {name,ext}=splitExt(filename);
    // 重命名文件 这一步对后面的流的读写很重要 (报错)
    // 注意：这个地方提示跨区重命名文件出现的权限问题。
    //所以不能用： 但是这个地方 注意： 可以改路仅直接过来
    // fs.renameSync(ctx.request.files.file.path,`${chunkPath}/${filename}_${index}`);

    // 解决
    var readStream=fs.createReadStream(file.path);
    var writeStream=fs.createWriteStream(`${chunkPath}/${filename}_${index}`);
    readStream.pipe(writeStream);
    readStream.on('end',function(){
     fs.unlinkSync(file.path); // 同步的删除的文件
    });
    
    return ctx.body={
        message:'success',
        code:000000
    };
})

module.exports = router.routes()