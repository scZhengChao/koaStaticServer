const Router = require('koa-router')
let router = new Router();
const path = require('path')
const fs = require('fs')
router.all('/',async ctx=>{
    console.log('进入merge了')
    // 取出FormData 里的 append的 借助 koa-body
    const {filename,nameHash,SIZE }=ctx.request.body;
    const targetFilePath = path.resolve(__dirname,`${filename}`);
    const splitExt=(filename='')=>{
        let name= filename.slice(0,filename.lastIndexOf('.'));
        let ext=filename.slice(filename.lastIndexOf('.')+1,filename.length);
        return {name,ext};
    }
      

    const pipStream = (path, writeStream) => {
        return new Promise(resolve => {
            const readStream = fs.createReadStream(path);
            readStream.on("end", function(err){
                if(err) throw err;
                // fs.unlinkSync(path);  删除原路径文件
                resolve();
            });
            readStream.pipe(writeStream,{end:false});
        })
    };
    //   读取 hash 命名的文件夹下的目录
    fs.readdir(path.resolve(__dirname,nameHash),async (err,files)=>{
      if(err) return console.log('err:readdir');
      // 安装index  给 chunk 排序
      files.sort((a,b)=> a.slice(a.lastIndexOf('_')+1)-b.slice(b.lastIndexOf('_')+1));
      
      // 替换chunk 文件夹下的 路径
      files=files.map(file=>path.resolve(__dirname,nameHash,file));


      Promise.all(files.map(async(file,index)=>{
        return pipStream(file,fs.createWriteStream(targetFilePath,{
                start:index * SIZE,
                end:(index+1)*SIZE,
            }))
        }))

    })
   

    return  ctx.body = {
        message:000000,
        data:'success'
    }
})

module.exports = router.routes()