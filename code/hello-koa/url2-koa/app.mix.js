/**
 * 自动扫描controllers目录，找到所有js文件，导入，然后注册每个URL：
 */

 const fs = require('fs');

 const router = require('koa-router')();

 const Koa = require('koa');

 const app = new Koa();

 const bodyParser = require('koa-bodyparser');

 // 1.扫描目录
 var files = fs.readdirSync(__dirname + '/controller');

 var js_files = files.filter( (f) => {
    return f.endsWith('.js');
 });
 
 for(var f of js_files) {
    console.log(`process controller: ${f}`);
    let mapping = require(__dirname + '/controller/' + f);
    for(var url in mapping) {
        if(url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if(url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            // 无效url
            console.log(`invalid URL: ${url}`);
        }
    }
 };

 app.use(bodyParser());
 app.use(router.routes());

 app.listen(3000);
 console.log('1111');