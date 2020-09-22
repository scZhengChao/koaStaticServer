const Router = require('koa-router')
const router = new Router()
var PassThrough = require('stream').PassThrough;
var Readable = require('stream').Readable;

function RR(){
    Readable.call(this,arguments);
}
RR.prototype = new Readable();
RR.prototype._read = function(data){
}


const sse = (stream,event, data) => {
    return stream.push(`event:${ event }\nretry:2000\ndata:${ JSON.stringify(data) }\nid:12345\n\n`)
//    return stream.write(`event:${ event }ndata: ${ JSON.stringify(data) }nn`);
}
router.all('/',(ctx,next)=>{
   

    /***
     * let res = ctx.response
     * 绕过 Koa 的 response 处理是 不被支持的. 应避免使用以下 node 属性：
     * res.statusCode statusCode write end
     * 以下是express 的写法
     */
    
    
    // // 根据 EventSource 规范设置报头
    // res.writeHead(200, {
    //     "Content-Type": "text/event-stream", // 规定把报头设置为 text/event-stream
    //     "Cache-Control": "no-cache" // 设置不对页面进行缓存
    // })
    // // 用write返回事件流，事件流仅仅是一个简单的文本数据流，每条消息以一个空行(\n)作为分割。
    // res.write(':注释' + '\n\n')  // 注释行 （注释行解决没有数据时请求超时的问题）
    // res.write('data:' + '消息内容1' + '\n\n') // 未命名事件

    // res.write(  // 命名事件
    //     'event: myEve' + '\n' +
    //     'data:' + '消息内容2' + '\n' +
    //     'retry:' + '2000' + '\n' +
    //     'id:' + '12345' + '\n\n'
    // )
    // setInterval(() => { // 定时事件
    //     res.write('data:' + '定时消息' + '\n\n')
    // }, 2000)



    /***
     * 以下是koa的写法
     * koa 有自身的特殊性 相比较 express
     * 所以当你返回的是流 文件的时候 不能用常规的字符串的方式写
     */
    var stream = new RR()//PassThrough();
    ctx.set({
        'Content-Type':'text/event-stream',
        'Cache-Control':'no-cache',
        Connection: 'keep-alive'
    });
    sse(stream,'test',{a: "zheng",b: "chap"});
    ctx.body = stream;
    setInterval(()=>{
        sse(stream,'test',{a: "yango",b: Date.now()});
    },1000); 
})


module.exports = router.routes()