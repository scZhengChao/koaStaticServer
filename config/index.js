
const dotenv = require('dotenv');
const fs = require('fs')
const path = require('path')

function resolve(file){
    try{
        fs.statSync(file)
        return path.resolve(__dirname,'../',file)
    }catch(err){
        return null
    }
}
/**
 * 这下面的 是 不在代码里的机密信息 在进程里取
 */
dotenv.config({ path: resolve(`.env.${process.env.NODE_ENV}`) });
dotenv.config({ path: resolve('.env') });

/**
 * 下面是在代码里导出的
 */
const env = process.env.NODE_ENV
const conf  = require(`./${env}`)
const common = {

}

module.exports = Object.assign({},common,conf)