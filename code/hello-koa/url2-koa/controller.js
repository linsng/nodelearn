// 加载控制器

const fs = require('fs');

function addMapping(mapping, router) {
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
}

function addController(router, dir) {
    // 1.扫描目录
    var files = fs.readdirSync(__dirname + `/${dir}`);

    var js_files = files.filter( (f) => {
        return f.endsWith('.js');
    });

    for(var f of js_files) {
        console.log(`process controller: ${f}`);
        let mapping = require(__dirname + `/${dir}/` + f);
        addMapping(mapping, router);
    };
}

module.exports = (dir) => {
    let 
        controller_dir = dir || 'controller',
        router = require('koa-router')();
    addController(router, controller_dir);
    return router.routes();
}

