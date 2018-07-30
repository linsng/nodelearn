var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

// 从命令行参数获取root目录，默认是当前目录
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);
// 创建服务器:
var server = http.createServer(function(request, response) {
    // 获得URL的path，类似 '/css/bootstrap.css':
    var pathname = url.parse(request.url).pathname;
    // 获得对应的本地文件夹路径，类似 '/srv/www/css/':
    var dirPath = path.join(root, pathname);
    // 获取文件状态:
    fs.stat(dirPath, function(err, stat) {
        // 判断是否是目录
        if(!err && stat.isDirectory()) {
            // 查找index.html或default.html
            var filePath = path.join(dirPath, 'index.html');
            console.log(filePath);
            fs.stat(filePath, function(err, stat2) {
                if(!err && stat2.isFile()){
                    // 没有出错并且文件存在:
                    console.log('200 ' + request.url)
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    fs.createReadStream(filePath).pipe(response);
                } else {
                    response.writeHead(400);
                    response.end('11111');
                }
            });
        }  else {
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');